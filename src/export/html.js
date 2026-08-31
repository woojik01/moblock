import { generateJavaScript } from './generator.js';

export function generateHTML(project) {
  const gameScript = generateJavaScript(project);
  const { width, height } = project.settings;

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHTML(project.name)}</title>
  <style>html,body{margin:0;background:#111;color:#fff}canvas{display:block;margin:auto;max-width:100%;image-rendering:auto}</style>
</head>
<body>
  <canvas id="game" width="${width}" height="${height}"></canvas>
  <script type="module">
${gameScript}
createGame(document.querySelector('#game'));
  </script>
</body>
</html>`;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
