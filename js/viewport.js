class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    // get context via the canvas once more
    this.ctx = canvas.getContext("2d");

    // set to default
    this.zoom = 1;

    // to change the zoom
    this.#addEventListeners();
  }

  #addEventListeners() {
    // listening to mouse wheel
    this.canvas.addEventListener("mousewheel", this.#handleMouseWheel.bind(this));
  }

  #handleMouseWheel(evt) {
    // update the zoom of the screen with the deltaY from the mousewheel
    const dir = Math.sign(evt.deltaY);
    // define how much zoom will change
    const step = 0.1;
    this.zoom += dir * step;
    // one-liner to keep zoom between one and 5
    this.zoom = Math.max(1, Math.min(5, this.zoom));
    console.log(this.zoom);
  }
}
