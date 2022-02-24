import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Website from '@/components/website/Website.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:languageCode?/:pageName?',
    component: Website,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
