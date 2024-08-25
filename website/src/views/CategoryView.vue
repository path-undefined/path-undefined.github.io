<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
import type { Category } from "@/types/Category";
import { formatDateTime } from "@/services/DateTime";

const props = defineProps<{
  contentPath: string;
}>();

const contentConfig = ref<Category | null>(null);

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
    <h1 class="category-title">
      {{ contentConfig.title }}
    </h1>

    <p class="category-summary">
      {{ contentConfig.introduction }}
    </p>

    <hr class="category-splitter">

    <ul class="category-article-list">
      <li
        v-for="article of contentConfig.articles"
        :key="article.key"
        class="category-article-item"
      >
        <div class="category-article-title">
          <router-link :to="`${contentConfig.path}/${article.key}`">
            {{ article.title }}
          </router-link>
        </div>
        <p class="category-article-metadata">
          {{ formatDateTime(article.time) }}
          <template v-if="article.geolocation">
            :: {{ article.geolocation.name }}
          </template>
        </p>
        <p class="category-article-summary">
          {{ article.summary }}
        </p>
      </li>
    </ul>
  </template>
</template>

<style scoped>
.category-summary {
  font-size: var(--fs-content-l);
}

.category-article-list {
  padding: var(--padding-0);
  list-style: none;
}

.category-article-item {
  margin: var(--margin-xl) var(--margin-0);
}

.category-article-title {
  font-size: var(--fs-content-l);
  font-weight: var(--fw-bold);
}

.category-article-metadata {
  margin: var(--margin-s) var(--margin-0);
  font-size: var(--fs-content-s);
}

.category-article-summary {
  margin: var(--margin-m) var(--margin-0);
}
</style>
