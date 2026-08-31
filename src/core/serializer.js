export function serializeProject(project) {
  return JSON.stringify(project, null, 2);
}

export function deserializeProject(json) {
  const data = typeof json === 'string' ? JSON.parse(json) : json;
  if (!data || typeof data !== 'object') throw new Error('Invalid MoBlock project');
  return data;
}

export function downloadProject(project, filename = 'project.moblock') {
  const blob = new Blob([serializeProject(project)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
