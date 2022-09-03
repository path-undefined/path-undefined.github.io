<template>
  <button
    class="site-menu-button"
    :class="{ 'site-menu-button--close': close }"
    @click="onClick"
  >
    <div class="site-menu-button__strip-1" />
    <div class="site-menu-button__strip-2" />
    <div class="site-menu-button__strip-3" />
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
@import '@/styles/tokens';

.site-menu-button {
  position: relative;
  display: block;
  width: 40px;
  height: 40px;
  cursor: pointer;

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
}
</style>