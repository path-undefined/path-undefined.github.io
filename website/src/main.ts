import "./assets/main.css";

import { createApp } from "vue";

import App from "./App.vue";
import { buildRouter } from "./router";

(async () => {
  const app = createApp(App);

  app.use(await buildRouter());

  app.mount("#app");
})();
