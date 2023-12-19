class Segment {
  constructor(point1, point2) {
    this.point1 = point1;
    this.point2 = point2;
  }

  draw(ctx, width = 2, color = "black") {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    // set the position
    ctx.moveTo(this.point1.x, this.point1.y);
    // set end point, detail it will be a line that is drawn
    ctx.lineTo(this.point2.x, this.point2.y);
    // connect the nodes/dots
    ctx.stroke();
  }
}
