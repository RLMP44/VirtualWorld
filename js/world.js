class World {
  constructor(graph,
    roadWidth = 100,
    roadRoundness = 10,
    buildingWidth = 150,
    buildingMinLength = 150,
    spacing = 50,
    treeSize = 160
  ) {
    this.graph = graph;
    this.roadWidth = roadWidth;
    this.roadRoundness = roadRoundness;
    this.buildingWidth = buildingWidth;
    this.buildingMinLength = buildingMinLength;
    this.spacing = spacing;
    this.treeSize = treeSize;

    this.envelopes = [];
    this.roadBorders = [];
    this.buildings = [];
    this.trees = [];

    this.generate();
  }

  generate() {
    this.envelopes.length = 0;
    for (const seg of this.graph.segments) {
      this.envelopes.push(
        new Envelope(seg, this.roadWidth, this.roadRoundness)
      );
    }

    // this.intersections = Polygon.break(
    //   // breaks apart two intersection envelopes to create smoother intersections
    //   this.envelopes[0].poly,
    //   this.envelopes[1].poly
    // );
    this.roadBorders = Polygon.union(this.envelopes.map((e) => e.poly));
    this.buildings = this.#generateBuildings();
    this.trees = this.#generateTrees();
  }

  #generateTrees() {
    const points = [
      ...this.roadBorders.map((road) => [road.point1, road.point2]).flat(),
      ...this.buildings.map((building) => building.points).flat()
    ];
    const left = Math.min(...points.map((point) => point.x));
    const right = Math.max(...points.map((point) => point.x));
    const top = Math.min(...points.map((point) => point.y));
    const bottom = Math.max(...points.map((point) => point.y));

    const illegalPolys = [
      ...this.buildings,
      ...this.envelopes.map((envelope) => envelope.poly)
    ];

    const trees = [];
    // attempt to make trees and account for the fact that they can't always be placed
    let tryCount = 0;
    while (tryCount < 100) {
      const point = new Point(
        lerp(left, right, Math.random()),
        lerp(bottom, top, Math.random())
      );

      let keep = true;
      // check if trees collide with buildings or road
      for (const poly of illegalPolys) {
        if (poly.containsPoint(point) || poly.distanceToPoint(point) < (this.treeSize / 2)) {
          keep = false;
          break;
        }
      }

      // check if trees overlap each other
      if (keep) {
        for (const tree of trees) {
          if (distance(tree, point) < this.treeSize) {
            keep = false;
            break;
          }
        }
      }

      // don't generate too far from road or building
      if (keep) {
        let closeToSomething = false;
        for (const poly of illegalPolys) {
          if (poly.distanceToPoint(point) < this.treeSize * 2) {
            closeToSomething = true;
            break;
          }
        }
        keep = closeToSomething;
      }

      if (keep) {
        trees.push(point);
        tryCount = 0;
      }
      tryCount++
    }
    return trees;
  }

  #generateBuildings() {
    const tmpEnvelopes = [];
    for (const seg of this.graph.segments) {
      tmpEnvelopes.push(
        new Envelope(
          seg,
          this.roadWidth + this.buildingWidth + this.spacing * 2,
          this.roadRoundness
        )
      );
    }

    // create guides to determine if a building can fit around a road
    const guides = Polygon.union(tmpEnvelopes.map((e) => e.poly));

    // loop through segments in guides to determine if a building is possible
    for (let i = 0; i < guides.length; i++) {
      const seg = guides[i];
      if (seg.length() < this.buildingMinLength) {
        guides.splice(i, 1);
        i--;
      }
    }

    const supports = [];
    for (let seg of guides) {
      const len = seg.length() + this.spacing;
      const buildingCount = Math.floor(
        len / (this.buildingMinLength + this.spacing)
      );
      const buildingLength = len / buildingCount - this.spacing;

      const dir = seg.directionVector();

      let q1 = seg.point1;
      let q2 = add(q1, scale(dir, buildingLength));
      supports.push(new Segment(q1, q2));

      for (let i = 2; i <= buildingCount; i++) {
        q1 = add(q2, scale(dir, this.spacing));
        q2 = add(q1, scale(dir, buildingLength));
        supports.push(new Segment(q1, q2));
      }
    }

    const bases = [];
    for (const seg of supports) {
      bases.push(new Envelope(seg, this.buildingWidth).poly);
    }

    // check for intersecting building bases and remove one
    for (let i = 0; i < bases.length - 1; i++) {
      for (let j = i + 1; j < bases.length; j++) {
        if (bases[i].intersectsPoly(bases[j])) {
          bases.splice(j, 1);
          j--;
        }
      };
    }

    return bases;
  }

  draw(ctx) {
    // customize road appearance
    for (const env of this.envelopes) {
      env.draw(ctx, { fill: "#BBB", stroke: "#BBB", lineWidth: 15 });
    };
    // customize road midline appearance
    for (const seg of this.graph.segments) {
      seg.draw(ctx, { color: "white", width: 4, dash: [10, 10] })
    }
    // red intersection points used for debugging but not needed anymore
    // for (const int of this.intersections) {
    //   int.draw(ctx, { color: "red", size: 6 });
    // }
    for (const seg of this.roadBorders) {
      seg.draw(ctx, { color: "white", width: 4 });
    }

    for (const tree of this.trees) {
      tree.draw(ctx, { size: this.treeSize, color: 'rgba(0,0,0,0.5)' });
    }

    for (const bld of this.buildings) {
      bld.draw(ctx);
    }
  }
}
