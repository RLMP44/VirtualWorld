class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    // get context via the canvas once more
    this.ctx = canvas.getContext("2d");

    // set to default
    this.zoom = 1;
    this.offset = new Point(0, 0);

    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false
    };

    // to change the zoom
    this.#addEventListeners();
  }

  // mouse needs context to know what level of zoom it is
  // so it can place points accurately
  // called in the graphEditor
  getMouse(evt) {
    return new Point(
      evt.offsetX * this.zoom,
      evt.offsetY * this.zoom
    )
  }

  #addEventListeners() {
    // listening to mouse wheel
    this.canvas.addEventListener("mousewheel", this.#handleMouseWheel.bind(this));
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));
  }

  #handleMouseUp(evt) {
    if (this.drag.active) {
      this.offset = add(this.offset, this.drag.offset);
      // reset drag once it is finished
      this.drag = {
        start: new Point(0, 0),
        end: new Point(0, 0),
        offset: new Point(0, 0),
        active: false
      };
    }

  }

  #handleMouseMove(evt) {
    // if being dragged, listen for end, get coordinates, and rewrite offset
    if (this.drag.active) {
      this.drag.end = this.getMouse(evt);
      this.drag.offset = subtract(this.drag.end, this.drag.start);
    }
  }

  #handleMouseDown(evt) {
    // check if the middle mouse button is being pressed
    // rewrite drag.start and set as active
    if (evt.button == 1) {
      this.drag.start = this.getMouse(evt);
      this.drag.active = true;
    }
  }

  #handleMouseWheel(evt) {
    // update the zoom of the screen with the deltaY from the mousewheel
    const dir = Math.sign(evt.deltaY);
    // define how much zoom will change
    const step = 0.1;
    this.zoom += dir * step;
    // one-liner to keep zoom between one and 5
    this.zoom = Math.max(1, Math.min(5, this.zoom));
  }
}
