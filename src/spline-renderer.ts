class SplineRenderer {
  static RenderSpline(spline: Spline, splineCanvas: SplineCanvas, color: string = '#000') {
    const context = splineCanvas.GetContext();
    if (context === null)
      return;

    context.strokeStyle = color;
    context.fillStyle = '#f93';
    
    // curve
    context.lineWidth = 5;
    context.beginPath();
    const [p0, p1, p2, p3] = spline.points;
    context.moveTo(p0.x, p0.y);
    context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    context.stroke();

    // lines
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(p1.x, p1.y);
    context.moveTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.stroke();

    // circles
    context.lineWidth = 2;
    spline.points.forEach(point => {
      context.beginPath();
      context.arc(point.x, point.y, 3, 0, Math.PI * 2);
      context.stroke();
      context.fill();
    });
  } 
}