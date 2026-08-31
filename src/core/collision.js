export function intersects(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

export function pointInRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
}

export function resolveStatic(body, collider) {
  const dx = body.x + body.width / 2 - (collider.x + collider.width / 2);
  const dy = body.y + body.height / 2 - (collider.y + collider.height / 2);
  const px = body.width / 2 + collider.width / 2 - Math.abs(dx);
  const py = body.height / 2 + collider.height / 2 - Math.abs(dy);
  if (px <= 0 || py <= 0) return false;

  if (px < py) {
    body.x += dx < 0 ? -px : px;
    body.vx = 0;
  } else {
    body.y += dy < 0 ? -py : py;
    body.grounded = dy < 0;
    body.vy = 0;
  }
  return true;
}
