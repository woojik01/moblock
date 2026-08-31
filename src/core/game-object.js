export function createGameObject(name = 'Object') {
  return {
    id: crypto.randomUUID(),
    name,
    visible: true,
    x: 0,
    y: 0,
    width: 48,
    height: 48,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    assetId: null,
    scripts: []
  };
}
