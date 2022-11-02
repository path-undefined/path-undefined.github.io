<template>
  <div
    class="comic-reader-page"
    v-if="comicConfig"
  >
    <div class="comic-reader-page__container">
      <h1 class="comic-reader-page__title">
        {{ i18n(comicConfig.title) }}
      </h1>

      <figure
        v-if="contentBatchConfig"
        class="comic-reader-page__content"
      >
        <img
          class="comic-reader-page__image"
          :src="baseUrl + contentBatchConfig.pages[pageIndex].imageUrl"
        >

        <figcaption
          class="comic-reader-page__text"
          v-html="parseMarkdown(i18n(contentBatchConfig.pages[pageIndex].text))"
        ></figcaption>
      </figure>

      <PaginationControl
        class="comic-reader-page__pagination"
        :currentPage="currentPage"
        :totalPageNumber="totalPageNumber"
        :i18n="{
          prevPageLabel: i18n(pageConfig.i18n.prevPageLabel),
          currentPageLabel: i18n(pageConfig.i18n.currentPageLabel),
          nextPageLabel: i18n(pageConfig.i18n.nextPageLabel),
        }"
        @update:currentPage="jumpToPage"
      />

      <div
        class="comic-reader-page__back-link-container"
      >
        <RouterLink
          class="comic-reader-page__back-link"
          :to="{
            path: `/${currentLanguageCode}/${pageConfig.backLinkUrl.pageName}`,
            query: pageConfig.backLinkUrl.queries,
          }"
        >
          {{ i18n(pageConfig.i18n.backLinkLabel) }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeMount, shallowRef } from 'vue';
import { useRoute } from 'vue-router';

import { fetchConfigJson } from '@/services/Http';
import { readFromLocalStorage, writeToLocalStorage } from '@/services/LocalStorage';
import { useI18n } from '@/services/I18n';
import { useMarkdown } from '@/services/Markdown';
import { useGlobalState } from '@/services/GlobalState';
import { getFileNameByItemIndex, getItemIndexInFile } from '@/services/FilePagination';

import PaginationControl from '@/components/common/PaginationControl.vue';

import type { PropType } from 'vue';
import type { ComicReaderPageConfig } from '@/types/PageConfig.types';
import type { ComicConfig, ComicContentBatchConfig } from '@/types/ComicReaderPage.types';

export default defineComponent({
  components: {
    PaginationControl,
  },

  props: {
    pageConfig: {
      type: Object as PropType<ComicReaderPageConfig>,
      required: true,
    },
  },

  setup() {
    const route = useRoute();
    const globalState = useGlobalState(route);
    const i18n = useI18n(globalState);
    const parseMarkdown = useMarkdown();
    const baseUrl = import.meta.env.VITE_BLOG_CONTENT_BASE_URL;

    const comicConfig = shallowRef<ComicConfig>();
    const currentPage = ref();

    const totalPageNumber = computed(
      () => comicConfig.value
        ? comicConfig.value.filePagination.totalItemNumber
        : 0,
    );
    const pageIndex = computed(
      () =>
        comicConfig.value && currentPage.value
          ? getItemIndexInFile(comicConfig.value.filePagination, currentPage.value - 1)
          : 0,
    );

    const contentBatchConfig = ref<ComicContentBatchConfig>();

    let currentFilePath: string;
    const jumpToPage = async (page: number) => {
      if (!comicConfig.value) {
        return;
      }

      currentPage.value = page;

      const newFilePath = getFileNameByItemIndex(comicConfig.value.filePagination, currentPage.value - 1);
      if (currentFilePath !== newFilePath) {
        contentBatchConfig.value = await fetchConfigJson(newFilePath);
        currentFilePath = newFilePath;
      }

      writeToLocalStorage('ComicReaderPage:currentPage', currentPage.value);
    };

    onBeforeMount(async () => {
      const comicConfigPath = route.query.comicConfigPath as string;
      comicConfig.value = await fetchConfigJson(comicConfigPath);

      const startPage = readFromLocalStorage<number>('ComicReaderPage:currentPage') || 1;
      jumpToPage(startPage);
    });

    return {
      currentLanguageCode: globalState.currentLanguageCode,
      i18n,
      parseMarkdown,
      baseUrl,

      comicConfig,
      contentBatchConfig,

      currentPage,
      totalPageNumber: totalPageNumber,
      pageIndex: pageIndex,
      jumpToPage,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/Tokens.scss';
@import '@/components/common/PageTitle.scss';
@import '@/components/common/TextButton.scss';

.comic-reader-page {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $color-secondary;
  overflow-y: auto;

  &__container {
    margin: 0 auto;
    max-width: 600px;
  }

  &__title {
    @include page-title;
    @include typography-size-xl;
  }

  &__content {
    margin-top: spacing(2);
  }

  &__image {
    display: block;
    width: 100%;
  }

  &__text {
    display: flex;
    justify-content: center;
    margin-top: spacing(2);
    padding: 0 spacing(2);
  }

  &__pagination {
    margin-top: spacing(8);
  }

  &__back-link-container {
    display: flex;
    justify-content: center;
    margin-top: spacing(3);
    margin-bottom: spacing(6);
  }

  &__back-link {
    @include text-button;
  }
}
</style>