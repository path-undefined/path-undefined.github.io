<template>
  <div class="blocks">
    <component
      v-for="(blockConfig, index) in blockConfigs"
      :key="index"
      :is="blockConfig['@type']"
      class="blocks__block"
      :blockConfig="blockConfig"
      :websiteConfig="websiteConfig"
      :websiteStatus="websiteStatus"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { multiLanguageContent } from '@/services/Language';
import { MultiLanguageContent } from '@/services/Language.types';

import { WebsiteConfig, WebsiteStatus } from '@/components/website/Website.types';

import Headline from './Headline.vue';
import Paragraph from './Paragraph.vue';
import Picture from './Picture.vue';
import { BlockConfig } from './Block.types';

export default defineComponent({
  name: 'Blocks',

  components: {
    Headline,
    Paragraph,
    Picture,
  },

  props: {
    blockConfigs: { type: Object as PropType<BlockConfig[]>, required: true },
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
