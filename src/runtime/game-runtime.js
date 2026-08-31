import { Interpreter } from '../core/interpreter.js';
import { VariableStore } from '../core/variables.js';

export class GameRuntime {
  constructor(project, canvas) {
    this.project = project;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this.lastTime = 0;
    this.time = 0;
    this.started = false;
    this.interpreter = new Interpreter(project);
    this.variables = new VariableStore(project.variables ?? []);
    this.registerCoreBlocks();
  }

  registerCoreBlocks() {
    this.interpreter
      .register('motion_move', (ctx, block) => {
        if (ctx.object) ctx.object.x += Number(block.inputs?.amount ?? 10);
      })
      .register('motion_set_x', (ctx, block) => {
        if (ctx.object) ctx.object.x = Number(block.inputs?.value ?? 0);
      })
      .register('looks_say', (ctx, block) => {
        if (ctx.object) ctx.object.say = String(block.inputs?.text ?? '');
      })
      .register('variable_set', (ctx, block) => {
        this.variables.set(block.inputs?.name ?? 'variable', block.inputs?.value ?? 0);
      });
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    if (!this.started) {
      this.started = true;
      this.runStartEvents();
    }
    requestAnimationFrame((time) => this.frame(time));
  }

  stop() { this.running = false; }

  reset() {
    this.stop();
    this.time = 0;
    this.started = false;
    this.interpreter.clear();
    this.variables = new VariableStore(this.project.variables ?? []);
    this.render();
  }

  frame(time) {
    if (!this.running) return;
    const dt = Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;
    this.time += dt;
    this.update(dt);
    this.render();
    requestAnimationFrame((next) => this.frame(next));
  }

  runStartEvents() {
    const scene = this.project.scene;
    for (const object of scene.objects) {
      for (const script of object.scripts ?? []) {
        if (script?.type === 'event_start') this.interpreter.execute(script.next, this.context(object));
      }
    }
    for (const script of scene.scripts ?? []) {
      if (script?.type === 'event_start') this.interpreter.execute(script.next, this.context(null));
    }
  }

  context(object) {
    return { runtime: this, project: this.project, scene: this.project.scene, object, variables: this.variables };
  }

  update(dt) { this.interpreter.update(dt); }

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
      this.ctx.translate(object.x, object.y);
      this.ctx.rotate(object.rotation * Math.PI / 180);
      this.ctx.scale(object.scaleX, object.scaleY);
      this.ctx.fillStyle = '#fff';
      this.ctx.fillRect(-object.width / 2, -object.height / 2, object.width, object.height);
      this.ctx.restore();
    }
  }
}
