class SelectedSplineInfo {
  splineNode: CanvasSplineNode;
  pointIndex: number;
  constructor (splineNode: CanvasSplineNode, pointIndex: number) {
    this.splineNode = splineNode;
    this.pointIndex = pointIndex;
  }
}