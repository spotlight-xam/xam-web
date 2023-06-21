export type EventEmitterEventKeyable = string | symbol;

export interface BaseEventEmitterEvent {
  event: EventEmitterEventKeyable;
  data: any;
}

export interface BaseEventEmitterEvents
  extends Record<EventEmitterEventKeyable, BaseEventEmitterEvent> {
  close: {
    event: 'close';
    data: object;
  };
  open: {
    event: 'open';
    data: object;
  };
}

// export type ObjectToUnion<T> = T extends object ? T[keyof T] : never;

export type WebSocketMessage<
  Events extends BaseEventEmitterEvents,
  EventName extends keyof Events = keyof Events
> = Events[EventName];

// TODO: check name (only of queue)
export interface MessagePayload<Events extends BaseEventEmitterEvents> {
  eventName: keyof Events;
  data: Events[keyof Events]['data'];
}
