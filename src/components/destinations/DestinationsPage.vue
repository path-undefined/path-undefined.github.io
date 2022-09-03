<template>
  <div class="destinations-page">
    <PageTitle class="destinations-page__title">
      {{ i18n(pageConfig.i18n.title) }}
    </PageTitle>

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

import PageTitle from '@/components/common/PageTitle.vue';

import type { PropType } from 'vue';
import type { DestinationsPageConfig } from '@/types/PageConfig.types';

export default defineComponent({
  components: {
    PageTitle,
  },

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
@import '@/styles/tokens';

.destinations-page {
  &__message {
    @include typography-size-l;
    margin-top: spacing(8);
    text-align: center;
  }
}
</style>