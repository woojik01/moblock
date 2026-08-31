# MoBlock Architecture

MoBlock is a browser-based block programming environment for creating HTML games.

## Layers

```text
Editor
  ↓
Project / Block Data
  ↓
Interpreter ──→ Canvas Runtime
  ↓
HTML Exporter ──→ standalone HTML game
```

## Core data

- Project: settings, assets, variables, lists, messages, functions, scenes
- Scene: objects and scripts
- GameObject: transform, visibility, asset reference, scripts
- Block: id, type, fields, inputs, next

## Modules

- `src/core`: project and data model
- `src/blocks`: block definitions and registry
- `src/runtime`: live Canvas game runtime
- `src/export`: JavaScript and standalone HTML generation
- `src/main.js`: current editor shell

## Development order

1. Block workspace and connections
2. Input editing for block fields
3. Interpreter/event scheduler
4. Object movement, collision, input and rendering
5. Save/load project JSON
6. Standalone HTML/ZIP export
7. Asset manager and scene editor
