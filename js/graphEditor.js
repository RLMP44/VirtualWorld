class GraphEditor {
  constructor(viewport, graph) {
    this.viewport = viewport;
    this.canvas = viewport.canvas;
    this.graph = graph;

    this.ctx = this.canvas.getContext("2d");

    // set variables as null initial and reassign later
    this.selected = null;
    this.hovered = null;
    this.dragging = false;
    this.mouse = null;

    // add event listeners for mouse function
    this.#addEventListeners();
  }

  #addEventListeners() {
    // must bind the graphEditor as "this" otherwise it will assume "this" is the canvas
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    // prevent menu from popping up
    this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
    this.canvas.addEventListener("mouseup", () => this.dragging = false);
    }

  #handleMouseDown(evt) {
    // right click
    if (evt.button == 2) {
      // prioritize deselecting a point over deleting one
      if (this.selected) {
        this.selected = null;
      } else if (this.hovered) {
        this.#removePoint(this.hovered);
      }
    }
    // left click
    if (evt.button == 0) {
      // if mouse is near an existing point, select that point
      if (this.hovered) {
        this.#select(this.hovered)
        this.selected = this.hovered;
        this.dragging = true;
        return;
      }
      // add point where mouse clicks
      this.graph.addPoint(this.mouse);
      // add segment
      this.#select(this.mouse);
      this.hovered = this.mouse;
    }
  }

  #handleMouseMove(evt) {
    // get mouse location
    // this.mouse = new Point(evt.offsetX, evt.offsetY);
    // get mouse location from the viewport
    this.mouse = this.viewport.getMouse(evt);
    // check to see if the current mouse point is near an existing point (threshold of 10)
    this.hovered = getNearestPoint(this.mouse, this.graph.points, 10 * this.viewport.zoom);
    if (this.dragging == true) {
      this.selected.x = this.mouse.x;
      this.selected.y = this.mouse.y;
    }
  }

  #select(point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
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
      const intent = this.hovered ? this.hovered : this.mouse;
      new Segment(this.selected, intent).draw(ctx, { dash: [3, 3]});
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
