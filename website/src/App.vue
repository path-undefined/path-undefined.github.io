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
      Path<br>
      Undefined
    </header>

    <nav class="navigation">
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

    <hr class="splitter">

    <main class="content">
      <RouterView />
    </main>

    <hr class="splitter">

    <footer class="footer">
      <p class="copyright">
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
  padding: var(--padding-l) var(--padding-m);
  max-width: 750px;
}

.header {
  font-family: var(--ff-display);
  font-weight: var(--fw-bold);
  font-size: 16vw;
  line-height: var(--lh-headline);
}
@media (min-width:500px) {
  .header {
    font-size: 80px;
  }
}

.navigation {
  margin: var(--margin-xl) var(--margin-0);
  font-size: var(--fs-content-l);
  font-weight: var(--fw-bold);
}

.nav-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: var(--padding-0);
}

.nav-item {
  white-space: nowrap;
}
.nav-item:not(:last-child):after {
  display: inline-block;
  margin: 0 var(--margin-m);
  font-weight: var(--fw-normal);
  content: "|";
}

.splitter {
  height: var(--hr-height-thick);
}

.footer {
  font-size: var(--fs-content-s);
  text-align: right;
}
</style>
