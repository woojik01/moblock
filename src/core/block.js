export function createBlock(type, fields = {}, inputs = {}, next = null) {
  return {
    id: crypto.randomUUID(),
    type,
    fields,
    inputs,
    next
  };
}

export function appendBlock(head, block) {
  if (!head) return block;
  let current = head;
  while (current.next) current = current.next;
  current.next = block;
  return head;
}

export function cloneBlock(block) {
  return structuredClone(block);
}
