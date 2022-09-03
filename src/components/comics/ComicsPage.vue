<template>
  <div class="comics-page">
    <PageTitle class="comics-page__title">
      {{ i18n(pageConfig.i18n.title) }}
    </PageTitle>

    <p class="comics-page__message">
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
import type { ComicsPageConfig } from '@/types/PageConfig.types';

export default defineComponent({
  components: {
    PageTitle,
  },

  props: {
    pageConfig: {
      type: Object as PropType<ComicsPageConfig>,
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

.comics-page {
  &__message {
    @include typography-size-l;
    margin-top: spacing(8);
    text-align: center;
  }
}
</style>