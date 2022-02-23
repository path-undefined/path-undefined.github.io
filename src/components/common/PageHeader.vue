<template>
  <header class="page-header">
    <div class="page-header__languages">
      <router-link
        v-for="language in websiteConfig.languages.options"
        :key="language.code"
        class="page-header__language-link"
        :class="{
          'page-header__language-link--current': websiteStatus.currentLanguage === language.code
        }"
        :to="`/${language.code}/${websiteStatus.currentPage}`"
      >
        {{ language.label }}
      </router-link>
    </div>

    <img
      class="page-header__logo"
      src="@/assets/logo.svg"
      alt="Website Logo"
    />

    <div class="page-header__title">
      PATH<br />
      UNDEFINED
    </div>

    <nav class="page-header__nav">
      <router-link
        v-for="page in websiteConfig.pages"
        :key="page.name"
        class="page-header__nav-link"
        :class="{
          'page-header__nav-link--current': websiteStatus.currentPage === page.name
        }"
        :to="`/${websiteStatus.currentLanguage}/${page.name}`"
      >
        {{ getMultiLanguageContent(page.label) }}
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { WebsiteConfig } from '@/types/WebsiteConfig';
import { WebsiteStatus } from '@/types/WebsiteStatus';

import { multiLanguageContent } from '@/services/MultiLanguageContent';
import { MultiLanguageContent } from '@/types/Language';

export default defineComponent({
  name: 'PageHeader',

  props: {
    websiteConfig: { type: Object as PropType<WebsiteConfig>, required: true },
    websiteStatus: { type: Object as PropType<WebsiteStatus>, required: true },
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

.page-header {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__language-link {
    font-size: 16px;
    color: $color-primary;
    text-decoration: none;

    &:not(:last-child) {
      margin-right: 20px;
    }

    &--current {
      color: $color-accent;
      font-weight: 700;
    }
  }

  &__logo {
    margin-top: 140px;
    width: 100px;
    height: 100px;
  }

  &__title {
    margin-top: 30px;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    line-height: 30px;
  }

  &__nav {
    margin-top: 60px;
  }

  &__nav-link {
    display: inline-block;
    font-size: 20px;
    color: $color-primary;
    text-decoration: none;
    text-transform: uppercase;

    &:not(:last-child) {
      margin-right: 24px;
    }

    &:hover {
      border-bottom: 4px solid $color-accent;
    }

    &--current {
      border-bottom: 4px solid $color-accent;
      font-weight: 700;
    }
  }
}
</style>
