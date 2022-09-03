<template>
  <footer class="site-footer">
    <hr class="site-footer__splitter" />

    <p class="site-footer__copyright">
      Except where otherwise noted, the website itself is licensed under
      <a href="https://github.com/path-undefined/path-undefined.github.io/blob/main/LICENSE">GNU General Public License v3.0</a>,
      and the content of the website is licensed under
      <a href="https://github.com/path-undefined/blog-content/blob/main/LICENSE">Creative Commons Attribution 4.0 International (CC BY 4.0)</a>.
    </p>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/styles/tokens';

.site-footer {
  &__splitter {
    display: block;
    width: 70%;
    height: 1px;
    background-color: $color-primary;
  }

  &__copyright {
    @include typography-size-xs;
    margin-top: spacing(8);
  }
}
</style>