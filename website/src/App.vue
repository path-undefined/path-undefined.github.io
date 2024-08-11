<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { RouterView, RouterLink } from "vue-router";

import type { MenuEntry } from "./types/MenuEntry";
import { promiseOfMenuEntries } from "./router/MenuEntries";

const menuEntries = ref<MenuEntry[]>([]);

onBeforeMount(async () => {
  menuEntries.value = await promiseOfMenuEntries;
  menuEntries.value.unshift({
    key: "home",
    path: "/",
    label: "Home",
  } as MenuEntry);
});
</script>

<template>
  <div class="page">
    <header class="header">
      <div class="site-title fs-headline-1">
        Path<br>
        Undefined
      </div>
      <nav class="nav-menu m-h-std">
        <ul class="nav-list">
          <li
            v-for="menuEntry of menuEntries"
            :key="menuEntry.key"
            class="nav-item"
          >
            <router-link :to="{ name: menuEntry.key }">
              {{ menuEntry.label }}
            </router-link>
          </li>
        </ul>
      </nav>
    </header>

    <hr class="splitter m-h-lg">

    <main class="content m-h-xlg">
      <RouterView />
    </main>

    <hr class="splitter m-h-lg">

    <footer class="footer">
      <p class="copyright fs-content-sm">
        Except where otherwise noted, the content in this website is licensed under
        <a
          href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
          target="_blank"
          rel="license noopener noreferrer"
          style="display:inline-block;"
        >CC BY 4.0</a>.
      </p>
    </footer>
  </div>
</template>

<style scoped>
.page {
  margin: 0 auto;
  padding: 1em;
  max-width: 750px;
}

.site-title {
  font-family: "Fredericka the Great", serif;
}

.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
}

.nav-item:not(:last-child):after {
  display: inline-block;
  margin: 0 1em;
  content: "|";
}

.footer {
  text-align: right;
}
</style>
