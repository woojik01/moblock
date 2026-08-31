export const BLOCK_DEFINITIONS = [
  { type: 'event_start', label: '게임 시작', category: 'event', shape: 'hat' },
  { type: 'event_key', label: '키를 눌렀을 때', category: 'event', shape: 'hat', fields: { key: 'ArrowRight' } },
  { type: 'motion_move', label: '10만큼 이동하기', category: 'motion', shape: 'stack', inputs: { amount: 10 } },
  { type: 'motion_set_x', label: 'x를 0으로 정하기', category: 'motion', shape: 'stack', inputs: { value: 0 } },
  { type: 'control_repeat', label: '계속 반복하기', category: 'control', shape: 'loop' },
  { type: 'control_if', label: '만약 ~라면', category: 'control', shape: 'conditional' },
  { type: 'looks_say', label: '말하기', category: 'looks', shape: 'stack', inputs: { text: '안녕!' } },
  { type: 'variable_set', label: '변수를 정하기', category: 'variable', shape: 'stack', inputs: { name: 'score', value: 0 } }
];
