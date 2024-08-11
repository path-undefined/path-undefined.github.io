import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import { MenuEntryType } from "@/types/MenuEntry";
import HomeView from "@/views/HomeView.vue";
import { promiseOfMenuEntries } from "./MenuEntries";

export async function buildRouter() {
  const menuEntries = await promiseOfMenuEntries;

  const routeEntries: RouteRecordRaw[] = [];

  const componentLookup = {
    [MenuEntryType.ARTICLE]: () => import("@/views/ArticleView.vue"),
    [MenuEntryType.CATEGORY]: () => import("@/views/CategoryView.vue"),
  };

  for (const menuEntry of menuEntries) {
    routeEntries.push({
      path: menuEntry.path,
      name: menuEntry.key,
      component: componentLookup[menuEntry.type],
      props: {
        contentPath: `${import.meta.env.BASE_URL}data/${menuEntry.key}/content.json`,
      },
    });

    if (menuEntry.type === MenuEntryType.CATEGORY) {
      routeEntries.push({
        path: `${menuEntry.path}/:articleKey`,
        component: () => import("@/views/ArticleView.vue"),
        props: (route) => ({
          contentPath: `${import.meta.env.BASE_URL}data/${menuEntry.key}/${route.params["articleKey"]}/content.json`,
        }),
      });
    }
  }

  const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      ...routeEntries,
    ],
  });

  return router;
}
