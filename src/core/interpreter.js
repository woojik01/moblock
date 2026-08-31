import { walkBlocks } from './ast.js';

export class Interpreter {
  constructor(project) {
    this.project = project;
    this.handlers = new Map();
  }

  register(type, handler) {
    this.handlers.set(type, handler);
    return this;
  }

  run(script, context = {}) {
    walkBlocks(script, (block) => {
      const handler = this.handlers.get(block.type);
      if (handler) handler(context, block);
    });
  }
}
