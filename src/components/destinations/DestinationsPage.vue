<template>
  <div class="destinations-page">
    <h1 class="destinations-page__title">
      {{ i18n(pageConfig.i18n.title) }}
    </h1>

    <p class="destinations-page__message">
      {{ i18n(pageConfig.i18n.message) }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import { useI18n } from '@/services/I18n';
import { useGlobalState } from '@/services/GlobalState';

import type { PropType } from 'vue';
import type { DestinationsPageConfig } from '@/types/PageConfig.types';

export default defineComponent({
  props: {
    pageConfig: {
      type: Object as PropType<DestinationsPageConfig>,
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
@import '@/components/common/PageTitle.scss';

.destinations-page {
  &__title {
    @include page-title;
  }

  &__message {
    @include typography-size-l;
    margin-top: spacing(8);
    text-align: center;
  }
}
</style>