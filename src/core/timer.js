export class TimerSystem {
  constructor() { this.timers = new Map(); }

  set(id, seconds, callback) {
    this.timers.set(id, { remaining: Math.max(0, seconds), callback });
  }

  cancel(id) { this.timers.delete(id); }

  update(dt) {
    for (const [id, timer] of this.timers) {
      timer.remaining -= dt;
      if (timer.remaining <= 0) {
        this.timers.delete(id);
        timer.callback();
      }
    }
  }
}
