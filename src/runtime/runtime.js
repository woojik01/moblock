export class Runtime {
  constructor(project, canvas) {
    this.project = project;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this.lastTime = 0;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.tick.bind(this));
  }

  stop() {
    this.running = false;
  }

  tick(time) {
    if (!this.running) return;
    const dt = Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;
    this.update(dt);
    this.render();
    requestAnimationFrame(this.tick.bind(this));
  }

  update(_dt) {
    // Block execution will be connected here.
  }

  render() {
    const { width, height } = this.project.settings;
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.fillStyle = '#111';
    this.ctx.fillRect(0, 0, width, height);

    const scene = this.project.scene;
    for (const object of scene.objects) {
      if (!object.visible) continue;
      this.ctx.fillStyle = '#fff';
      this.ctx.fillRect(object.x, object.y, object.width, object.height);
    }
  }
}
