<template>
  <div class="comic-reader-page">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import { useI18n } from '@/services/I18n';
import { useGlobalState } from '@/services/GlobalState';

import type { PropType } from 'vue';
import type { ComicReaderPageConfig } from '@/types/PageConfig.types';

export default defineComponent({
  props: {
    pageConfig: {
      type: Object as PropType<ComicReaderPageConfig>,
      required: true,
    },
  },

  setup() {
    const route = useRoute();
    const globalState = useGlobalState(route);
    const i18n = useI18n(globalState);

    return {
      i18n,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/Tokens.scss';

.comic-reader-page {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;

  background-color: $color-secondary;
}
</style>