import { SceneRuntime } from '../core/scene-runtime.js';

export class Runtime {
  constructor(project, canvas) {
    this.project = project;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this.lastTime = 0;
    this.sceneRuntime = new SceneRuntime(project.scene);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.tick.bind(this));
  }

  stop() { this.running = false; }

  tick(time) {
    if (!this.running) return;
    const dt = Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;
    this.update(dt);
    this.render();
    requestAnimationFrame(this.tick.bind(this));
  }

  update(dt) {
    this.sceneRuntime.update(dt);
  }

  render() {
    const { width, height } = this.project.settings;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.fillStyle = '#111';
    this.ctx.fillRect(0, 0, width, height);

    for (const object of this.project.scene.objects) {
      if (!object.visible) continue;
      this.ctx.save();
      this.ctx.translate(object.x + object.width / 2, object.y + object.height / 2);
      this.ctx.rotate(object.rotation || 0);
      this.ctx.scale(object.scaleX || 1, object.scaleY || 1);
      this.ctx.fillStyle = object.static ? '#888' : '#fff';
      this.ctx.fillRect(-object.width / 2, -object.height / 2, object.width, object.height);
      this.ctx.restore();
    }
  }
}
