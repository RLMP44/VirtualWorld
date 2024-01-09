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
          // will break envelopes at overlap to divide into two segments
          // overlapping segments will be then deleted to clean up roads
          let aux = segs1[i].point2;
          segs1[i].point2 = point;
          // add new segment as original point2
          segs1.splice(i + 1, 0, new Segment(point, aux));
          // repeat for other segment
          aux = segs2[j].point2;
          segs2[j].point2 = point;
          segs2.splice(j + 1, 0, new Segment(point, aux));

        }
      }
    }
    return intersections;
  }

  // testing the break method
  drawSegments(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx, { color: getRandomColor() });
    }
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
