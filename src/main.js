import './style.css';
import { createProject } from './core/project.js';
import { BLOCK_DEFINITIONS } from './blocks/definitions.js';

const app = document.querySelector('#app');
const project = createProject('My Game');

app.innerHTML = `
  <header class="topbar">
    <strong>MoBlock</strong>
    <span>Block → HTML Game</span>
    <button id="run">▶ 실행</button>
  </header>
  <main class="editor">
    <aside class="sidebar">
      <h2>블록</h2>
      <div id="palette"></div>
    </aside>
    <section class="workspace">
      <div class="workspace-header">${project.name} / Main Scene</div>
      <div id="workspace" class="workspace-canvas">
        <div class="empty">블록을 이곳에 추가하세요.</div>
      </div>
    </section>
    <section class="preview">
      <div class="preview-header">미리보기</div>
      <canvas id="game" width="640" height="360"></canvas>
    </section>
  </main>
`;

const palette = document.querySelector('#palette');
const workspace = document.querySelector('#workspace');

for (const block of BLOCK_DEFINITIONS) {
  const button = document.createElement('button');
  button.className = `block-button ${block.category}`;
  button.textContent = block.label;
  button.addEventListener('click', () => {
    workspace.querySelector('.empty')?.remove();
    const item = document.createElement('div');
    item.className = `block ${block.category}`;
    item.textContent = block.label;
    item.dataset.type = block.type;
    workspace.appendChild(item);
    project.scene.scripts.push({ type: block.type });
  });
  palette.appendChild(button);
}

document.querySelector('#run').addEventListener('click', () => {
  const ctx = document.querySelector('#game').getContext('2d');
  ctx.clearRect(0, 0, 640, 360);
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, 640, 360);
  ctx.fillStyle = '#fff';
  ctx.font = '20px sans-serif';
  ctx.fillText(`${project.name} 실행 중`, 20, 35);
  ctx.font = '14px monospace';
  ctx.fillText(`${project.scene.scripts.length} blocks`, 20, 60);
});
