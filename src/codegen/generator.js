const INDENT = '  ';

export function generateJavaScript(project) {
  const lines = [
    'export function createGame(ctx) {',
    `${INDENT}const game = { objects: [] };`
  ];

  for (const scene of project.scenes) {
    for (const object of scene.objects) {
      lines.push(`${INDENT}game.objects.push(${JSON.stringify({ id: object.id, name: object.name, x: object.x, y: object.y })});`);
    }
  }

  lines.push(`${INDENT}return game;`, '}');
  return lines.join('\n');
}
