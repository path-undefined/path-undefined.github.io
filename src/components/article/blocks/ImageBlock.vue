<template>
  <figure
    class="image-block"
    :class="{
      'image-block--thumbnails': !isFullscreen,
      'image-block--fullscreen': isFullscreen
    }"
  >
    <div class="image-block__image-container">
      <img
        class="image-block__image"
        :src="blockConfig.url"
        :alt="i18n(blockConfig.description)"
        @click="toggleFullscreen"
      />
    </div>
    <figcaption class="image-block__description">
      {{ i18n(blockConfig.description) }}
    </figcaption>
  </figure>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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

    const isFullscreen = ref(false);

    const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value;
    };

    return {
      isFullscreen,
      toggleFullscreen,
      i18n,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/tokens';

.image-block {
  &--thumbnails {
    cursor: zoom-in;
  }

  &--thumbnails &__image-container {
    position: relative;

    &::after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
  }

  &--thumbnails &__image {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &--thumbnails &__description {
    @include typography-size-xs;
    display: flex;
    justify-content: center;
  }

  &--fullscreen {
    cursor: zoom-out;
  }

  &--fullscreen &__image-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $color-primary;
  }

  &--fullscreen &__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &--fullscreen &__description {
    display: none;
  }
}
</style>