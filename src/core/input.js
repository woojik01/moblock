export class InputSystem {
  constructor(target = window) {
    this.keys = new Set();
    this.pressed = new Set();
    this.released = new Set();

    target.addEventListener('keydown', (event) => {
      if (!this.keys.has(event.code)) this.pressed.add(event.code);
      this.keys.add(event.code);
    });
    target.addEventListener('keyup', (event) => {
      this.keys.delete(event.code);
      this.released.add(event.code);
    });
  }

  isDown(code) { return this.keys.has(code); }
  wasPressed(code) { return this.pressed.has(code); }
  wasReleased(code) { return this.released.has(code); }

  endFrame() {
    this.pressed.clear();
    this.released.clear();
  }
}
