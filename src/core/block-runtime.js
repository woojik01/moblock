export class BlockRuntime {
  constructor(interpreter, project) {
    this.interpreter = interpreter;
    this.project = project;
    this.running = new Set();
  }

  start(object, script, context = {}) {
    const task = { object, script, context };
    this.running.add(task);
    this.interpreter.execute(script, { project: this.project, object, runtime: this, ...context });
    this.running.delete(task);
  }

  stopAll() {
    this.running.clear();
    this.interpreter.clear();
  }
}
