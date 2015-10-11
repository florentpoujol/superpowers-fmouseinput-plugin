declare module Sup {

  function log(message?: any, ...optionalParams: any[]): void;
  function exit();

  class Asset {
    name: string;
    path: string;
    type: string;
    constructor(inner: { [key:string]: any; });
  }

  class Folder extends Asset {
    children: string[];
  }

  function get(path: string, options?: { "ignoreMissing": boolean; }): Asset;
  function get<T extends Asset>(path: string, type: new(inner: { [key:string]: any; }) => T, options?: { "ignoreMissing": boolean; }): T;

  function getActor(name: string): Actor;
  function destroyAllActors(): void;

  class ActorComponent {
    actor: Actor;
    constructor(actor: Actor);
    destroy(): void;
    isDestroyed(): boolean;
  }

  class Behavior extends ActorComponent {
    constructor(actor: Actor, properties?: { [key: string]: any; });
  }

  function registerBehavior<T extends Behavior>(behaviorClass: new (actor: Actor) => T);
}
