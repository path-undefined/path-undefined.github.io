<template>
  <div class="site">
    <page-header
      :websiteConfig="websiteConfig"
      :websiteStatus="websiteStatus"
    />
    <page-content
      :websiteConfig="websiteConfig"
      :websiteStatus="websiteStatus"
    />
    <page-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { httpService } from '@/services/HttpService';

import { WebsiteConfig } from '@/types/WebsiteConfig';
import { WebsiteStatus } from '@/types/WebsiteStatus';
import { LanguageCode } from '@/types/Language';

import PageHeader from '@/components/common/PageHeader.vue';
import PageContent from '@/components/common/PageContent.vue';
import PageFooter from '@/components/common/PageFooter.vue';

export default defineComponent({
  name: 'App',

  components: {
    PageHeader,
    PageContent,
    PageFooter,
  },

  data() {
    return {
      websiteConfig: {
        subtitle: {},
        languages: {
          fallbackOrder: [],
          options: [],
        },
        pages: [],
      } as WebsiteConfig,

      websiteStatus: {
        currentLanguage: 'en',
        currentPage: 'articles',
      } as WebsiteStatus,
    };
  },

  async created() {
    this.websiteConfig = await httpService.getJson<WebsiteConfig>('/website.json');

    this.updateWebsiteStatus();
    this.$watch(
      () => this.$route.params,
      () => { this.updateWebsiteStatus() },
    );
  },

  methods: {
    updateWebsiteStatus() {
      this.websiteStatus = {
        currentLanguage: this.$route.params.languageCode as LanguageCode || 'en',
        currentPage: this.$route.params.pageName as string || 'articles',
      };
    },
  },
});
</script>
