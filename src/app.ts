class App {
  splineCanvas: SplineCanvas;
  Init() {
    this.splineCanvas = new SplineCanvas(800, 800);

    const curve = new Spline(
      new Vector2(10, 10),
      new Vector2(100, 20),
      new Vector2(150, 150),
      new Vector2(150, 200));
    
    this.splineCanvas.AddSpline('test', curve);
  }
}
