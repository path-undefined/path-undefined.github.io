<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  components: {
    RouterView,
  },
});
</script>
