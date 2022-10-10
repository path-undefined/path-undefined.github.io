<template>
  <div
    class="comic-reader-page"
    v-if="comicConfig"
  >
    <PageTitle class="article-page__title">
      {{ i18n(comicConfig.title) }}
    </PageTitle>

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
      >
        {{ parseMarkdown(i18n(contentBatchConfig.pages[pageIndex].text)) }}
      </figcaption>
    </figure>

    <div class="comic-reader-page__pagination">
      <button
        class="comic-reader-page__jump-button"
        @click="jumpToPrevPage"
      >
        {{ i18n(pageConfig.i18n.prevPageLabel) }}
      </button>

      <div class="comic-reader-page__current-page">
        {{ i18n(pageConfig.i18n.currentPageLabel) }}&nbsp;{{ pageNumber }}/{{ totalPageNumber }}
      </div>

      <button
        class="comic-reader-page__jump-button"
        @click="jumpToNextPage"
      >
        {{ i18n(pageConfig.i18n.nextPageLabel) }}
      </button>
    </div>

    <div
      class="comic-reader-page__back-link-container"
    >
      <router-link
        class="comic-reader-page__back-link"
        :to="{
          path: `/${currentLanguageCode}/${pageConfig.backLinkUrl.pageName}`,
          query: pageConfig.backLinkUrl.queries,
        }"
      >
        {{ i18n(pageConfig.i18n.backLinkLabel) }}
      </router-link>
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

import PageTitle from '@/components/common/PageTitle.vue';

import type { PropType } from 'vue';
import type { ComicReaderPageConfig } from '@/types/PageConfig.types';
import type { ComicConfig, ComicContentBatchConfig } from '@/types/ComicReaderPage.types';

const PAGES_PER_BATCH = 10;

export default defineComponent({
  components: {
    PageTitle,
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

    const pageNumber = ref();
    const totalPageNumber = computed(() => comicConfig.value?.totalPageNumber || 0);
    const pageIndex = computed(() => (pageNumber.value - 1) % PAGES_PER_BATCH);

    const contentBatchConfig = ref<ComicContentBatchConfig>();
    let currentFileNumber: number;

    const jumpToPage = async (pageNum: number) => {
      const comicConfigValue = comicConfig.value;
      if (!comicConfigValue) {
        return;
      }

      let newPageNum = pageNum;
      if (newPageNum < 1) {
        newPageNum = 1;
      }
      if (newPageNum > comicConfigValue.totalPageNumber) {
        newPageNum = comicConfigValue.totalPageNumber;
      }

      const newFileNumber = Math.floor((newPageNum - 1) / PAGES_PER_BATCH);

      if (currentFileNumber !== newFileNumber) {
        const newFilePath = `${comicConfigValue.batchPathPrefix}/${padLeft(newFileNumber.toString(), 3, '0')}.json`;
        contentBatchConfig.value = await fetchConfigJson(newFilePath);
        currentFileNumber = newFileNumber;
      }

      pageNumber.value = newPageNum;
      writeToLocalStorage('ComicReaderPage:currentPageNumber', newPageNum);
    };

    const jumpToPrevPage = () => { jumpToPage(pageNumber.value - 1) };
    const jumpToNextPage = () => { jumpToPage(pageNumber.value + 1) };

    const padLeft = (str: string, length: number, paddingChar: string) => {
      let result = str;
      while (result.length < length) {
        result += paddingChar;
      }
      return result;
    };

    onBeforeMount(async () => {
      const comicConfigPath = route.query.comicConfigPath as string;
      comicConfig.value = await fetchConfigJson(comicConfigPath);

      const startPage = readFromLocalStorage<number>('ComicReaderPage:currentPageNumber') || 1;
      jumpToPage(startPage);
    });

    return {
      currentLanguageCode: globalState.currentLanguageCode,
      i18n,
      parseMarkdown,
      baseUrl,

      comicConfig,
      contentBatchConfig,

      pageNumber,
      totalPageNumber,
      pageIndex,

      jumpToPrevPage,
      jumpToNextPage,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/Tokens.scss';
@import '@/components/common/TextButton.scss';

.comic-reader-page {
  &__container {
    margin: 0 auto;
    max-width: 600px;
  }

  &__content {
    margin-top: spacing(3);
  }

  &__image {
    display: block;
    width: 100%;
  }

  &__text {
    display: flex;
    justify-content: center;
    margin-top: spacing(3);
    padding: 0 spacing(2);
  }

  &__pagination {
    display: flex;
    justify-content: space-around;
    margin-top: spacing(6);
    width: 100%;
  }

  &__jump-button {
    @include text-button;
  }

  &__back-link-container {
    display: flex;
    justify-content: center;
    margin-top: spacing(6);
  }

  &__back-link {
    @include text-button;
  }
}
</style>