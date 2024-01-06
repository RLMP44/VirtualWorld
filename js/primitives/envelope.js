class Envelope {
  constructor(skeleton, width) {
    this.skeleton = skeleton;
    this.poly = this.#generatePolygon(width);
  }

  #generatePolygon(width) {
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
    const step = Math.PI / 10;
    const points = [];
    // add points to be used to make polygon
    for (let i = alpha_ccw; i <= alpha_cw; i += step) {
      points.push(translate(point1, i, radius));
    }
    // handles the second point but turns 180 degrees so rounded edge is on the outside
    for (let i = alpha_ccw; i <= alpha_cw; i += step) {
      points.push(translate(point2, Math.PI + i, radius));
    }

    return new Polygon(points);
  }

  draw(ctx) {
    this.poly.draw(ctx);
  }
}
