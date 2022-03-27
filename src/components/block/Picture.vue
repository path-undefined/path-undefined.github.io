<template>
  <figure class="picture">
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

  methods: {
    getMultiLanguageContent<T>(value: MultiLanguageContent<T>): T {
      return multiLanguageContent<T>(
        value,
        this.websiteStatus.currentLanguage,
        this.websiteConfig.languages.fallbackOrder,
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.picture {
  margin: 36px 0;

  &__image {
    display: block;
    max-width: 100%;
  }

  &__description {
    margin-top: 8px;
    font-size: 14px;
    text-align: center;
  }
}
</style>
