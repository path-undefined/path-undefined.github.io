<template>
  <figure
    class="image-block"
    :class="{
      'image-block--thumbnails': !isFullscreen,
      'image-block--fullscreen': isFullscreen
    }"
    ref="containerRef"
    @click="toggleFullscreen"
  >
    <img
      class="image-block__image"
      ref="imageRef"
      :src="baseUrl + blockConfig.url"
      :alt="i18n(blockConfig.description)"
    />
    <figcaption class="image-block__description">
      {{ i18n(blockConfig.description) }}
    </figcaption>
  </figure>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useGlobalState } from '@/services/GlobalState';
import { useI18n } from '@/services/I18n';

import type { PropType } from 'vue';
import type { ArticleImageBlockConfig } from '@/types/ArticleConfig.types';

export default defineComponent({
  props: {
    blockConfig: {
      type: Object as PropType<ArticleImageBlockConfig>,
      required: true,
    },
  },

  setup() {
    const route = useRoute();
    const globalState = useGlobalState(route);
    const i18n = useI18n(globalState);

    const containerRef = ref<HTMLDivElement>();
    const imageRef = ref<HTMLImageElement>();

    const baseUrl = import.meta.env.VITE_BLOG_CONTENT_BASE_URL;

    const isFullscreen = ref(false);

    const setImageMaxDimension = () => {
      if (isFullscreen.value) {
        imageRef.value!.style.maxWidth = `${containerRef.value!.clientWidth}px`;
        imageRef.value!.style.maxHeight = `${containerRef.value!.clientHeight}px`;
      } else {
        imageRef.value!.style.maxWidth = `${containerRef.value!.clientWidth}px`;
        imageRef.value!.style.maxHeight = `${containerRef.value!.clientWidth}px`;
      }
    };

    const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value;
      nextTick(() => {
        setImageMaxDimension();
      });
    };

    onMounted(() => {
      setImageMaxDimension();
      window.addEventListener('resize', setImageMaxDimension);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', setImageMaxDimension);
    });

    return {
      baseUrl,
      isFullscreen,
      toggleFullscreen,
      i18n,

      containerRef,
      imageRef,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/Tokens.scss';

.image-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__image {
    display: block;
  }

  &--thumbnails {
    cursor: zoom-in;
    margin: spacing(4) 0;
  }

  &--thumbnails &__description {
    @include typography-size-xs;
    width: 100%;
    text-align: center;
  }

  &--fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $color-primary;
    cursor: zoom-out;
  }

  &--fullscreen &__description {
    display: none;
  }
}
</style>