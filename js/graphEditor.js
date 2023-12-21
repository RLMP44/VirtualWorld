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
      // right click
      if (evt.button == 2) {
        if (this.hovered) {
          this.#removePoint(this.hovered);
        }
      }
      // left click
      if (evt.button == 0) {
        // get mouse location
        const mouse = new Point(evt.offsetX, evt.offsetY);
        // if mouse is near an existing point, select that point
        if (this.hovered) {
          this.selected = this.hovered;
          return;
        }
        // add point where mouse clicks
        this.graph.addPoint(mouse);
        this.selected = mouse;
        this.hovered = mouse;
      }
    });

    this.canvas.addEventListener("mousemove", (evt) => {
      // get mouse location
      const mouse = new Point(evt.offsetX, evt.offsetY);
      // check to see if the current mouse point is near an existing point (threshold of 10)
      this.hovered = getNearestPoint(mouse, this.graph.points, 10);
    });
    // prevent menu from popping up
    this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
  }

  // prevents point from still being visible when hovered after being deleted
  #removePoint(point) {
    this.graph.removePoint(point);
    this.hovered = null;
    if (this.selected == point) {
      this.selected = null;
    }
  }

  display() {
    this.graph.draw(this.ctx);
    // triggers fill to appear on points being hovered over
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
    // triggers outline to appear on selected point
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
