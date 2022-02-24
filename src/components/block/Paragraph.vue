<template>
  <p
    class="paragraph"
    v-html="getMultiLanguageContent(blockConfig.content)"
  ></p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { multiLanguageContent } from '@/services/Language';
import { MultiLanguageContent } from '@/services/Language.types';

import { WebsiteConfig, WebsiteStatus } from '@/components/website/Website.types';

import { ParagraphBlockConfig } from './Paragraph.types';

export default defineComponent({
  name: 'Paragraph',

  props: {
    blockConfig: { type: Object as PropType<ParagraphBlockConfig>, required: true },
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
.paragraph {
  font-size: 16px;
}
</style>
