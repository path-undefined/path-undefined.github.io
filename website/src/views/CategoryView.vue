<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { RouterLink } from "vue-router";
import type { Category } from "@/types/Category";
import { formatDateTime } from "@/services/DateTime";

const props = defineProps<{
  contentPath: string;
}>();

const contentConfig = ref<Category | null>(null);

onBeforeMount(async () => {
  const contentUrl = props.contentPath;
  const response = await fetch(contentUrl);

  if (!response.ok) {
    throw new Error("Cannot fetch content");
  }

  contentConfig.value = await response.json();
});
</script>

<template>
  <template v-if="contentConfig">
    <h1 class="fs-headline-1 m-h-std">
      {{ contentConfig.title }}
    </h1>

    <p class="fs-content-lg m-h-lg">
      {{ contentConfig.introduction }}
    </p>

    <hr class="m-h-lg">

    <ul class="m-h-lg p-v-std">
      <li
        v-for="article of contentConfig.articles"
        :key="article.key"
        class="m-h-lg"
      >
        <div class="fs-content-lg m-h-sm">
          <router-link
            class="fmod-bold"
            :to="`${contentConfig.path}/${article.key}`"
          >
            {{ article.title }}
          </router-link>
        </div>
        <div class="fs-content-sm m-h-sm">
          {{ formatDateTime(article.time) }}
          <template v-if="article.geolocation">
            :: {{ article.geolocation.name }}
          </template>
        </div>
        <p class="m-h-sm">
          {{ article.summary }}
        </p>
      </li>
    </ul>
  </template>
</template>
