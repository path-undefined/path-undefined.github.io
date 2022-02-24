<template>
  <main
    v-if="pageConfig"
    class="page"
  >
    <component
      class="page__page"
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
import { multiLanguageContent } from '@/services/Language';
import { MultiLanguageContent } from '@/services/Language.types';
import { Nullable } from '@/services/Utility.types';

import { WebsiteConfig, WebsiteStatus } from '@/components/website/Website.types';

import { PageConfig } from './Page.types';
import Article from './Article.vue';
import ArticleList from './ArticleList.vue';

export default defineComponent({
  name: 'PageContent',

  components: {
    Article,
    ArticleList,
  },

  props: {
    websiteConfig: { type: Object as PropType<WebsiteConfig>, required: true },
    websiteStatus: { type: Object as PropType<WebsiteStatus>, required: true },
  },

  data() {
    return {
      pageConfig: null as Nullable<PageConfig>,
    };
  },

  watch: {
    websiteStatus() {
      this.reload();
    },
  },

  async created() {
    this.reload();
  },

  methods: {
    getMultiLanguageContent<T>(value: MultiLanguageContent<T>): T {
      return multiLanguageContent<T>(
        value,
        this.websiteStatus.currentLanguage,
        this.websiteConfig.languages.fallbackOrder,
      );
    },

    async reload() {
      const currentPage = this.websiteConfig.pages.find((page) => page.name === this.websiteStatus.currentPage);
      if (!currentPage) {
        return;
      }

      this.pageConfig = await httpService.getJson(currentPage.pageConfigPath);
    },
  },
});
</script>

<style lang="scss" scoped>
.page {
  &__page {
    margin-top: 80px;
  }
}
</style>
