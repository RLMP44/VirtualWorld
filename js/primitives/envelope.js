class Envelope {
  constructor(skeleton, width, roundness = 1) {
    this.skeleton = skeleton;
    this.poly = this.#generatePolygon(width, roundness);
  }

  #generatePolygon(width, roundness) {
    const {point1, point2 } = this.skeleton;

    const radius = width / 2;

    const alpha = angle(subtract(point1, point2));
    // clockwise
    const alpha_cw = alpha + Math.PI / 2;
    // counter clockwise
    const alpha_ccw = alpha - Math.PI / 2;
    // determines the offset we move it along the angle
    // creates our 4 points along the segment
    // const point1_ccw = translate(point1, alpha_ccw, radius);
    // const point2_ccw = translate(point2, alpha_ccw, radius);
    // const point2_cw = translate(point2, alpha_cw, radius);
    // const point1_cw = translate(point1, alpha_cw, radius);

    // adds border radius manually
    // doesn't allow border radius of 0
    const step = Math.PI / Math.max(1, roundness);
    // adds a small bit to make sure "i" reaches the alpha_cw value
    const eps = step / 2;
    const points = [];
    // add points to be used to make polygon
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(translate(point1, i, radius));
    }
    // handles the second point but turns 180 degrees so rounded edge is on the outside
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(translate(point2, Math.PI + i, radius));
    }

    return new Polygon(points);
  }

  draw(ctx, options) {
    this.poly.draw(ctx, options);
    // colorful highlighting for debugging
    // this.poly.drawSegments(ctx);
  }
}
