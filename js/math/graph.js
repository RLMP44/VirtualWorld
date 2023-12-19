class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  // adds points to the canvas when button is pushed
  addPoint(point) {
    this.points.push(point);
  }

  // checks to see if a point already exists so we don't have 2 in the same spot
  // will return something (true) or nothing (false)
  containsPoint(point) {
    return this.points.find((p) => p.equals(point));
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  // adds segments to the canvas when button is pushed
  addSegment(seg) {
    this.segments.push(seg);
  }

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}
