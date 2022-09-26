import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@/styles/Fonts.scss';
import '@/styles/Reset.scss';
import '@/styles/Global.scss';

createApp(App)
  .use(router)
  .mount('#app');
