<template>
  <component
    class="list-block"
    :is="listTag"
  >
  <li
    class="list-block__item"
    v-for="(item, index) in blockConfig.items"
    :key="index"
  >
    <template v-if="isSubList(item)">
      {{ i18n(item.text) }}
      <ListBlock :blockConfig="item" />
    </template>

    <template v-else>
      {{ i18n(item) }}
    </template>
  </li>

  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import { useI18n } from '@/services/I18n';
import { useGlobalState } from '@/services/GlobalState';

import type { PropType } from 'vue';
import type { ArticleListBlockConfig } from '@/types/ArticleConfig.types';
import type { I18nContent } from '@/types/I18n.types';
import type { ArticleListBlockSubListConfig } from '@/types/ArticleConfig.types';

export default defineComponent({

  props: {
    blockConfig: {
      type: Object as PropType<ArticleListBlockConfig | ArticleListBlockSubListConfig>,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();
    const globalState = useGlobalState(route);
    const i18n = useI18n(globalState);

    const listTag = computed(() => props.blockConfig.variant === 'ordered' ? 'ol' : 'ul');

    function isSubList(item: I18nContent<string> |
      ArticleListBlockSubListConfig): item is ArticleListBlockSubListConfig {
      return ('text' in item) && ('variant' in item) && ('items' in item);
    }

    return {
      i18n,
      listTag,
      isSubList,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/Tokens.scss';

.list-block {
  padding-left: spacing(5);
}
</style>