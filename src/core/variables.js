export class VariableStore {
  constructor(initial = []) {
    this.values = new Map(initial.map((item) => [item.name, item.value]));
  }

  get(name, fallback = 0) { return this.values.has(name) ? this.values.get(name) : fallback; }
  set(name, value) { this.values.set(name, value); return value; }
  change(name, amount) { return this.set(name, Number(this.get(name, 0)) + Number(amount)); }
  has(name) { return this.values.has(name); }
  toJSON() { return [...this.values].map(([name, value]) => ({ name, value })); }
}
