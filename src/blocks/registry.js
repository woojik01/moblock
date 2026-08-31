import { BLOCK_DEFINITIONS } from './definitions.js';

export class BlockRegistry {
  constructor(definitions = BLOCK_DEFINITIONS) {
    this.blocks = new Map(definitions.map(block => [block.type, block]));
  }

  get(type) {
    return this.blocks.get(type);
  }

  all() {
    return [...this.blocks.values()];
  }

  byCategory(category) {
    return this.all().filter(block => block.category === category);
  }
}
