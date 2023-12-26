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
    console.log(evt.deltaY);
  }
}
