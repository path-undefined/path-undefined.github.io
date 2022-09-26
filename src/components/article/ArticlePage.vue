<template>
  <div
    class="article-page"
    v-if="articleConfig"
  >
    <PageTitle class="article-page__title">
      {{ i18n(articleConfig.title) }}
    </PageTitle>

    <div class="article-page__metadata">
      <span class="article-page__metadata-time">
        {{ articleConfig.time.date }}&nbsp;{{ articleConfig.time.time }}&nbsp;({{ articleConfig.time.timeZone }})
      </span>

      &bull;

      <span class="article-page__metadata-location">
        {{ i18n(articleConfig.location.name) }}
        <a
          v-if="articleConfig.location.coord"
          :href="`https://www.openstreetmap.org/?mlat=${articleConfig.location.coord.lat}&mlon=${articleConfig.location.coord.long}`"
        >
          {{ i18n(pageConfig.i18n.mapLinkLabel) }}
        </a>
      </span>
    </div>

    <div class="article-page__back-link-container">
      <router-link
        class="article-page__back-link"
        :to="{ path: `/${currentLanguageCode}/articles` }"
      >
        {{ i18n(pageConfig.i18n.backToListLabel) }}
      </router-link>
    </div>

    <div class="article-page__blocks">
      <component
        v-for="(block, index) in articleConfig.blocks"
        :key="index"
        :is="block.type"
        :blockConfig="block"
      ></component>
    </div>

    <div class="article-page__back-link-container">
      <router-link
        class="article-page__back-link"
        :to="{ path: `/${currentLanguageCode}/articles` }"
      >
        {{ i18n(pageConfig.i18n.backToListLabel) }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { fetchConfigJson } from '@/services/Http';
import { useI18n } from '@/services/I18n';
import { useGlobalState } from '@/services/GlobalState';

import PageTitle from '@/components/common/PageTitle.vue';
import HeadingBlock from './blocks/HeadingBlock.vue';
import ParagraphBlock from './blocks/ParagraphBlock.vue';
import ImageBlock from './blocks/ImageBlock.vue';
import ListBlock from './blocks/ListBlock.vue';

import type { PropType } from 'vue';
import type { ArticlePageConfig } from '@/types/PageConfig.types';
import type { ArticleConfig } from '@/types/ArticleConfig.types';

export default defineComponent({
  components: {
    PageTitle,

    HeadingBlock,
    ParagraphBlock,
    ImageBlock,
    ListBlock,
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

    onMounted(async () => {
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
@import '@/components/common/EmphasizedText.scss';

.article-page {
  &__metadata {
    @include typography-size-xs;
    margin-top: spacing(4);
    text-align: center;
  }

  &__blocks {
    margin-top: spacing(8);
  }

  &__back-link-container {
    display: flex;
    justify-content: center;
    margin-top: spacing(8);
  }

  &__back-link {
    @include typography-heading;
    @include typography-size-s;

    @include emphasized-text--default;

    padding: 0;

    text-decoration: none;

    transition: $transition-time;

    &:hover,
    &:active {
      @include emphasized-text--strong;

      padding: 0 spacing(2);
    }
  }
}
</style>