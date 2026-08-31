import { VariableStore } from './variables.js';

export class RuntimeContext {
  constructor(project, runtime) {
    this.project = project;
    this.runtime = runtime;
    this.variables = new VariableStore(project.variables ?? []);
    this.self = null;
    this.dt = 0;
  }

  withObject(object) {
    this.self = object;
    return this;
  }
}
