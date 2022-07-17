<template>
  <div
    v-if="articleListConfigs.length !== 0"
    class="article-list"
  >
    <h1 class="article-list__title u-page-title">
      {{ getMultiLanguageContent(pageConfig.i18n.pageTitle) }}
    </h1>

    <div class="article-list__list">
      <router-link
        v-for="article in allArticles"
        :key="article.articleConfigPath"
        class="article-list__item"
        :to="{
          path: `/${websiteStatus.currentLanguage}/article`,
          query: { articleConfigPath: article.articleConfigPath },
        }"
      >
        <div class="article-list__item-date">
          {{ article.date }}
        </div>

        <div class="article-list__item-title">
          {{ getMultiLanguageContent(article.title) }}
        </div>

        <img
          v-if="article.thumbnailImageUrl"
          class="article-list__item-thumbnail-image"
          :src="article.thumbnailImageUrl"
          :alt="`Thumbnail of ${article.title}`"
        />

        <p
          class="article-list__item-excerpt"
          v-html="parseMarkdown(getMultiLanguageContent(article.excerpt))"
        />

        <div
          class="article-list__item-link u-fancy-link u-fancy-link--current"
        >
          {{ getMultiLanguageContent(pageConfig.i18n.articleLinkLabel) }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { marked } from 'marked';
import { defineComponent, PropType } from 'vue';

import { httpService } from '@/services/HttpService';
import { multiLanguageContent } from '@/services/Language';
import { MultiLanguageContent } from '@/services/Language.types';

import { WebsiteConfig, WebsiteStatus } from '@/components/website/Website.types';

import { ArticleListConfig, ArticleListPageConfig } from './ArticleList.types';

export default defineComponent({
  name: 'ArticleList',

  props: {
    pageConfig: { type: Object as PropType<ArticleListPageConfig>, required: true },
    websiteConfig: { type: Object as PropType<WebsiteConfig>, required: true },
    websiteStatus: { type: Object as PropType<WebsiteStatus>, required: true },
  },

  data() {
    return {
      articleListConfigs: [] as ArticleListConfig[],
    };
  },

  computed: {
    allArticles() {
      return this.articleListConfigs.flatMap((config) => config.articles);
    },
  },

  watch: {
    pageConfig() {
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

    parseMarkdown(source: string): string {
      return marked.parseInline(source);
    },

    async reload() {
      const promises = this.pageConfig.articleListConfigPaths
        .map((path) => httpService.getJson<ArticleListConfig>(path));
      this.articleListConfigs = await Promise.all(promises);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "~@/styles/variables";

.article-list {
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;

    color: inherit;
    font-family: inherit;
    font-weight: inherit;
    text-decoration: inherit;
  }

  &__item-date {
    font-size: 14px;
  }

  &__item-title {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
  }

  &__item-thumbnail-image {
    display: block;
    width: 100%;
  }

  &__item-excerpt {
    font-size: 18px;
  }

  &__item-link {
    font-size: 20px;
    text-transform: uppercase;
  }
}
</style>
