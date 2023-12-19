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

  // add a new point only if it doesn't already exist
  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  // removes a point at specified index, but only 1 in this case
  removePoint(point) {
    const segs = this.getSegmentsWithPoint(point);
    for (const seg of segs) {
      this.removeSegment(seg);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  // adds segments to the canvas when button is pushed
  addSegment(seg) {
    this.segments.push(seg);
  }

  // check to see if a segment already exists
  containsSegment(seg) {
    return this.segments.find((s) => s.equals(seg));
  }

  // add a new segment only if it doesn't already exist
  tryAddSegment(seg) {
    if (!this.containsSegment(seg) && !seg.point1.equals(seg.point2)) {
      this.addSegment(seg);
      return true;
    }
    return false;
  }

  // removes an element at specified index, but only 1 in this case
  removeSegment(seg) {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }

  getSegmentsWithPoint(point) {
    const segs = [];
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        segs.push(seg);
      }
    }
    return segs;
  }

  // clear the canvas
  dispose() {
    this.points.length = 0;
    this.segments.length = 0;
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
