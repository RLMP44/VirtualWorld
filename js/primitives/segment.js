class Segment {
  constructor(point1, point2) {
    this.point1 = point1;
    this.point2 = point2;
  }

  length() {
    return distance(this.point1, this.point2);
  }

  directionVector() {
    return normalize(subtract(this.point2, this.point1));
  }

  // create function to check if new segment exists
  // by comparing new segment points to existing segment points
  equals(seg) {
    return this.includes(seg.point1) && this.includes(seg.point2);
  }

  // checks if a given point equals either point of an existing segment
  includes(point) {
    return this.point1.equals(point) || this.point2.equals(point);
  }

  draw(ctx, { width = 2, color = "black", dash = [] } = {}) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash);
    // set the position
    ctx.moveTo(this.point1.x, this.point1.y);
    // set end point, detail it will be a line that is drawn
    ctx.lineTo(this.point2.x, this.point2.y);
    // connect the nodes/dots
    ctx.stroke();
    // reset the dashed lines afterwards
    ctx.setLineDash([]);
  }
}
