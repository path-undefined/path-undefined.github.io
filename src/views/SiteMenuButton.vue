<template>
  <button
    class="site-menu-button"
    :class="{ 'site-menu-button--close': close }"
    @click="onClick"
  >
    <div class="site-menu-button__icon">
      <div class="site-menu-button__strip-1" />
      <div class="site-menu-button__strip-2" />
      <div class="site-menu-button__strip-3" />
    </div>
    <div class="site-menu-button__text">Navigation</div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    close: {
      type: Boolean,
      required: true,
    },
  },

  emits: [ 'click' ],

  setup(_, { emit }) {
    const onClick = () => {
      emit('click');
    };

    return {
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/Tokens.scss';

.site-menu-button {
  display: flex;
  align-items: center;
  cursor: pointer;

  &__icon {
    position: relative;
    width: 32px;
    height: 32px;
  }

  &__strip-1, &__strip-2, &__strip-3 {
    position: absolute;
    left: 5%;
    width: 90%;
    height: 12.5%;
    color: inherit;
    background-color: currentColor;
    transition: $transition-time;
  }

  &__strip-1 {
    top: 12.5%;
  }

  &__strip-2 {
    top: 43.75%;
  }

  &__strip-3 {
    top: 75%;
  }

  &--close &__strip-1,
  &--close &__strip-2,
  &--close &__strip-3 {
    top: 43.75%;
    left: 0;
    width: 100%
  }

  &--close &__strip-1 {
    transform: rotate(-45deg);
  }

  &--close &__strip-2 {
    width: 0;
    left: 50%;
    transform: rotate(-90deg);
  }

  &--close &__strip-3 {
    transform: rotate(-135deg);
  }

  &__text {
    @include typography-heading;
    @include typography-size-l;
    margin-left: spacing(2);
  }
}
</style>