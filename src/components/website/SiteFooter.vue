<template>
  <footer class="site-footer">
    <p class="site-footer__copyright">
      Except where otherwise noted, this website itself is licensed under
      <a href="https://github.com/path-undefined/path-undefined.github.io/blob/main/LICENSE">GNU General Public License v3.0</a>,
      and the content of the website is licensed under
      <a href="https://github.com/path-undefined/blog-content/blob/main/LICENSE">Creative Commons Attribution 4.0 International (CC BY 4.0)</a>.
    </p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SiteFooter',
});
</script>

<style lang="scss" scoped>
.site-footer {
  &__copyright {
    margin-top: 160px;
    margin-bottom: 40px;
    font-size: 12px;
  }
}
</style>
