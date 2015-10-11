/// <reference path="Sup.d.ts"/>

module f {

  /**
  * This ocmponent is to be added on the
  **/
  export class MouseInput extends Sup.ActorComponent {

    /**
    * Tell wether the mouse pointer is currently over the actor.
    */
    isMouseOver: boolean = false;
    
    /**
    * The ray used for the intersection check.
    * Set and updated by the component that is on the actor with the camera component.
    * On other components, it is set to the ray on the camera component's
    */
    ray: Sup.Math.Ray;

    /**
    * Set by the Engine class' isLayerActive() method
    */
    isLayerActive: boolean = true;

    // ----------------------------------------

    /**
    * @param actor - The actor to create the component on.
    */
    constructor(actor: Sup.Actor) {
      super(actor);
      this.actor.mouseInput = this;
      this.__inner = new SupEngine.componentClasses.MouseInput(this.actor.__inner);
      this.__inner.setOuter(this);

      if (actor.eventEmitter == null)
        actor.eventEmitter = new (<any>window).EventEmitter();
      
      if (actor.camera != null) {
        this._camera = actor.camera;
        this.ray = new Sup.Math.Ray();
      }
    }

    // ----------------------------------------

    private _camera: Sup.Camera;

    /**
    * The camera component.
    */
    set camera(camera: Sup.Camera) {
      this._camera = camera;

      if (camera.actor.mouseInput == null)
        new MouseInput(camera.actor);

      this.ray = camera.actor.mouseInput.ray;
    }

    get camera(): Sup.Camera {
      return this._camera;
    }

    /**
    * Sets the camera actor or camera actor's name.
    */
    set cameraActor(actor: Sup.Actor|string) {
      if (typeof actor === "string") {
        let oldActor = <string>actor;
        actor = <Sup.Actor>Sup.getActor(oldActor);
        if (actor == null) {
          console.log("f.MouseInput.cameraActor setter: actor with name '"+oldActor+"' not found.");
          return;
        }
      }

      if ((<Sup.Actor>actor).camera != null) // asume actor
        this.camera = (<Sup.Actor>actor).camera;
    }

    // ----------------------------------------

    update() {
      if (this.isLayerActive === false)
        return;

      if (this.actor.camera != null) // component on the same actor as the camera
        this.ray.setFromCamera(this._camera, Sup.Input.getMousePosition());
          
      else if (this.ray != null) { // component on actors to be checked
        let hit = this.ray.intersectActor(this.actor)[0];

        if (hit != null) {
          if(this.isMouseOver === false) {
            this.isMouseOver = true;
            this.actor.eventEmitter.emit("onMouseEnter");
          }
        }
        else if (this.isMouseOver === true) {
          this.isMouseOver = false;
          this.actor.eventEmitter.emit("onMouseExit");
        }

        if (this.isMouseOver === true) {
          let mouseDelta = Sup.Input.getMouseDelta();
          if (mouseDelta.x !== 0 || mouseDelta.y !== 0)
            this.actor.eventEmitter.emit("onMouseMove");

          if (Sup.Input.wasMouseButtonJustReleased(0)) {
            this.actor.eventEmitter.emit("onLeftClick");
            this.actor.eventEmitter.emit("onClick");
          }

          if (Sup.Input.wasMouseButtonJustReleased(2)) {
            this.actor.eventEmitter.emit("onRightClick");
            this.actor.eventEmitter.emit("onContextMenu");
          }
        }
      }
    }

    destroy() {
      this.__inner._destroy();
      this.__inner = null;
      this.isMouseOver = false;
      this.isLayerActive = false;
      this.camera = null;
      this.ray = null;
      this.actor.mouseInput = null;
      super.destroy();
    }
  }

}

(<any>window).f = f;
