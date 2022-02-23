<template>
  <div class="article">
    This is an article.
    {{ pageConfig }} {{ websiteConfig }} {{ websiteStatus }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { WebsiteConfig } from '@/types/WebsiteConfig';
import { WebsiteStatus } from '@/types/WebsiteStatus';

import { ArticlePageConfig } from './Article.config';

export default defineComponent({
  name: 'Article',

  props: {
    pageConfig: { type: Object as PropType<ArticlePageConfig>, required: true },
    websiteConfig: { type: Object as PropType<WebsiteConfig>, required: true },
    websiteStatus: { type: Object as PropType<WebsiteStatus>, required: true },
  },
});
</script>

<style lang="scss" scoped>
</style>
