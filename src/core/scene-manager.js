export class SceneManager {
  constructor(project) {
    this.project = project;
    this.current = project.scenes[0] ?? null;
  }

  load(sceneId) {
    const scene = this.project.scenes.find((item) => item.id === sceneId);
    if (!scene) throw new Error(`Scene not found: ${sceneId}`);
    this.current = scene;
    return scene;
  }

  add(scene) {
    this.project.scenes.push(scene);
    return scene;
  }
}
