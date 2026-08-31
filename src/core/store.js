export class ProjectStore {
  constructor(project) {
    this.project = project;
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) listener(this.project);
  }

  snapshot() {
    return structuredClone(this.project);
  }
}
