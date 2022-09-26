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
import { computed, defineComponent, shallowRef, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import { useGlobalState } from '@/services/GlobalState';
import { fetchConfigJson } from '@/services/Http';

import ArticlePage from '@/components/article/ArticlePage.vue';
import ArticlesPage from '@/components/articles/ArticlesPage.vue';
import ComicsPage from '@/components/comics/ComicsPage.vue';
import DestinationsPage from '@/components/destinations/DestinationsPage.vue';

import type { PageConfig } from '@/types/PageConfig.types';

export default defineComponent({
  components: {
    /* eslint-disable vue/no-unused-components */
    ArticlePage,
    ArticlesPage,
    ComicsPage,
    DestinationsPage,
    /* eslint-enable vue/no-unused-components */
  },

  async setup() {
    const route = useRoute();
    const globalState = useGlobalState(route);

    const currentPageConfig = shallowRef<PageConfig>();

    const currentWebsitePageConfig = computed(() =>
      globalState.websiteConfig.value?.pages.find((page) => page.name === globalState.currentPageName.value));

    watchEffect(async () => {
      currentPageConfig.value =
        currentWebsitePageConfig.value
          ? await fetchConfigJson<PageConfig>(currentWebsitePageConfig.value.pageConfigPath)
          : undefined;
    });

    return {
      currentPageConfig,
    };
  },
});
</script>
