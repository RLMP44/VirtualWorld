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

  // create a method that will break apart all polygons at intersections
  // and then delete any intersecting ones
  static union(polys) {
    Polygon.multiBreak(polys);
    const keptSegments = [];
    // loop over polys
    for (let i = 0; i < polys.length; i++) {
      // loop over segments of one poly
      for (const seg of polys[i].segments) {
        // keep segment unless instructed otherwise
        let keep = true;
        // loop over polys again
        for (let j = 0; j < polys.length; j++) {
          // as long as poly from first loop and third loop aren't the same
          if (i != j) {
            // check to see if current j poly contains the segment from first poly loop
            if (polys[j].containsSegment(seg)) {
              // if it does, it is intersecting and doesn't need to be kept
              keep = false;
              break;
            }
          }
        }
        if (keep) {
          keptSegments.push(seg);
        }
      }
    }
    return keptSegments;
  }

  static multiBreak(polys) {
    // loop over all polygons
    for (let i = 0; i < polys.length - 1; i++) {
      // loop again to compare all polys against each other
      // but make sure to keep comparing only the subsequent poly against the rest
      for (let j = i + 1; j < polys.length; j++) {
        Polygon.break(polys[i], polys[j]);
      }
    }
  }

  static break(poly1, poly2) {
    const segs1 = poly1.segments;
    const segs2 = poly2.segments;
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
  }

  distanceToPoint(point) {
    return Math.min(...this.segments.map((seg) => seg.distanceToPoint(point)));
  }

  distanceToPoly(poly) {
    return Math.min(...this.points.map((point) => poly.distanceToPoint(point)));
  }

  intersectsPoly(poly) {
    for (let s1 of this.segments) {
      for (let s2 of poly.segments) {
        if (getIntersection(s1.point1, s1.point2, s2.point1, s2.point2)) {
          return true;
        }
      }
    }
    return false;
  }

  containsSegment(seg) {
    const midpoint = average(seg.point1, seg.point2);
    return this.containsPoint(midpoint);
  }

  containsPoint(point) {
    const outerPoint = new Point(-1000, -1000);
    let intersectionCount = 0;
    for (const seg of this.segments) {
      const int = getIntersection(outerPoint, point, seg.point1, seg.point2);
      if (int) {
        intersectionCount++;
      }
    }
    // if intersectionCount is even, we are outside of a polygon
    // odd numbers mean we entered and didn't leave, so inside a polygon
    return intersectionCount % 2 == 1;
  }

  // testing the break method
  drawSegments(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx, { color: getRandomColor(), width: 5 });
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
