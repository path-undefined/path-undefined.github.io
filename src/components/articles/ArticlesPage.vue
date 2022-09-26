<template>
  <div class="articles-page">
    <PageTitle class="articles-page__title">
      {{ i18n(pageConfig.i18n.pageTitle) }}
    </PageTitle>

    <div class="articles-page__list">
      <router-link
        class="articles-page__item"
        v-for="article in articles"
        :key="article.articleConfigPath"
        :to="{
          path: `/${currentLanguageCode}/article`,
          query: { articleConfigPath: article.articleConfigPath }
        }"
      >
        <div class="articles-page__item-date">
          {{ article.date }}
        </div>

        <div class="articles-page__item-title">
          {{ i18n(article.title) }}
        </div>

        <div class="articles-page__item-thumbnail-container">
          <img
            class="articles-page__item-thumbnail-image"
            v-if="article.thumbnailImageUrl"
            :src="baseUrl + article.thumbnailImageUrl"
            :alt="`Thumbnail of ${article.title}`"
          />
        </div>

        <p
          class="articles-page__item-excerpt"
          v-html="parseMarkdown(i18n(article.excerpt))"
        ></p>

        <div class="articles-page__item-read-more">
          {{ i18n(pageConfig.i18n.readMoreLabel) }}
        </div>
      </router-link>

      <button
        class="articles-page__load-more"
        v-if="hasMoreArticles"
        @click="loadMore"
      >
        {{ i18n(pageConfig.i18n.loadMoreLabel) }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, shallowReactive } from 'vue';
import { useRoute } from 'vue-router';

import { useI18n } from '@/services/I18n';
import { useGlobalState } from '@/services/GlobalState';
import { fetchConfigJson } from '@/services/Http';
import { useMarkdown } from '@/services/Markdown';

import PageTitle from '@/components/common/PageTitle.vue';

import type { PropType } from 'vue';
import type { ArticlesPageConfig } from '@/types/PageConfig.types';
import type { ArticlesArticleConfig, ArticlesConfig } from '@/types/ArticlesConfig.type';

export default defineComponent({
  components: {
    PageTitle,
  },

  props: {
    pageConfig: {
      type: Object as PropType<ArticlesPageConfig>,
      required: true,
    },
  },

  async setup(props) {
    const route = useRoute();
    const globalState = useGlobalState(route);
    const i18n = useI18n(globalState);
    const parseMarkdown = useMarkdown();

    const articles = shallowReactive<ArticlesArticleConfig[]>([]);
    const hasMoreArticles = ref<boolean>(true);

    const baseUrl = import.meta.env.VITE_BLOG_CONTENT_BASE_URL;

    let cachedArticles: ArticlesArticleConfig[] = [];
    // eslint-disable-next-line vue/no-setup-props-destructure
    let nextArticleConfigPath: string | undefined = props.pageConfig.articlesConfigPath;

    const loadMore = async () => {
      const targetArticleAmount = articles.length + props.pageConfig.articlesPerPage;

      while (articles.length < targetArticleAmount) {
        if (cachedArticles.length === 0) {
          if (nextArticleConfigPath) {
            const articlesConfig = await fetchConfigJson<ArticlesConfig>(nextArticleConfigPath);
            cachedArticles = cachedArticles.concat(articlesConfig.articles);
            nextArticleConfigPath = articlesConfig.nextArticlesConfigPath;
          } else {
            hasMoreArticles.value = false;
            break;
          }
        }

        if (cachedArticles.length === 0 && !nextArticleConfigPath) {
          hasMoreArticles.value = false;
          break;
        }

        articles.push(cachedArticles.shift()!);
      }
    };

    loadMore();

    return {
      i18n,
      parseMarkdown,

      currentLanguageCode: globalState.currentLanguageCode,

      articles,
      hasMoreArticles,
      loadMore,

      baseUrl,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/Tokens.scss';
@import '@/components/common/EmphasizedText.scss';

.articles-page {
  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: spacing(10);

    color: $color-primary;
    text-decoration: none;

    &-date {
      @include typography-size-xs;
    }

    &-title {
      @include typography-heading;
      @include typography-size-xl;
      text-align: center;
    }

    &-thumbnail-container {
      position: relative;
      margin-top: spacing(3);
      width: 100%;

      &::after {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
    }

    &-thumbnail-image {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &-excerpt {
      margin-top: spacing(3);
    }

    &-read-more {
      @include typography-heading;
      @include typography-size-s;

      @include emphasized-text--default;

      margin-top: spacing(2);
      padding: 0;

      transition: $transition-time;
    }

    &:hover &-read-more,
    &:active &-read-more {
      @include emphasized-text--strong;

      padding: 0 spacing(2);
    }
  }

  &__load-more {
    @include typography-heading;
    @include typography-size-m;

    @include emphasized-text--strong;

    margin-top: spacing(8);
    padding: 0 spacing(1);
    cursor: pointer;

    transition: $transition-time;

    &:hover {
      padding: 0 spacing(2);
    }

    &:active {
      padding: 0 spacing(3);
    }
  }
}
</style>