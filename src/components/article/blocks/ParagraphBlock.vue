<template>
  <p
    class="paragraph-block"
    v-html="parseMarkdown(i18n(blockConfig.content))"
  >
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useMarkdown } from '@/services/Markdown';

import type { PropType } from 'vue';
import type { ArticleParagraphBlockConfig } from '@/types/ArticleConfig.types';
import { useRoute } from 'vue-router';
import { useGlobalState } from '@/services/GlobalState';
import { useI18n } from '@/services/I18n';

export default defineComponent({
  props: {
    blockConfig: {
      type: Object as PropType<ArticleParagraphBlockConfig>,
      required: true,
    },
  },

  setup() {
    const parseMarkdown = useMarkdown();
    const route = useRoute();
    const globalState = useGlobalState(route);
    const i18n = useI18n(globalState);

    return {
      parseMarkdown,
      i18n,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/tokens';

.paragraph-block {
  margin: spacing(2) 0;
}
</style>