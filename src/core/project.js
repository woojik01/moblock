import { createGameObject } from './game-object.js';

export function createScene(name = 'Main Scene') {
  return {
    id: crypto.randomUUID(),
    name,
    objects: [],
    scripts: []
  };
}

export function createProject(name = 'Untitled Game') {
  const mainScene = createScene('Main Scene');
  mainScene.id = 'main';
  mainScene.objects.push(createGameObject('Player'));

  return {
    version: 2,
    name,
    settings: { width: 640, height: 360, fps: 60 },
    assets: [],
    variables: [],
    lists: [],
    messages: [],
    functions: [],
    scenes: [mainScene],
    get scene() {
      return this.scenes[0];
    }
  };
}
