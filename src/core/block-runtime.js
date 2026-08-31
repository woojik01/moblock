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

  runObject(object, context = {}) {
    for (const script of object.scripts ?? []) this.start(object, script, context);
  }

  runScene(scene, context = {}) {
    for (const script of scene.scripts ?? []) this.interpreter.execute(script, { project: this.project, scene, runtime: this, ...context });
    for (const object of scene.objects ?? []) this.runObject(object, context);
  }

  stopAll() {
    this.running.clear();
    this.interpreter.clear();
  }
}
