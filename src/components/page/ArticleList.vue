<template>
  <div class="article-list">
    This is an article list.
    {{ pageConfig }} {{ websiteConfig }} {{ websiteStatus }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { WebsiteConfig } from '@/types/WebsiteConfig';
import { WebsiteStatus } from '@/types/WebsiteStatus';

import { ArticleListPageConfig } from './ArticleList.config';

export default defineComponent({
  name: 'ArticleList',

  props: {
    pageConfig: { type: Object as PropType<ArticleListPageConfig>, required: true },
    websiteConfig: { type: Object as PropType<WebsiteConfig>, required: true },
    websiteStatus: { type: Object as PropType<WebsiteStatus>, required: true },
  },
});
</script>

<style lang="scss" scoped>
</style>
