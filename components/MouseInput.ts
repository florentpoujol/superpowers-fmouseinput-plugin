
export default class MouseInput extends SupEngine.ActorComponent {
  __outer: any;

  constructor(actor: SupEngine.Actor) {
    super(actor, "MouseInput");
  }

  update() {
    if (this.__outer != null)
      this.__outer.update();
  }

  setIsLayerActive(active: boolean) {
    this.__outer.isActive = active;
  }

  _destroy() {
    this.__outer = null;
    super._destroy();
  }
}
