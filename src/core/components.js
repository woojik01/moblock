export function createBody({ x = 0, y = 0, width = 32, height = 32, dynamic = true } = {}) {
  return { x, y, width, height, vx: 0, vy: 0, gravity: 980, grounded: false, dynamic };
}

export function createCollider({ x = 0, y = 0, width = 32, height = 32, solid = true } = {}) {
  return { x, y, width, height, solid };
}
