<template>
  <div class="list-page">
    <h1 class="list-page__title">
      {{ i18n(pageConfig.i18n.pageTitle) }}
    </h1>

    <div class="list-page__list">
      <RouterLink
        class="list-page__item"
        v-for="item, index in items"
        :key="`${currentPage}-${index}`"
        :to="{
          path: `/${currentLanguageCode}/${item.itemUrl.pageName}`,
          query: item.itemUrl.queries,
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
            v-if="item.thumbnailImageUrl"
            class="list-page__item-thumbnail-image"
            :src="getThumbnailImageUrl(item.thumbnailImageUrl)"
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
      </RouterLink>

      <PaginationControl
        class="list-page__pagination"
        :currentPage="currentPage"
        :totalPageNumber="totalPageNumber"
        :i18n="{
          prevPageLabel: i18n(pageConfig.i18n.prevPageLabel),
          currentPageLabel: i18n(pageConfig.i18n.currentPageLabel),
          nextPageLabel: i18n(pageConfig.i18n.nextPageLabel),
        }"
        @update:currentPage="jumpToPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useI18n } from '@/services/I18n';
import { useGlobalState } from '@/services/GlobalState';
import { fetchConfigJson } from '@/services/Http';
import { useMarkdown } from '@/services/Markdown';

import PaginationControl from '@/components/common/PaginationControl.vue';

import type { PropType } from 'vue';
import type { ListPageConfig } from '@/types/PageConfig.types';
import type { ListConfig } from '@/types/ListConfig.types';
import { getFileNameByFileIndex, getTotalFileNumber } from '@/services/FilePagination';

export default defineComponent({
  components: {
    PaginationControl,
  },

  props: {
    pageConfig: {
      type: Object as PropType<ListPageConfig>,
      required: true,
    },
  },

  async setup(props) {
    const route = useRoute();
    const router = useRouter();
    const globalState = useGlobalState(route);
    const i18n = useI18n(globalState);
    const parseMarkdown = useMarkdown();

    const listConfig = shallowRef<ListConfig>();
    const currentPage = ref(1);
    const items = computed(
      () =>
        listConfig.value
          ? listConfig.value.items
          : [],
    );
    const totalPageNumber = computed(
      () =>
        listConfig.value
          ? getTotalFileNumber(props.pageConfig.filePagination)
          : 0,
    );

    const getThumbnailImageUrl = (url: string) =>
      url.startsWith('https://')
        ? url
        : import.meta.env.VITE_BLOG_CONTENT_BASE_URL + url;

    const jumpToPage = async (page: number) => {
      const filePath = getFileNameByFileIndex(props.pageConfig.filePagination, page - 1);
      listConfig.value = await fetchConfigJson(filePath);
      currentPage.value = page;

      router.push({
        path: `/${globalState.currentLanguageCode.value}/${globalState.currentPageName.value}`,
        query: { ...route.query, page },
      });
    };

    onBeforeMount(() => {
      const page = Number(route.query.page) || 1;
      jumpToPage(page);
    });

    return {
      i18n,
      parseMarkdown,

      currentLanguageCode: globalState.currentLanguageCode,

      items,
      getThumbnailImageUrl,

      currentPage,
      totalPageNumber,
      jumpToPage,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/Tokens.scss';
@import '@/components/common/PageTitle.scss';
@import '@/components/common/EmphasizedText.scss';

.list-page {
  &__title {
    @include page-title;
  }

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
    width: 100%;

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

  &__pagination {
    margin-top: spacing(8);
  }
}
</style>