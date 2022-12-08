class SplineCanvas {
  canvas: HTMLCanvasElement;
  splines: CanvasSplineNode[];
  constructor (width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.className = 'spline-canvas';
    const context = this.canvas.getContext('2d');
    if (context === null)
      return;
    context.fillStyle = '#f94';
    context.fillRect(0, 0, width, height);
    document.body.appendChild(this.canvas);

    this.splines = [];

    this.canvas.addEventListener('mousemove', (e) => this.OnMouseMove(e));
  }

  AddSpline(id: string, spline: Spline) {
    this.splines.push(new CanvasSplineNode(id, spline));
  }

  RemoveSplineById(id: String) {
    const splineIndex = this.splines.findIndex(spline => spline.id == id);
    if (splineIndex === -1)
      return;
    this.splines.splice(splineIndex, 1);
  }

  GetContext(): CanvasRenderingContext2D | null {
    return this.canvas.getContext('2d');
  }

  private CheckIntersect(mx: number, my: number): boolean {
    const { length } = this.splines;
    for (let i = 0; i < length; i++) {
      const { points } = this.splines[i].spline;
      for (let j = 0; j < 4; j++) {
        const p = points[j];
        const dx = p.x - mx;
        const dy = p.y - my;
        const dl = dx * dx + dy * dy;
        const r = 5;
        if (dl < r * r)
          return true;
      }
    }
    return false;
  }

  private OnMouseMove(e: MouseEvent) {
    this.canvas.style.cursor = this.CheckIntersect(e.offsetX, e.offsetY) ? 'pointer' : 'default';
    const { length } = this.splines;
    const context = this.GetContext();
    if (context === null)
      return;

    context.fillStyle = '#f93';
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < length; i++) {
      SplineRenderer.RenderSpline(this.splines[i].spline, this, '#00f');
    }
  }
}