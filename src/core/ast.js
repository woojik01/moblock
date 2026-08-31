export function createBlock(type, fields = {}, inputs = {}, next = null) {
  return {
    id: crypto.randomUUID(),
    type,
    fields,
    inputs,
    next
  };
}

export function appendBlock(script, block) {
  if (!script) return block;
  let current = script;
  while (current.next) current = current.next;
  current.next = block;
  return script;
}

export function walkBlocks(script, visitor) {
  let current = script;
  while (current) {
    visitor(current);
    current = current.next;
  }
}
