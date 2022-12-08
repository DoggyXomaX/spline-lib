class Vector2 {
  x: number;
  y: number;
  magnitude: number;
  constructor (x: number, y: number) {
    this.Set(x, y);
  }
  Add(v: Vector2) {
    this.Set(this.x + v.x, this.y + v.y);
  }
  Scale(v: Vector2) {
    this.Set(this.x * v.x, this.y * v.y);
  }
  ScaleN(n: number) {
    this.Set(this.x * n, this.y * n);
  }
  Set(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.magnitude = this.x * this.x + this.y * this.y;
  }
  Length(): number {
    return Math.sqrt(this.magnitude);
  }
}
