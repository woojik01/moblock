import './style.css';
import { createProject } from './core/project.js';
import { createBlock, appendBlock } from './core/block.js';
import { ProjectStore } from './core/store.js';
import { BlockRegistry } from './blocks/registry.js';
import { GameRuntime } from './runtime/game-runtime.js';

const app = document.querySelector('#app');
const project = createProject('My Game');
const store = new ProjectStore(project);
const registry = new BlockRegistry();

app.innerHTML = `
  <header class="topbar">
    <strong>MoBlock</strong>
    <span>Block → HTML Game</span>
    <button id="run">▶ 실행</button>
    <button id="reset">↻ 초기화</button>
  </header>
  <main class="editor">
    <aside class="sidebar"><h2>블록</h2><div id="palette"></div></aside>
    <section class="workspace">
      <div class="workspace-header">${project.name} / Main Scene</div>
      <div id="workspace" class="workspace-canvas"><div class="empty">블록을 이곳에 추가하세요.</div></div>
    </section>
    <section class="preview">
      <div class="preview-header">미리보기</div>
      <canvas id="game" width="640" height="360"></canvas>
    </section>
  </main>
`;

const palette = document.querySelector('#palette');
const workspace = document.querySelector('#workspace');
const runtime = new GameRuntime(project, document.querySelector('#game'));

function addBlock(definition) {
  workspace.querySelector('.empty')?.remove();
  const block = createBlock(definition.type, definition.fields ?? {}, definition.inputs ?? {});
  project.scene.scripts = appendBlock(project.scene.scripts, block);
  store.notify();
  const item = document.createElement('div');
  item.className = `block ${definition.category}`;
  item.textContent = definition.label;
  item.dataset.type = block.type;
  item.dataset.id = block.id;
  workspace.appendChild(item);
}

for (const definition of registry.all()) {
  const button = document.createElement('button');
  button.className = `block-button ${definition.category}`;
  button.textContent = definition.label;
  button.addEventListener('click', () => addBlock(definition));
  palette.appendChild(button);
}

document.querySelector('#run').addEventListener('click', () => runtime.running ? runtime.stop() : runtime.start());
document.querySelector('#reset').addEventListener('click', () => runtime.reset());
runtime.render();
