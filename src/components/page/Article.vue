<template>
  <article
    v-if="articleConfig"
    class="article"
  >
    <h1 class="article__title u-page-title">
      {{ getMultiLanguageContent(articleConfig.title) }}
    </h1>

    <div class="article__metadata">
      {{ articleConfig.time.date }} {{ articleConfig.time.time }} ({{ articleConfig.time.timeZone }})

      &bull;

      {{ getMultiLanguageContent(articleConfig.location.name) }}
      <a
        v-if="articleConfig.location.coord"
        :href="`https://maps.google.com?q=${articleConfig.location.coord.lat},${articleConfig.location.coord.long}`"
      >
        {{ getMultiLanguageContent(pageConfig.i18n.mapLinkLabel) }}
      </a>
    </div>

    <blocks
      class="article__blocks"
      :blockConfigs="articleConfig.blockConfigs"
      :websiteConfig="websiteConfig"
      :websiteStatus="websiteStatus"
    />
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { httpService } from '@/services/HttpService';
import { multiLanguageContent } from '@/services/Language';
import { MultiLanguageContent } from '@/services/Language.types';
import { Nullable } from '@/services/Utility.types';

import { WebsiteConfig, WebsiteStatus } from '@/components/website/Website.types';
import Blocks from '@/components/block/Blocks.vue';

import { ArticleConfig, ArticlePageConfig } from './Article.types';

export default defineComponent({
  name: 'Article',

  components: {
    Blocks,
  },

  props: {
    pageConfig: { type: Object as PropType<ArticlePageConfig>, required: true },
    websiteConfig: { type: Object as PropType<WebsiteConfig>, required: true },
    websiteStatus: { type: Object as PropType<WebsiteStatus>, required: true },
  },

  data() {
    return {
      articleConfig: null as Nullable<ArticleConfig>,
    };
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
      const articleConfigPath =
        this.pageConfig.articleConfigPath ?? (this.$route.query.articleConfigPath as string);
      this.articleConfig = await httpService.getJson(articleConfigPath);
    },
  },
});
</script>

<style lang="scss" scoped>
.article {
  &__metadata {
    margin-top: -12px;
    font-size: 14px;
    text-align: center;
  }

  &__blocks {
    margin-top: 80px;
  }
}
</style>
