export class Runtime {
  constructor(canvas, project) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.project = project;
    this.running = false;
    this.lastTime = 0;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame((time) => this.frame(time));
  }

  stop() {
    this.running = false;
  }

  frame(time) {
    if (!this.running) return;
    const dt = Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;
    this.update(dt);
    this.render();
    requestAnimationFrame((next) => this.frame(next));
  }

  update(_dt) {
    // Runtime execution will be connected to the block interpreter here.
  }

  render() {
    const { width, height } = this.project.settings;
    this.ctx.clearRect(0, 0, width, height);
  }
}
