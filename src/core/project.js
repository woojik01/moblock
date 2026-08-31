export function createProject(name = 'Untitled Game') {
  return {
    version: 1,
    name,
    settings: { width: 640, height: 360, fps: 60 },
    assets: [],
    variables: [],
    scenes: [
      {
        id: 'main',
        name: 'Main Scene',
        objects: [],
        scripts: []
      }
    ],
    get scene() {
      return this.scenes[0];
    }
  };
}
