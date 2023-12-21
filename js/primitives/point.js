class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(point) {
    return this.x == point.x && this.y == point.y;
  }

  // create point
  // pass in multiple params or allow them to be blank
  draw(ctx, { size = 18, color = "black", outline = false } = {} ) {
    const radius = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    // must use radians, hence the Math.PI
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fill();
    if (outline) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      // Math.PI * 2 to draw a complete circle
      ctx.arc(this.x, this.y, radius * 0.6, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}
