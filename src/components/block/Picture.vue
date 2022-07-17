<template>
  <figure
    class="picture"
    :class="{ 'picture--fullscreen': fullscreen }"
    @click="toggleFullscreen"
  >
    <img
      class="picture__image"
      :src="blockConfig.url"
      :alt="getMultiLanguageContent(blockConfig.description)"
    />
    <figcaption class="picture__description">
      {{ getMultiLanguageContent(blockConfig.description) }}
    </figcaption>
  </figure>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { multiLanguageContent } from '@/services/Language';
import { MultiLanguageContent } from '@/services/Language.types';

import { WebsiteConfig, WebsiteStatus } from '@/components/website/Website.types';

import { PictureBlockConfig } from './Picture.types';

export default defineComponent({
  name: 'picture',

  props: {
    blockConfig: { type: Object as PropType<PictureBlockConfig>, required: true },
    websiteConfig: { type: Object as PropType<WebsiteConfig>, required: true },
    websiteStatus: { type: Object as PropType<WebsiteStatus>, required: true },
  },

  data() {
    return {
      fullscreen: false,
    };
  },

  methods: {
    getMultiLanguageContent<T>(value: MultiLanguageContent<T>): T {
      return multiLanguageContent<T>(
        value,
        this.websiteStatus.currentLanguage,
        this.websiteConfig.languages.fallbackOrder,
      );
    },

    toggleFullscreen() {
      this.fullscreen = !this.fullscreen;

      if (this.fullscreen) {
        document.body.classList.add('picture__fixed-body');
      } else {
        document.body.classList.remove('picture__fixed-body');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.picture {
  margin: 36px 0;
  cursor: pointer;

  &__image {
    display: block;
    max-width: 100%;
  }

  &__description {
    margin-top: 8px;
    font-size: 14px;
    text-align: center;
  }

  &--fullscreen {
    position: fixed;
    left: 0;
    top: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin: 0;
    width: 100%;
    height: calc(100% - 60px);
    padding: 30px 0;

    background-color: $color-primary;
    overflow-y: hidden;
  }

  &--fullscreen &__image {
    max-width: 100%;
    max-height: calc(100vh - 100px);
  }

  &--fullscreen &__description {
    color: $color-secondary;
  }
}
</style>

<style lang="scss">
.picture {
  &__fixed-body{
    overflow-y: hidden;
  }
}
</style>
