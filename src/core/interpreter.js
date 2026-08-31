export class Interpreter {
  constructor(project) {
    this.project = project;
    this.handlers = new Map();
    this.coroutines = new Set();
  }

  register(type, handler) {
    this.handlers.set(type, handler);
    return this;
  }

  execute(script, context = {}) {
    let block = script;
    let guard = 0;
    while (block && guard++ < 10000) {
      const handler = this.handlers.get(block.type);
      if (handler) {
        const result = handler(context, block, this);
        if (result && typeof result.then === 'function') {
          this.coroutines.add(result);
        }
      }
      block = block.next;
    }
  }

  run(script, context = {}) {
    return this.execute(script, context);
  }

  update() {
    for (const task of this.coroutines) {
      task.then(() => this.coroutines.delete(task), () => this.coroutines.delete(task));
    }
  }

  clear() {
    this.coroutines.clear();
  }
}
