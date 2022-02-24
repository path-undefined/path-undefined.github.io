<template>
  <div
    v-if="websiteConfig && websiteStatus"
    class="website"
  >
    <site-header
      :websiteConfig="websiteConfig"
      :websiteStatus="websiteStatus"
    />

    <page
      :websiteConfig="websiteConfig"
      :websiteStatus="websiteStatus"
    />

    <site-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { httpService } from '@/services/HttpService';
import { LanguageCode } from '@/services/Language.types';
import { Nullable } from '@/services/Utility.types';

import Page from '@/components/page/Page.vue';

import SiteHeader from './SiteHeader.vue';
import SiteFooter from './SiteFooter.vue';
import { WebsiteConfig, WebsiteStatus } from './Website.types';

export default defineComponent({
  name: 'App',

  components: {
    Page,
    SiteHeader,
    SiteFooter,
  },

  data() {
    return {
      websiteConfig: null as Nullable<WebsiteConfig>,
      websiteStatus: null as Nullable<WebsiteStatus>,
    };
  },

  async created() {
    this.websiteConfig = await httpService.getJson<WebsiteConfig>('/website.json');

    this.reload();
    this.$watch(
      () => this.$route.params,
      () => { this.reload() },
    );
  },

  methods: {
    reload() {
      this.websiteStatus = {
        currentLanguage: this.$route.params.languageCode as LanguageCode || 'en',
        currentPage: this.$route.params.pageName as string || 'articles',
      };
    },
  },
});
</script>
