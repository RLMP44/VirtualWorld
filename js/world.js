class World {
  constructor(graph,
    roadWidth = 100,
    roadRoundness = 10,
    buildingWidth = 150,
    buildingMinLength = 150,
    spacing = 50,
  ) {
    this.graph = graph;
    this.roadWidth = roadWidth;
    this.roadRoundness = roadRoundness;
    this.buildingWidth = buildingWidth;
    this.buildingMinLength = buildingMinLength;
    this.spacing = spacing;

    this.envelopes = [];
    this.roadBorders = [];
    this.buildings = []

    this.generate ();
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
  }

  #generateBuildings() {
    const tmpEnvelopes = [];
    for (const seg of this.graph.segments) {
      temEnvelopes.push(
        new Envelope(
          seg,
          this.roadWidth + this.buildingWidth + this.spacing * 2,
          this.roadRoundness
        )
      );
    }
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
  }
}
