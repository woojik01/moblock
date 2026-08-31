export class Entity {
  constructor(data = {}) {
    Object.assign(this, {
      id: crypto.randomUUID(),
      name: 'Object',
      x: 0, y: 0,
      width: 48, height: 48,
      rotation: 0,
      scaleX: 1, scaleY: 1,
      visible: true,
      active: true,
      velocityX: 0,
      velocityY: 0,
      ...data
    });
  }

  update(dt) {
    this.x += this.velocityX * dt;
    this.y += this.velocityY * dt;
  }
}
