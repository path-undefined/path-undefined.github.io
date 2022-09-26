<template>
  <main class="site-content">
    <component
      :is="currentPageConfig?.type"
      :key="currentPageConfig"
      :pageConfig="currentPageConfig"
    ></component>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useGlobalState } from '@/services/GlobalState';
import { fetchConfigJson } from '@/services/Http';

import ListPage from '@/components/list/ListPage.vue';
import ArticlePage from '@/components/article/ArticlePage.vue';
import ComicReaderPage from '@/components/comic-reader/ComicReaderPage.vue';
import DestinationsPage from '@/components/destinations/DestinationsPage.vue';

import type { PageConfig } from '@/types/PageConfig.types';

export default defineComponent({
  components: {
    ListPage,
    ArticlePage,
    ComicReaderPage,
    DestinationsPage,
  },

  async setup() {
    const route = useRoute();
    const globalState = useGlobalState(route);

    const currentPageConfig = shallowRef<PageConfig>();

    const currentWebsitePageConfig = computed(() =>
      globalState.websiteConfig.value?.pages.find((page) => page.name === globalState.currentPageName.value));

    watch(currentWebsitePageConfig, async (config) => {
      currentPageConfig.value = config ? await fetchConfigJson<PageConfig>(config.pageConfigPath) : undefined;
      window.scrollTo(0, 0);
    });

    return {
      currentPageConfig,
    };
  },
});
</script>
