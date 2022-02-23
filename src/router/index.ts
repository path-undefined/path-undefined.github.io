import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Site from '@/components/Site.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:languageCode?/:pageName?',
    component: Site,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
