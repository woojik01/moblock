export class PhysicsWorld {
  constructor({ gravity = 900 } = {}) {
    this.gravity = gravity;
    this.bodies = new Map();
  }

  add(object, options = {}) {
    const body = {
      object,
      dynamic: options.dynamic ?? true,
      gravity: options.gravity ?? true,
      vx: options.vx ?? 0,
      vy: options.vy ?? 0,
      onGround: false
    };
    this.bodies.set(object.id, body);
    return body;
  }

  remove(object) { this.bodies.delete(object.id); }

  update(dt, bounds = null) {
    for (const body of this.bodies.values()) {
      if (!body.dynamic) continue;
      if (body.gravity) body.vy += this.gravity * dt;
      body.object.x += body.vx * dt;
      body.object.y += body.vy * dt;
      body.onGround = false;

      if (bounds) {
        const floor = bounds.height - body.object.height;
        if (body.object.y >= floor) {
          body.object.y = floor;
          body.vy = 0;
          body.onGround = true;
        }
        if (body.object.x < 0) body.object.x = 0;
        if (body.object.x + body.object.width > bounds.width) {
          body.object.x = bounds.width - body.object.width;
        }
      }
    }
  }
}
