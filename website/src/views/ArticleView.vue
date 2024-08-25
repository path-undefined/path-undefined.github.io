<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import markedKatex from "marked-katex-extension";
import "katex/dist/katex.min.css";
import hljs from "highlight.js";
import "highlight.js/styles/vs.min.css";
import type { Article } from "@/types/Article";
import { formatDateTime } from "@/services/DateTime";

const marked = new Marked();
marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight: (code, lang) => {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);
marked.use(
  markedKatex({
    throwOnError: false,
  }),
);

const props = defineProps<{
  contentPath: string;
}>();

const contentConfig = ref<Article | null>(null);

const contentTimeString = computed<string | null>(() => {
  const contentTime = contentConfig.value?.time;
  if (!contentTime) {
    return null;
  }
  return formatDateTime(contentTime);
});
const contentHtml = computed<string>(() => marked.parse(contentConfig.value?.content ?? "") as string);

watch(() => props.contentPath, async () => {
  const contentUrl = props.contentPath;
  const response = await fetch(contentUrl);

  if (!response.ok) {
    throw new Error("Cannot fetch content");
  }

  contentConfig.value = await response.json();
}, { immediate: true });
</script>

<template>
  <template v-if="contentConfig">
    <h1 class="article-title">
      {{ contentConfig.title }}
    </h1>

    <div class="article-metadata">
      <p>
        {{ contentTimeString }}
      </p>

      <p v-if="contentConfig.geolocation">
        <template v-if="contentConfig.geolocation.coord">
          <a :href="`https://www.openstreetmap.org/#map=19/${contentConfig.geolocation.coord.lat}/${contentConfig.geolocation.coord.long}`">
            {{ contentConfig.geolocation.name }}
          </a>
        </template>
        <template v-else>
          {{ contentConfig.geolocation.name }}
        </template>
      </p>
    </div>

    <img
      v-if="contentConfig.thumbnail"
      class="article-thumbnail"
      :src="contentConfig.thumbnail"
      alt=""
    >

    <p class="article-summary">
      {{ contentConfig.summary }}
    </p>

    <hr class="article-splitter">

    <!-- eslint-disable vue/no-v-html -->
    <div
      class="article-content"
      v-html="contentHtml"
    />
    <!-- eslint-enable vue/no-v-html -->
  </template>
</template>

<style scoped>
.article-metadata {
  margin: var(--margin-l) var(--margin-0);
}

.article-metadata > p {
  margin: var(--margin-0);
  font-size: var(--fs-content-s);
}

.article-thumbnail {
  display: block;
  margin: var(--margin-m) auto;
  width: 100%;
  aspect-ratio: 1/1;
  overflow: clip;
  object-fit: cover;
}

.article-summary {
  font-size: var(--fs-content-l);
}

.article-content {
  line-height: 1.66;
}

.article-content:deep(h1),
.article-content:deep(h5),
.article-content:deep(h6) {
  display: none;
}

.article-content:deep(p) {
  margin: var(--margin-l) var(--margin-0);
}

.article-content:deep(ul),
.article-content:deep(ol) {
  margin: var(--margin-l) var(--margin-0);
  padding-left: var(--padding-xl);
}

.article-content:deep(ul) {
  list-style: disc;
}

.article-content:deep(ol) {
  list-style: decimal;
}

.article-content:deep(code.hljs) {
  font-size: 1rem;
  line-height: 1.5;
}
</style>
