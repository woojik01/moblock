import { Interpreter } from './interpreter.js';
import { EventRuntime } from './event-runtime.js';
import { InputSystem } from './input.js';
import { VariableStore } from './variables.js';
import { PhysicsWorld } from '../runtime/physics.js';

export class Engine {
  constructor(project, canvas) {
    this.project = project;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.interpreter = new Interpreter(project);
    this.events = new EventRuntime(this.interpreter);
    this.input = new InputSystem(canvas.ownerDocument?.defaultView ?? window);
    this.variables = new VariableStore(project.variables);
    this.physics = new PhysicsWorld();
    this.running = false;
    this.lastTime = 0;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.events.emit('start', { engine: this });
    requestAnimationFrame((time) => this.tick(time));
  }

  stop() {
    this.running = false;
    this.interpreter.clear();
    this.events.emit('stop', { engine: this });
  }

  tick(time) {
    if (!this.running) return;
    const dt = Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;
    this.update(dt);
    this.render();
    this.input.endFrame();
    requestAnimationFrame((next) => this.tick(next));
  }

  update(dt) {
    const scene = this.project.scene;
    this.physics.update(dt, this.project.settings);
    this.interpreter.update();
    this.events.emit('update', { engine: this, scene, dt });
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
      this.ctx.fillStyle = object.color ?? '#fff';
      this.ctx.fillRect(object.x, object.y, object.width, object.height);
    }
  }
}
