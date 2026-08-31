export class PhysicsWorld {
  constructor({ gravity = 0 } = {}) {
    this.gravity = gravity;
  }

  update(objects, dt) {
    for (const object of objects) {
      if (!object.dynamic) continue;
      object.vy = Number(object.vy ?? 0) + this.gravity * dt;
      object.x += Number(object.vx ?? 0) * dt;
      object.y += Number(object.vy ?? 0) * dt;
    }
  }
}
