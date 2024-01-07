class Polygon {
  constructor(points) {
    this.points = points;
    this.segments = [];
    // loop over all of the segments and push into segments array
    for (let i = 1; i <= points.length; i++) {
      this.segments.push(
        // adding % makes second one a 0 to avoid an error
        new Segment(points[i - 1], points[i % points.length])
      );
    }
  }

  static break(poly1, poly2) {
    const segs1 = poly1.segments;
    const segs2 = poly2.segments;
    const intersections = [];
    // loop over both arrays simultaneously
    for (let i = 0; i < segs1.length; i++) {
      for (let j = 0; j < segs2.length; j++) {
        const int = getIntersection(
          segs1[i].point1, segs1[i].point2, segs2[j].point1, segs2[j].point2
        );

        // check if there is an intersection
        // if there is, make sure the offset isn't too small
        if (int && int.offset != 1 && int.offset != 0) {
          const point = new Point(int.x, int.y);
          intersections.push(point);
        }
      }
    }
    return intersections;
  }

  draw(ctx, { stroke = "blue", lineWidth = 2, fill = "rgba(0,0,255,0.3)" } = {}) {
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    // draws the line back to the first point
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
