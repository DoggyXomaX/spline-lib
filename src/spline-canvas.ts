class SplineCanvas {
  canvas: HTMLCanvasElement;
  splines: CanvasSplineNode[];
  pressed: boolean;
  static Selected: SelectedSplineInfo | null;

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
    SplineCanvas.Selected = null;

    this.canvas.addEventListener('mousemove', (e) => this.OnMouseMove(e));
    this.canvas.addEventListener('mousedown', (e) => this.OnMouseDown(e));
    window.addEventListener('mouseup', (e) => this.OnMouseUp(e));
    this.Update();
  }

  AddSpline(id: string, spline: Spline) {
    this.splines.push(new CanvasSplineNode(id, spline));
    this.Update();
  }

  RemoveSplineById(id: String) {
    const splineIndex = this.splines.findIndex(spline => spline.id == id);
    if (splineIndex === -1)
      return;
    this.splines.splice(splineIndex, 1);
    this.Update();
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
        if (dl < r * r) {
          SplineCanvas.Selected = new SelectedSplineInfo(this.splines[i], j, 0);
          return true;
        }
      }
    }
    SplineCanvas.Selected = null;
    return false;
  }

  private OnMouseMove(e: MouseEvent | null) {
    const pos = e === null ? {x: 0, y: 0} : {x: e.offsetX, y: e.offsetY};

    if (this.pressed) {
      if (SplineCanvas.Selected !== null)
        this.MoveSelected(pos.x, pos.y);
    } else {
      const intersects = this.CheckIntersect(pos.x, pos.y);
      this.canvas.style.cursor = intersects ? 'pointer' : 'default';
    }
    this.Update();
  }

  private MoveSelected(mx: number, my: number) {
    if (SplineCanvas.Selected === null)
      return;
    const s = SplineCanvas.Selected;
    s.splineNode.spline.points[s.pointIndex].Set(mx, my);
  }

  private OnMouseDown(e: MouseEvent | null) {
    this.pressed = true;
    this.Update();
  }

  private OnMouseUp(e: MouseEvent | null) {
    this.pressed = false;
    this.Update();
  }

  private Update() {
    const { length } = this.splines;
    const context = this.GetContext();
    if (context === null)
      return;

    context.fillStyle = '#f93';
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < length; i++) {
      SplineRenderer.RenderSpline(this.splines[i].spline, this, '#00f');
    }

    const s = SplineCanvas.Selected;
    if (s !== null) {
      const node = s.splineNode;
      context.strokeStyle = this.pressed ? '#3f3' : '#f03';
      context.beginPath();

      const p = node.spline.points[s.pointIndex];
      context.arc(p.x, p.y, 5, 0, Math.PI * 2);
      context.stroke();
    }
  }
}