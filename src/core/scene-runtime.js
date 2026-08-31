import { intersects, resolveStatic } from './collision.js';

export class SceneRuntime {
  constructor(scene) {
    this.scene = scene;
    this.staticColliders = [];
  }

  addStaticCollider(collider) {
    this.staticColliders.push(collider);
    return collider;
  }

  update(dt) {
    for (const object of this.scene.objects) {
      if (!object.visible || !object.physics) continue;
      object.grounded = false;
      object.vy += (object.gravity ?? 980) * dt;
      object.x += (object.vx ?? 0) * dt;
      object.y += (object.vy ?? 0) * dt;
      for (const collider of this.staticColliders) {
        if (intersects(object, collider)) resolveStatic(object, collider);
      }
    }
  }
}
