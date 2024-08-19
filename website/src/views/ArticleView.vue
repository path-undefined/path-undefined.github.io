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
    <h1 class="article-title fs-headline-1 m-h-std">
      {{ contentConfig.title }}
    </h1>

    <div class="article-metadata fs-content-sm m-h-lg">
      <p>
        {{ contentTimeString }}
      </p>

      <p v-if="contentConfig.geolocation">
        {{ contentConfig.geolocation.name }}
      </p>
    </div>

    <img
      v-if="contentConfig.thumbnail"
      class="article-thumbnail m-h-lg"
      :src="contentConfig.thumbnail"
    >

    <p class="article-summary fs-content-lg m-h-lg">
      {{ contentConfig.summary }}
    </p>

    <hr class="article-splitter m-h-lg">

    <!-- eslint-disable vue/no-v-html -->
    <div
      class="article-content"
      v-html="contentHtml"
    />
    <!-- eslint-enable vue/no-v-html -->
  </template>
</template>

<style scoped>
.article-thumbnail {
  display: block;
  width: 100%;
}

.article-content {
  line-height: 1.66;
}

.article-content:deep(h1),
.article-content:deep(h5),
.article-content:deep(h6) {
  display: none;
}

.article-content:deep(h4) {
  margin: 1em 0;
  font-size: 2em;
  line-height: 1;
}

.article-content:deep(h3) {
  margin: 1em 0;
  font-size: 2.5em;
  line-height: 1;
}

.article-content:deep(h2) {
  margin: 1em 0;
  font-size: 3em;
  line-height: 1;
}

.article-content:deep(p) {
  margin: 1.5em 0;
}

.article-content:deep(ul),
.article-content:deep(ol) {
  margin: 1.5em 0;
  padding-left: 3em;
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
