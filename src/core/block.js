export function createBlock(type, fields = {}, inputs = {}, next = null) {
  return {
    id: crypto.randomUUID(),
    type,
    fields,
    inputs,
    next
  };
}

export function cloneBlock(block) {
  return structuredClone(block);
}
