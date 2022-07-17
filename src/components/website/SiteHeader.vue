<template>
  <header class="site-header">
    <div class="site-header__languages">
      <router-link
        v-for="language in websiteConfig.languages.options"
        :key="language.code"
        class="site-header__language-link u-fancy-link"
        :class="{
          'u-fancy-link--current': websiteStatus.currentLanguage === language.code
        }"
        :to="{ path: `/${language.code}/${websiteStatus.currentPage}`, query: $route.query }"
      >
        {{ language.label }}
      </router-link>
    </div>

    <img
      class="site-header__logo"
      src="@/assets/logo.svg"
      alt="Website Logo"
    />

    <div class="site-header__title">
      PATH<br />
      UNDEFINED
    </div>

    <nav class="site-header__nav">
      <router-link
        v-for="page in navPages"
        :key="page.name"
        class="site-header__nav-link u-fancy-link"
        :class="{
          'u-fancy-link--current': websiteStatus.currentPage === page.name
        }"
        :to="{ path: `/${websiteStatus.currentLanguage}/${page.name}` }"
      >
        {{ getMultiLanguageContent(page.label) }}
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { multiLanguageContent } from '@/services/Language';
import { MultiLanguageContent } from '@/services/Language.types';

import { WebsiteConfig, WebsiteStatus } from './Website.types';

export default defineComponent({
  name: 'SiteHeader',

  props: {
    websiteConfig: { type: Object as PropType<WebsiteConfig>, required: true },
    websiteStatus: { type: Object as PropType<WebsiteStatus>, required: true },
  },

  computed: {
    navPages() {
      return this.websiteConfig.pages.filter((page) => !!page.label);
    },
  },

  methods: {
    getMultiLanguageContent<T>(value: MultiLanguageContent<T>): T {
      return multiLanguageContent<T>(
        value,
        this.websiteStatus.currentLanguage,
        this.websiteConfig.languages.fallbackOrder,
      );
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.site-header {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__language-link {
    font-size: 14px;

    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  &__logo {
    margin-top: 50px;
    width: 100px;
    height: 100px;
  }

  &__title {
    margin-top: 10px;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    line-height: 30px;
  }

  &__nav {
    margin-top: 40px;
  }

  &__nav-link {
    font-size: 20px;
    text-transform: uppercase;

    &:not(:last-child) {
      margin-right: 24px;
    }
  }
}
</style>
