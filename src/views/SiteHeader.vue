<template>
  <header
    class="site-header"
    :class="{ 'site-header--nav-opened': navOpened }"
  >
    <SiteLogo class="site-header__logo" />

    <div class="site-header__site-name">
      <span class="site-header__site-name-1">Path</span>
      <span class="site-header__site-name-2">Undefined</span>
    </div>

    <SiteMenuButton
      class="site-header__menu-toggle-button"
      :close="navOpened"
      @click="toggleNavOpened"
    />

    <div
      class="site-header__nav-container"
      :style="navContainerCssVars"
    >
      <nav class="site-header__nav">
        <ul class="site-header__nav-list">
          <li
            class="site-header__nav-item"
            v-for="page in pages"
            :key="page.name"
          >
            <RouterLink
              class="site-header__nav-link"
              :class="{ 'site-header__nav-link--current': page.name === currentPageName }"
              :to="{ path: `/${currentLanguageCode}/${page.name}` }"
            >{{ i18n(page.label) }}</RouterLink>
          </li>
        </ul>
      </nav>

      <nav class="site-header__nav">
        <ul class="site-header__nav-list">
          <li
            class="site-header__nav-item"
            v-for="language in languages"
            :key="language.code"
          >
            <RouterLink
              class="site-header__nav-link"
              :class="{ 'site-header__nav-link--current': language.code === currentLanguageCode }"
              :to="{ path: `/${language.code}/${currentPageName}`, query: currentQueryParams }"
            >{{ language.label }}</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { useGlobalState } from '@/services/GlobalState';
import { useI18n } from '@/services/I18n';

import SiteLogo from '@/components/common/svg/SiteLogo.vue';
import SiteMenuButton from './SiteMenuButton.vue';

import type { WebsitePageConfig } from '@/types/WebsiteConfig.types';

export default defineComponent({
  components: {
    SiteLogo,
    SiteMenuButton,
    RouterLink,
  },

  async setup() {
    const route = useRoute();
    const globalState = useGlobalState(route);
    const i18n = useI18n(globalState);

    const navOpened = ref(false);
    const toggleNavOpened = () => {
      navOpened.value = !navOpened.value;
    };
    watch(
      [
        globalState.currentLanguageCode,
        globalState.currentPageName,
      ],
      () => { setTimeout(() => {navOpened.value = false}, 200) },
    );

    const pages = computed(() =>
      globalState.websiteConfig.value?.pages.filter((page) => page.label) as Required<WebsitePageConfig>[]);
    const languages = computed(() =>
      globalState.websiteConfig.value?.languages.options);

    const currentQueryParams = computed(() => route.query);

    const navContainerCssVars = computed(() => ({
      '--number-of-pages': pages.value?.length ?? 0,
      '--number-of-langs': languages.value?.length ?? 0,
    }));

    return {
      i18n,

      navOpened,
      toggleNavOpened,

      pages,
      languages,
      currentLanguageCode: globalState.currentLanguageCode,
      currentPageName: globalState.currentPageName,
      currentQueryParams,

      navContainerCssVars,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/Tokens.scss';
@import '@/components/common/EmphasizedText.scss';

.site-header {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__logo {
    width: 150px;
    height: 150px;
    color: $color-accent;
  }

  &__site-name {
    margin-top: spacing(0.5);
    height: 80px;
    user-select: none;

    &-1, &-2 {
      display: block;
      line-height: 1;
      font-weight: bold;
      text-transform: uppercase;
    }

    &-1 {
      margin-left: 1px;
      font-size: 60px;
    }

    &-2 {
      margin-left: 4px;
      margin-top: -10px;
      font-size: 27px;
    }
  }

  &__menu-toggle-button {
    margin-top: spacing(6);
    color: $color-accent;
  }

  &__nav-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    @include media-larger-than($media-breakpoint-main) {
      flex-direction: row;
      justify-content: space-around;
    }

    width: 100%;
    height: 0;

    overflow-y: hidden;

    transition: $transition-time;
  }

  &--nav-opened &__nav-container {
    height: calc(
      48px * var(--number-of-pages) +
      spacing(4) +
      48px * var(--number-of-langs) +
      spacing(4)
    );

    @include media-larger-than($media-breakpoint-main) {
      height: calc(
        48px * var(--number-of-pages) + spacing(4)
      );
    }
  }

  &__nav {
    margin-top: spacing(4);

    &-list {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &-item {
      margin-top: spacing(2);
    }

    &-link {
      @include typography-label;
      @include typography-size-s;

      @include emphasized-text--neutral;

      display: inline-block;
      text-decoration: none;

      cursor: pointer;

      transition: $transition-time;

      &:hover {
        @include emphasized-text--default;
      }

      &:active {
        @include emphasized-text--default;
        margin-left: spacing(-2);
        margin-right: spacing(-2);
        padding-left: spacing(2);
        padding-right: spacing(2);
      }

      &--current,
      &--current:hover {
        @include emphasized-text--strong;
        margin-left: spacing(-2);
        margin-right: spacing(-2);
        padding-left: spacing(2);
        padding-right: spacing(2);
      }
    }
  }
}
</style>
