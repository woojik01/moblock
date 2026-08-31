export class PhysicsWorld {
  constructor() {
    this.gravity = 980;
    this.bodies = new Set();
  }

  add(body) {
    this.bodies.add(body);
    return body;
  }

  remove(body) {
    this.bodies.delete(body);
  }

  update(dt) {
    for (const body of this.bodies) {
      if (body.static || body.gravity === false) continue;
      body.vy = (body.vy ?? 0) + this.gravity * dt;
      body.x += (body.vx ?? 0) * dt;
      body.y += body.vy * dt;
    }
  }

  intersects(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x &&
      a.y < b.y + b.height && a.y + a.height > b.y;
  }
}
