///<reference path="../../../../../SupClient/SupClient.d.ts"/>
///<reference path="../../../../../SupCore/SupCore.d.ts"/>
///<reference path="../../../SupEngine/SupEngine.d.ts"/>
///<reference path="../../../SupRuntime/SupRuntime.d.ts"/>

declare class EventEmitter {
  static listenerCount(emitter: EventEmitter, event: string): number;

  addListener(event: string, listener: Function): EventEmitter;
  on(event: string, listener: Function): EventEmitter;
  once(event: string, listener: Function): EventEmitter;
  removeListener(event: string, listener: Function): EventEmitter;
  removeAllListeners(event?: string): EventEmitter;
  setMaxListeners(n: number): void;
  listeners(event: string): Function[];
  emit(event: string, ...args: any[]): boolean;
}
