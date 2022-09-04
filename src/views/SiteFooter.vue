<template>
  <footer class="site-footer">
    <hr class="site-footer__splitter" />

    <p class="site-footer__copyright">
      Except where otherwise noted, the website itself is licensed under
      <a href="https://github.com/path-undefined/path-undefined.github.io/blob/main/LICENSE">
        GNU General Public License v3.0
      </a>,
      and the content of the website is licensed under
      <a href="https://github.com/path-undefined/blog-content/blob/main/LICENSE">
        Creative Commons Attribution 4.0 International (CC BY 4.0)
      </a>.
    </p>

    <div class="site-footer__external-links">
      <a
        class="site-footer__external-link"
        href="https://github.com/path-undefined/path-undefined.github.io"
        target="_blank"
      >
        <GithubLogo class="site-footer__external-link-icon" />
        <span class="site-footer__external-link-text">Website</span>
      </a>
      <a class="site-footer__external-link" href="https://github.com/path-undefined/blog-content" target="_blank">
        <GithubLogo class="site-footer__external-link-icon" />
        <span class="site-footer__external-link-text">Content</span>
      </a>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import GithubLogo from '@/components/common/svg/GithubLogo.vue';

export default defineComponent({
  components: {
    GithubLogo,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/tokens';

.site-footer {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-left: auto;
  margin-right: auto;
  max-width: 500px;

  &__splitter {
    display: block;
    width: 100%;
    height: 1px;
    background-color: $color-primary;
  }

  &__copyright {
    @include typography-size-xs;
    margin-top: spacing(8);
  }

  &__external-links {
    display: flex;
    flex-direction: column;
    @include media-larger-than($media-breakpoint-main) {
      flex-direction: row;
    }
    align-items: center;
    justify-content: space-around;

    margin-top: spacing(4);
    width: 100%;
  }

  &__external-link {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: spacing(1) 0;
    padding: 0;

    color: $color-primary;
    text-decoration: none;

    transition: $transition-time;

    @include emphasized-neutral;

    &:hover {
      @include emphasized-default;
    }

    &:active {
      @include emphasized-default;
      margin: spacing(1) spacing(-2);
      padding: 0 spacing(2);
    }

    &-icon {
      width: 36px;
      height: 36px;
    }

    &-text {
      @include typography-size-xs;
    }
  }
}
</style>