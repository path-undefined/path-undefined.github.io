<template>
  <component
    :is="headlineTag"
    class="headline"
    :class="displayLevelModifier"
  >
    {{ getMultiLanguageContent(blockConfig.content) }}
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { multiLanguageContent } from '@/services/Language';
import { MultiLanguageContent } from '@/services/Language.types';

import { WebsiteConfig, WebsiteStatus } from '@/components/website/Website.types';

import { HeadlineBlockConfig } from './Headline.types';

export default defineComponent({
  name: 'Headline',

  props: {
    blockConfig: { type: Object as PropType<HeadlineBlockConfig>, required: true },
    websiteConfig: { type: Object as PropType<WebsiteConfig>, required: true },
    websiteStatus: { type: Object as PropType<WebsiteStatus>, required: true },
  },

  computed: {
    headlineTag(): string {
      return `h${this.blockConfig.level}`;
    },

    displayLevelModifier(): string {
      return `headline--display-level-${this.blockConfig.displayLevel}`;
    },
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
.headline {
  font-weight: 700;

  &--display-level-2 {
    font-size: 32px;
  }

  &--display-level-3 {
    font-size: 28px;
  }

  &--display-level-4 {
    font-size: 24px;
  }

  &--display-level-5 {
    font-size: 20px;
  }

  &--display-level-6 {
    font-size: 16px;
  }
}
</style>
