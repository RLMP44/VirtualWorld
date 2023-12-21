class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;

    this.ctx = this.canvas.getContext("2d");

    // set variables as null initial and reassign later
    this.selected = null;
    this.hovered = null;

    // add event listeners for mouse function
    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousedown", (evt) => {
      // get mouse location
      const mouse = new Point(evt.offsetX, evt.offsetY);
      // check to see if the current mouse point is near an existing point
      this.hovered = getNearestPoint(mouse, this.graph.points, 10);
      // if it is near an existing point, select that point
      if (this.hovered) {
        this.selected = this.hovered;
        return;
      }
      // add point where mouse clicks
      this.graph.addPoint(mouse);
      this.selected = mouse;
    });
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
