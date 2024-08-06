const questionsMap: QuestionsMap = {
  ux: {
    easy: () => import('./ux-ui-design/ux-easy.json'),
    mid: () => import('./ux-ui-design/ux-mid.json'),
    hard: () => import('./ux-ui-design/ux-hard.json'),
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

interface QuestionsMap {
  ux: {};
  backend: {};
  frontend: {};
}

export default questionsMap;
