// ts-ignore
import { EventEmitter } from "eventemitter3";

import {
  ACK_WAIT_TIMES,
  RETRY_TIMES,
  SEND_WAIT_TIMES,
} from "./webSocket.constants";
import {
  BaseEventEmitterEvents,
  MessagePayload,
  WebSocketMessage,
} from "./webSocket.types";

interface WebsocketInstance<
  SendEvent extends BaseEventEmitterEvents,
  ReceiveEvent extends BaseEventEmitterEvents
> extends EventEmitter {
  /**
   *
   * @param forceOpen 강제로 소켓을 재생성할건지 여부
   * - default: false
   * - true : 강제로 소켓을 재생성함
   * - false : 소켓이 연결되어있으면 새로운 소켓을 생성하지 않음
   */
  openSocket(forceOpen?: boolean): void;
  closeSocket(): void;

  isClosed(): boolean;
  isTryConnecting(): boolean;
  isOpened(): boolean;

  wait(microSecond: number): Promise<void>;

  send<SendEventName extends keyof SendEvent>(
    eventName: SendEventName,
    data: SendEvent[SendEventName]["data"],
    times?: number
  ): Promise<void>;

  sendWithAck<
    SendEventName extends keyof SendEvent,
    ReceiveEventName extends keyof ReceiveEvent
  >(
    eventName: SendEventName,
    data: SendEvent[SendEventName]["data"],
    receiveEventName: ReceiveEventName,
    times?: number
  ): Promise<ReceiveEvent[ReceiveEventName]["data"]>;

  addListener<ReceiveEventName extends keyof ReceiveEvent>(
    eventName: ReceiveEventName,
    listener: (data: ReceiveEvent[ReceiveEventName]["data"]) => void
  ): this;

  on<ReceiveEventName extends keyof ReceiveEvent>(
    eventName: ReceiveEventName,
    listener: (data: ReceiveEvent[ReceiveEventName]["data"]) => void
  ): this;

  removeListener<ReceiveEventName extends keyof ReceiveEvent>(
    eventName: ReceiveEventName,
    listener: (data: ReceiveEvent[ReceiveEventName]["data"]) => void
  ): this;

  off<ReceiveEventName extends keyof ReceiveEvent>(
    eventName: ReceiveEventName,
    listener: (data: ReceiveEvent[ReceiveEventName]["data"]) => void
  ): this;

  emit<ReceiveEventName extends keyof ReceiveEvent>(
    eventName: ReceiveEventName,
    data: ReceiveEvent[ReceiveEventName]["data"]
  ): boolean;
}

class WebsocketInstance<
  SendEvent extends BaseEventEmitterEvents,
  ReceiveEvent extends BaseEventEmitterEvents
