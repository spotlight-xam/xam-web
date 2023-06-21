import WebsocketInstance from "./WebSocketInstance";
import {
  SOCKET_SERVICE_URL,
  PINGPONG_DELAY_TIMES,
} from "./webSocket.constants";
import {
  MessageOfWebSocketForReceive,
  MessageOfWebSocketForSend,
} from "./types";

interface WebSocketConnectInfo {
  token: string;
  deviceToken: string;
  deviceName: string;
}
class WebSocketController {
  private static _instance: WebSocketController | null = null;

  webSocket: WebsocketInstance<
    MessageOfWebSocketForSend,
    MessageOfWebSocketForReceive
  >;

  private _pingInterval: NodeJS.Timer | null = null;
  private _isBackground: boolean = false;

  private constructor() {
    this.webSocket = this._create();
  }
  static createInstance() {
    if (!WebSocketController._instance) {
      WebSocketController._instance = new WebSocketController();
    }

    return WebSocketController._instance;
  }

  static getInstance() {
    if (!WebSocketController._instance) {
      throw new Error(
        "WebSocketController.getInstance: Cannot get controller instance is not created"
      );
    }

    return WebSocketController._instance;
  }

  static destroyInstance() {
    if (WebSocketController._instance) {
      WebSocketController._instance.destroy();
      WebSocketController._instance = null;
    }
  }

  private _create() {
    // const protocols =
    //   Platform.OS === "web" ? [token, deviceToken, deviceName] : null;
    // const options =
    //   Platform.OS === "web"
    //     ? undefined
    //     : {
    //         headers: {
    //           "x-user-token": token,
    //           "x-device-token": deviceToken,
    //           "x-device-name": deviceName,
    //         },
    //       };

    // console.log('================= start create =================');
    // create new socket instance
    this.webSocket = new WebsocketInstance(
      SOCKET_SERVICE_URL,
      undefined,
      undefined
    );

    this._createPingPongEvent();
    // console.log('================= end create =================');

    return this.webSocket;
  }

  /**
   * @summary close socket connection
   */
  close() {
    // if (this.webSocket === null) {
    //   // TODO Error handling - `this.instance`가 null일 때 처리
    //   throw new Error('WebSocketController.close: instance is null');
    // }
    // Logger.log('================= start close =================');
    // this.instance?.removeListener('close', this._handleAutoReconnect);
    this.webSocket.closeSocket();
    this._removePingPongEvent();
    // Logger.log('================= end close =================');
  }

  /**
   * @summary reconnect socket connection
   */
  async reconnect() {
    // Logger.log('================= start reconnect =================');
    this.webSocket.openSocket();

    this._createPingPongEvent();
    // Logger.log('================= end reconnect =================');
  }

  destroy() {
    // Logger.log('================= start destroy =================');
    this.close();
    this.webSocket.removeAllListeners();
    // Logger.log('================= end destroy =================');
  }

  private _sendPing() {
    if (!this.webSocket) {
      console.log(
        "WebSocketController._sendPing: Cannot send ping event, instance is undefined\nClear ping interval"
      );
      this._removePingPongEvent();

      return;
    }

    if (this.webSocket.isClosed()) {
      if (this._isBackground) {
        // Logger.log('Socket is closed when ping pong event in background, clear ping interval');
        this._removePingPongEvent();
      } else {
        // TODO: try reconnect
        // Logger.log('Socket is closed when ping pong event in foreground, try reconnect');
        this.reconnect();
      }
    }

    // Logger.log(`[${new Date().toISOString()}]`, 'ping sent ====================>');
    this.webSocket
      .sendWithAck("ping", "", "pong")
      .then(() => {
        // Logger.log(`[${new Date().toISOString()}]`, 'pong received <====================');
      })
      .catch((error) => {
        console.log("pong timeout, try reconnect\n", error);

        this.reconnect();
      });
  }

  private _createPingPongEvent() {
    if (this.webSocket === null) {
      // throw new Error('WebSocketController._createPingPongEvent: instance is null');
    }

    if (this._pingInterval) {
      // Logger.log('WebSocketController._createPingPongEvent: ping interval is already exist');
      return;
    }

    // start ping interval
    console.log(
      "WebSocketController._createPingPongEvent: create ping interval"
    );
    this._pingInterval = setInterval(
      this._sendPing.bind(this),
      PINGPONG_DELAY_TIMES
    );
  }

  private _removePingPongEvent() {
    if (this._pingInterval) {
      clearInterval(this._pingInterval);
      this._pingInterval = null;
    }
  }

  // login(token: string) {
  //   // destroy previous socket instance if exists
  //   this.destroy();

  //   this._create(token);
  // }

  // logout() {
  //   this.destroy();
  // }

  onBackground() {
    if (this._isBackground) {
      return;
    }

    this._isBackground = true;
    this.close();
  }

  onForeground() {
    if (!this._isBackground) {
      return;
    }

    this._isBackground = false;
    this.reconnect();
  }
}

export default WebSocketController;
