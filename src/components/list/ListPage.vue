<template>
  <div class="list-page">
    <PageTitle class="list-page__title">
      {{ i18n(pageConfig.i18n.pageTitle) }}
    </PageTitle>

    <div class="list-page__list">
      <router-link
        class="list-page__item"
        v-for="item in items"
        :key="item.itemConfigPath"
        :to="{
          path: `/${currentLanguageCode}/${item.itemPageName}`,
          query: { articleConfigPath: item.itemConfigPath }
        }"
      >
        <div class="list-page__item-date">
          {{ item.date }}
        </div>

        <div class="list-page__item-title">
          {{ i18n(item.title) }}
        </div>

        <div class="list-page__item-thumbnail-container">
          <img
            class="list-page__item-thumbnail-image"
            v-if="item.thumbnailImageUrl"
            :src="baseUrl + item.thumbnailImageUrl"
            :alt="`Thumbnail of ${item.title}`"
          />
        </div>

        <p
          class="list-page__item-excerpt"
          v-html="parseMarkdown(i18n(item.excerpt))"
        ></p>

        <div class="list-page__item-read-more">
          {{ i18n(pageConfig.i18n.readMoreLabel) }}
        </div>
      </router-link>

      <button
        class="list-page__load-more"
        v-if="hasMoreItems"
        @click="loadMore"
      >
        {{ i18n(pageConfig.i18n.loadMoreLabel) }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, shallowRef } from 'vue';
import { useRoute } from 'vue-router';

import { useI18n } from '@/services/I18n';
import { useGlobalState } from '@/services/GlobalState';
import { fetchConfigJson } from '@/services/Http';
import { useMarkdown } from '@/services/Markdown';

import PageTitle from '@/components/common/PageTitle.vue';

import type { PropType } from 'vue';
import type { ListPageConfig } from '@/types/PageConfig.types';
import type { ListConfig, ListItemConfig } from '@/types/ListConfig.types';

export default defineComponent({
  components: {
    PageTitle,
  },

  props: {
    pageConfig: {
      type: Object as PropType<ListPageConfig>,
      required: true,
    },
  },

  async setup(props) {
    const route = useRoute();
    const globalState = useGlobalState(route);
    const i18n = useI18n(globalState);
    const parseMarkdown = useMarkdown();

    const baseUrl = import.meta.env.VITE_BLOG_CONTENT_BASE_URL;

    const items = shallowRef<ListItemConfig[]>([]);
    const hasMoreItems = ref<boolean>(true);

    let cachedArticles: ListItemConfig[] = [];
    // eslint-disable-next-line vue/no-setup-props-destructure
    let nextArticleConfigPath: string | undefined = props.pageConfig.listConfigPath;

    onMounted(() => {
      items.value = [];
      hasMoreItems.value = true;
      cachedArticles = [];
      nextArticleConfigPath = props.pageConfig.listConfigPath;

      loadMore();
    });

    const loadMore = async () => {
      const targetArticleAmount = items.value.length + props.pageConfig.itemsPerPage;

      while (items.value.length < targetArticleAmount) {
        if (cachedArticles.length === 0) {
          if (nextArticleConfigPath) {
            const articlesConfig = await fetchConfigJson<ListConfig>(nextArticleConfigPath);
            cachedArticles = cachedArticles.concat(articlesConfig.items);
            nextArticleConfigPath = articlesConfig.nextArticlesConfigPath;
          } else {
            hasMoreItems.value = false;
            break;
          }
        }

        if (cachedArticles.length === 0 && !nextArticleConfigPath) {
          hasMoreItems.value = false;
          break;
        }

        items.value.push(cachedArticles.shift()!);
      }
    };

    return {
      i18n,
      parseMarkdown,

      currentLanguageCode: globalState.currentLanguageCode,

      baseUrl,

      items,
      hasMoreItems,
      loadMore,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/Tokens.scss';
@import '@/components/common/EmphasizedText.scss';

.list-page {
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