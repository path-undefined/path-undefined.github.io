<template>
  <p
    class="paragraph"
    v-html="parseMarkdown(getMultiLanguageContent(blockConfig.content))"
  ></p>
</template>

<script lang="ts">
import { marked } from 'marked';
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

    parseMarkdown(source: string): string {
      return marked.parseInline(source);
    },
  },
});
</script>

<style lang="scss" scoped>
.paragraph {
  margin: 36px 0;
  font-size: 18px;
}
</style>
