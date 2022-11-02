<template>
  <div class="pagination-control">
    <button
      class="pagination-control__jump-button"
      @click="jumpToPrevPage"
    >
      {{ i18n.prevPageLabel }}
    </button>

    <div class="pagination-control__current-page">
      {{ i18n.currentPageLabel }}&nbsp;{{ currentPage }}/{{ totalPageNumber }}
    </div>

    <button
      class="pagination-control__jump-button"
      @click="jumpToNextPage"
    >
      {{ i18n.nextPageLabel }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { PropType } from 'vue';

export type PaginationControlPropI18n = {
  prevPageLabel: string;
  currentPageLabel: string;
  nextPageLabel: string;
};

export default defineComponent({
  props: {
    totalPageNumber: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    i18n: {
      type: Object as PropType<PaginationControlPropI18n>,
      required: true,
    },
  },

  emits: [
    'update:currentPage',
  ],

  setup(props, { emit }) {
    const jumpToPrevPage = () => {
      if (props.currentPage - 1 < 1) {
        return;
      }
      emit('update:currentPage', props.currentPage - 1);
    };

    const jumpToNextPage = () => {
      if (props.currentPage + 1 > props.totalPageNumber) {
        return;
      }
      emit('update:currentPage', props.currentPage + 1);
    };

    return {
      jumpToPrevPage,
      jumpToNextPage,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/components/common/TextButton.scss';

.pagination-control {
  display: flex;
  justify-content: space-around;
  width: 100%;

  &__jump-button {
    @include text-button;
  }
}
</style>