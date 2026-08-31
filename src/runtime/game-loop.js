export class GameLoop {
  constructor({ update, render, fps = 60 }) {
    this.update = update;
    this.render = render;
    this.step = 1 / fps;
    this.running = false;
    this.last = 0;
    this.accumulator = 0;
    this.frame = 0;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    requestAnimationFrame((t) => this.tick(t));
  }

  stop() { this.running = false; }

  tick(now) {
    if (!this.running) return;
    const elapsed = Math.min((now - this.last) / 1000, 0.25);
    this.last = now;
    this.accumulator += elapsed;
    while (this.accumulator >= this.step) {
      this.update(this.step);
      this.accumulator -= this.step;
      this.frame++;
    }
    this.render(this.accumulator / this.step);
    requestAnimationFrame((t) => this.tick(t));
  }
}
