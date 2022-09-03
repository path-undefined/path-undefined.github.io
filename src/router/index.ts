import { createRouter, createWebHashHistory } from 'vue-router';
import MainView from '../views/SiteView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/:languageCode?/:pageName?',
      name: 'main',
      component: MainView,
    },
  ],
});

export default router;
