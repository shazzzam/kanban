const tasks1: TTask[] = [
  {
    key: '1',
    title: 'Read the book',
    content: 'Dive into Python is great book',
  },
  { key: '2', title: 'Call to parents', content: 'Ask about health and mood' },
  { key: '3', title: 'Backe Cacke', content: 'Would be greet on weekend' },
];

const tasks2: TTask[] = [
  { key: '4', title: 'Make testwork', content: 'Create DnD Kanban Board' },
];

export const columnsFromBackend: TColumnList = {
  '1': {
    title: 'To do',
    items: [...tasks1],
  },
  '2': {
    title: 'In Progress',
    items: [...tasks2],
  },
};
