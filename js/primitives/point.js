class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // create point
  draw(ctx, size = 18, color = "black") {
    const radius = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    // must use radians, hence the Math.PI
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
