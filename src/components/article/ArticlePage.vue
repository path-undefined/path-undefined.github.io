<template>
  <div
    class="article-page"
    v-if="articleConfig"
  >
    <h1 class="article-page__title">
      {{ i18n(articleConfig.title) }}
    </h1>

    <div
      v-if="pageConfig.backLinkUrl && pageConfig.i18n.backLinkLabel"
      class="article-page__back-link-container"
    >
      <RouterLink
        class="article-page__back-link"
        :to="{
          path: `/${currentLanguageCode}/${pageConfig.backLinkUrl.pageName}`,
          query: pageConfig.backLinkUrl.queries,
        }"
      >
        {{ i18n(pageConfig.i18n.backLinkLabel) }}
      </RouterLink>
    </div>

    <div class="article-page__metadata">
      <span class="article-page__metadata-time">
        {{ articleConfig.time.date }}&nbsp;{{ articleConfig.time.time }}&nbsp;({{ articleConfig.time.timeZone }})
      </span>

      &bull;

      <span class="article-page__metadata-location">
        {{ i18n(articleConfig.location.name) }}
        <a
          v-if="articleConfig.location.coord"
          :href="`https://www.openstreetmap.org/?mlat=${articleConfig.location.coord.lat}&mlon=${articleConfig.location.coord.long}#map=16/${articleConfig.location.coord.lat}/${articleConfig.location.coord.long}`"
          target="blank"
        >
          {{ i18n(pageConfig.i18n.mapLinkLabel) }}
        </a>
      </span>
    </div>

    <div class="article-page__blocks">
      <component
        v-for="(block, index) in articleConfig.blocks"
        :key="index"
        :is="block.type"
        :blockConfig="block"
      ></component>
    </div>

    <div
      v-if="pageConfig.backLinkUrl && pageConfig.i18n.backLinkLabel"
      class="article-page__back-link-container"
    >
      <RouterLink
        class="article-page__back-link"
        :to="{
          path: `/${currentLanguageCode}/${pageConfig.backLinkUrl.pageName}`,
          query: pageConfig.backLinkUrl.queries,
        }"
      >
        {{ i18n(pageConfig.i18n.backLinkLabel) }}
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

import { fetchConfigJson } from '@/services/Http';
import { useI18n } from '@/services/I18n';
import { useGlobalState } from '@/services/GlobalState';

import HeadingBlock from './blocks/HeadingBlock.vue';
import ParagraphBlock from './blocks/ParagraphBlock.vue';
import ImageBlock from './blocks/ImageBlock.vue';
import ListBlock from './blocks/ListBlock.vue';
import YoutubeBlock from './blocks/YoutubeBlock.vue';

import type { PropType } from 'vue';
import type { ArticlePageConfig } from '@/types/PageConfig.types';
import type { ArticleConfig } from '@/types/ArticleConfig.types';

export default defineComponent({
  components: {
    HeadingBlock,
    ParagraphBlock,
    ImageBlock,
    ListBlock,
    YoutubeBlock,
  },

  props: {
    pageConfig: {
      type: Object as PropType<ArticlePageConfig>,
      required: true,
    },
  },

  async setup(props) {
    const route = useRoute();
    const globalState = useGlobalState(route);
    const i18n = useI18n(globalState);

    const articleConfig = shallowRef<ArticleConfig>();

    onBeforeMount(async () => {
      const articleConfigPath =
        props.pageConfig.articleConfigPath || route.query.articleConfigPath as string;
      articleConfig.value = await fetchConfigJson(articleConfigPath);
    });

    return {
      i18n,
      currentLanguageCode: globalState.currentLanguageCode,
      articleConfig,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/Tokens.scss';
@import '@/components/common/PageTitle.scss';
@import '@/components/common/TextButton.scss';

.article-page {
  &__title {
    @include page-title;
  }

  &__metadata {
    @include typography-size-xs;
    margin-top: spacing(6);
    text-align: center;
  }

  &__blocks {
    margin-top: spacing(10);
  }

  &__back-link-container {
    display: flex;
    justify-content: center;
    margin-top: spacing(6);
    width: 100%;
  }

  &__back-link {
    @include text-button;
  }
}
</style>