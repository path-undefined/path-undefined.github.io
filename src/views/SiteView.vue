<template>
  <div class="site-view">
    <SiteHeader class="site-view__header" />
    <SiteContent class="site-view__content" />
    <SiteFooter class="site-view__footer" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import SiteHeader from './SiteHeader.vue';
import SiteContent from './SiteContent.vue';
import SiteFooter from './SiteFooter.vue';

export default defineComponent({
  components: {
    SiteHeader,
    SiteContent,
    SiteFooter,
  },
});
</script>

<style lang="scss">
@import '@/styles/Tokens.scss';

.site-view {
  margin: 0 auto;
  max-width: 600px;
  padding: 0 spacing(2);
  overflow-x: hidden;

  &__content {
    margin-top: spacing(7);
  }

  &__footer {
    margin-top: spacing(10);
    margin-bottom: spacing(12);
  }
}
</style>