> extends EventEmitter {
  private _socket: WebSocket;

  private _queue: MessagePayload<SendEvent>[] = [];

  private _uri;
  private _protocols: string | string[] | null = null;
  private _options: {
    headers: { [headerName: string]: string };
    [optionName: string]: any;
  } | null = null;

  constructor(
    uri = "",
    protocols: string | string[] | null = null,
    options: {
      headers: { [headerName: string]: string };
      [optionName: string]: any;
    } | null = null
  ) {
    super();
    this._uri = uri;
    this._protocols = protocols;
    this._options = options;
    // this.setMaxListeners(Infinity);

    // Create new socket instance
    this._socket = this.createSocket();
  }

  private createSocket() {
    // @ts-expect-error
    this._socket = new WebSocket(this._uri, this._protocols, this._options);
    this._socket.addEventListener(
      "open",
      this._handleSocketOpenEvent.bind(this)
    );
    this._queue = [];

    return this._socket;
  }

  /**
   *
   * @param forceReOpen 강제로 소켓을 재생성할건지 여부
   * - default: false
   * - true : 강제로 소켓을 재생성함
   * - false : 소켓이 연결되어있으면 새로운 소켓을 생성하지 않음
   */
  openSocket(forceReOpen: boolean = false) {
    if (!this.isClosed() && !forceReOpen) {
      console.log("Ignore openSocket because socket is not closed");
      return;
    }

    this.createSocket();
  }

  closeSocket() {
    this._socket.close();
  }

  isClosed(): boolean {
    if (
      this._socket.readyState === WebSocket.CLOSED ||
      this._socket.readyState === WebSocket.CLOSING
    ) {
      return true;
    }

    return false;
  }

  isTryConnecting(): boolean {
    if (this._socket.readyState === WebSocket.CONNECTING) {
      return true;
    }

    return false;
  }

  isOpened(): boolean {
    if (this._socket.readyState === WebSocket.OPEN) {
      return true;
    }

    return false;
  }

  wait(microSecond: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, microSecond);
    });
  }

  private async _startSendQueue(times: number) {
    const shifted = this._queue.shift();
    if (shifted === undefined) {
      return;
    }

    if (times > RETRY_TIMES) {
      throw new Error(`Connection Error Retry ${RETRY_TIMES} times`);
    }

    await this.wait(SEND_WAIT_TIMES);
    const { eventName, data } = shifted;
    await this.send(eventName, data, times + 1);
  }

  async send<SendEventName extends keyof SendEvent>(
    eventName: SendEventName,
    data: SendEvent[SendEventName]["data"],
    times: number = 0
  ) {
    if (this.isClosed()) {
      return;
    }
    if (!this.connected) {
      this._queue.push({ eventName, data });
      await this._startSendQueue(times);
      return;
    }

    this._socket.send(
      JSON.stringify({
        event: eventName,
        data,
      })
    );
  }

  async timeoutPromise<T>(
    promise: Promise<T>,
    ms: number,
    timeoutError: any = new Error("Promise Timeout")
  ): Promise<T> {
    const timeoutPromise = new Promise<T>((reject) => {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        return reject(timeoutError);
      }, ms);
    });
    return Promise.race([timeoutPromise, promise]);
  }

  //TODO : 에러핸들러 추가하기
  async sendWithAck<
    SendEventName extends keyof SendEvent,
    ReceiveEventName extends keyof ReceiveEvent
  >(
    eventName: SendEventName,
    data: SendEvent[SendEventName]["data"],
    receiveEventName: ReceiveEventName,
    times: number = 0
  ): Promise<ReceiveEvent[ReceiveEventName]["data"]> {
    if (times > RETRY_TIMES) {
      // console.log(`sendWithAck Connection Error: Retry ${RETRY_TIMES} times\n Try to reconnect`);
      // const isReconnected = await this.reconnect();

      // if (!isReconnected) {
      throw new Error(`Connection Error Retry ${RETRY_TIMES} times`);
      // }
    }

    if (!this.connected) {
      await this.wait(300);
      return await this.sendWithAck(
        eventName,
        data,
        receiveEventName,
        times + 1
      );
    }

    const ackPromise = new Promise<ReceiveEvent[ReceiveEventName]["data"]>(
      (resolve, reject) => {
        const handleAckMessageEvent = (
          data: ReceiveEvent[ReceiveEventName]["data"]
        ) => {
          try {
            this.removeListener(receiveEventName, handleAckMessageEvent);
            return resolve(data);
          } catch (error) {
            reject(error);
          }
        };

        this.addListener(receiveEventName, handleAckMessageEvent.bind(this));

        this._socket.send(
          JSON.stringify({
            event: eventName,
            data,
          })
        );
      }
    );

    return this.timeoutPromise(ackPromise, ACK_WAIT_TIMES);
  }

  private _handleSocketOpenEvent() {
    console.log("socket connected OK");
    this._socket.removeEventListener(
      "open",
      this._handleSocketOpenEvent.bind(this)
    );
    this._setSocketListeners();
    return true;
  }

  private _handleSocketMessageEvent(message: any) {
    try {
      // console.log('handleSocketMessageEvent', message);
      const jsonMessage = JSON.parse(
        message.data
      ) as WebSocketMessage<ReceiveEvent>;
      this.emit(jsonMessage.event, jsonMessage.data);
      //this.emit('message', jsonMessage);
    } catch (error) {
      console.error(
        "_handleSocketMessageEvent() failed to parse message [error:%o]",
        JSON.stringify(error)
      );
    }
  }

  private _handleSocketCloseEvent() {
    console.log("_handleSocketCloseEvent()");
    this._socket.removeEventListener(
      "message",
      this._handleSocketMessageEvent.bind(this)
    );
    this._socket.removeEventListener(
      "close",
      this._handleSocketCloseEvent.bind(this)
    );
    this._socket.removeEventListener(
      "error",
      this._handleSocketErrorEvent.bind(this)
    );
    this.emit("close", {});
  }

  private _handleSocketErrorEvent(error: Event) {
    console.error("_handleSocketErrorEvent() [error:%o]", error);
    this.emit("error", error);
  }

  private _setSocketListeners() {
    this._socket.addEventListener(
      "message",
      this._handleSocketMessageEvent.bind(this)
    );
    this._socket.addEventListener(
      "close",
      this._handleSocketCloseEvent.bind(this)
    );
    this._socket.addEventListener(
      "error",
      this._handleSocketErrorEvent.bind(this)
    );
  }

  get connected() {
    //readyState
    return this.isOpened();
  }
}

export default WebsocketInstance;
