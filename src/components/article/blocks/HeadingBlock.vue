<template>
  <component
    class="heading-block"
    :is="headingTag"
  >
    {{ i18n(blockConfig.text) }}
</component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import type { PropType } from 'vue';
import type { ArticleHeadingBlockConfig } from '@/types/ArticleConfig.types';
import { useRoute } from 'vue-router';
import { useGlobalState } from '@/services/GlobalState';
import { useI18n } from '@/services/I18n';

export default defineComponent({
  props: {
    blockConfig: {
      type: Object as PropType<ArticleHeadingBlockConfig>,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();
    const globalState = useGlobalState(route);
    const i18n = useI18n(globalState);

    const headingTag = computed(() =>
      `h${props.blockConfig.level + 1}`);

    return {
      i18n,
      headingTag,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/tokens';

h2.heading-block,
h3.heading-block,
h4.heading-block {
  @include typography-heading;
  margin: spacing(8) 0 spacing(4) 0;
  color: $color-accent;
}

h2.heading-block {
  @include typography-size-xl;
}

h3.heading-block {
  @include typography-size-l;
}

h4.heading-block {
  @include typography-size-m;
}
</style>