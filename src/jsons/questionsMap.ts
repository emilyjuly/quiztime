const questionsMap = {
  'ux/ui design': {
    easy: () => import('./ux-ui-design/ux-ui-design-easy.json'),
    mid: () => import('./ux-ui-design/ux-ui-design-mid.json'),
    hard: () => import('./ux-ui-design/ux-ui-design-hard.json'),
  },
  backend: {
    easy: () => import('./backend/backend-easy.json'),
    mid: () => import('./backend/backend-mid.json'),
    hard: () => import('./backend/backend-hard.json'),
  },
  frontend: {
    easy: () => import('./frontend/frontend-easy.json'),
    mid: () => import('./frontend/frontend-mid.json'),
    hard: () => import('./frontend/frontend-hard.json'),
  },
};

export default questionsMap;
