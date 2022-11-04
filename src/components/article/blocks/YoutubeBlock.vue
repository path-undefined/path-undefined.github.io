<template>
  <div class="youtube-block">
    <div
      class="youtube-block__iframe-container"
      :style="aspectRatioVars"
    >
      <iframe
        class="youtube-block__iframe"
        :src="`https://www.youtube-nocookie.com/embed/${blockConfig.videoId}?disablekb=1&modestbranding=1`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <p class="youtube-block__description">
      {{ i18n(blockConfig.description) }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useGlobalState } from '@/services/GlobalState';
import { useI18n } from '@/services/I18n';
import { useRoute } from 'vue-router';

import type { PropType } from 'vue';
import type { ArticleYoutubeBlockConfig } from '@/types/ArticleConfig.types';

export default defineComponent({
  props: {
    blockConfig: {
      type: Object as PropType<ArticleYoutubeBlockConfig>,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();
    const globalState = useGlobalState(route);
    const i18n = useI18n(globalState);

    const aspectRatioVars = {
      '--aspect-ratio-percentage': `${props.blockConfig.aspectRatio.height / props.blockConfig.aspectRatio.width * 100}%`,
    };

    return {
      i18n,
      aspectRatioVars,
    };
  },
});
</script>

<style lang="scss">
@import '@/styles/Tokens.scss';

.youtube-block {
  margin: spacing(4) 0;

  &__iframe-container {
    overflow: hidden;
    padding-top: var(--aspect-ratio-percentage);
    position: relative;
  }

  &__iframe {
    border: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &__description {
    @include typography-size-xs;
    width: 100%;
    text-align: center;
  }
}

</style>