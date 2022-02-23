<template>
  <main class="page-content">
    <component
      v-if="pageConfig['@type']"
      class="page-content__page"
      :is="pageConfig['@type']"
      :pageConfig="pageConfig"
      :websiteConfig="websiteConfig"
      :websiteStatus="websiteStatus"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { httpService } from '@/services/HttpService';
import { multiLanguageContent } from '@/services/MultiLanguageContent';

import { MultiLanguageContent } from '@/types/Language';
import { WebsiteConfig } from '@/types/WebsiteConfig';
import { WebsiteStatus } from '@/types/WebsiteStatus';
import { PageConfig } from '@/types/PageConfig';

import Article from '@/components/page/Article.vue';
import ArticleList from '@/components/page/ArticleList.vue';

export default defineComponent({
  name: 'PageContent',

  components: {
    /* eslint-disable vue/no-unused-components */
    Article,
    ArticleList,
    /* eslint-enable vue/no-unused-components */
  },

  props: {
    websiteConfig: { type: Object as PropType<WebsiteConfig>, required: true },
    websiteStatus: { type: Object as PropType<WebsiteStatus>, required: true },
  },

  data() {
    return {
      pageConfig: {
        '@type': 'article-list',
        'attributes': {
          articlesPerPage: 0,
          articleListConfigPaths: [],
        },
      } as PageConfig,
    };
  },

  watch: {
    websiteStatus() {
      this.updatePageConfig();
    },
  },

  async created() {
    this.updatePageConfig();
  },

  methods: {
    getMultiLanguageContent<T>(value: MultiLanguageContent<T>): T {
      return multiLanguageContent<T>(
        value,
        this.websiteStatus.currentLanguage,
        this.websiteConfig.languages.fallbackOrder,
      );
    },

    async updatePageConfig() {
      const currentPage = this.websiteConfig.pages.find((page) => page.name === this.websiteStatus.currentPage);
      if (!currentPage) {
        return;
      }

      console.log(JSON.stringify(currentPage));

      this.pageConfig = await httpService.getJson(currentPage.pageConfigPath);
    },
  },
});
</script>

<style lang="scss" scoped>
.page-content {
  &__page {
    margin-top: 100px;
  }
}
</style>
