<template>
    <h1 class="page-title">
      <slot />
    </h1>
</template>

<style lang="scss" scoped>
@import '@/styles/Tokens.scss';
@import '@/components/common/EmphasizedText.scss';

.page-title {
  @include typography-heading;
  @include typography-size-xxl;

  @include emphasized-text--strong;

  border-bottom-width: spacing(1);
  text-align: center;
}
</style>
