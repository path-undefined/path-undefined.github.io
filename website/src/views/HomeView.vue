<script setup lang="ts">
import { onMounted, ref } from "vue";

const text = "A path, which hasn't yet been taken, is undefined.";
const typeSpeedRange = [50, 200];
const cursorPos = ref<number>(0);
const typedText = ref<string>("");

onMounted(() => {
  typeOneCharacter();
});

const typeOneCharacter = () => {
  typedText.value += text[cursorPos.value];
  cursorPos.value += 1;

  if (cursorPos.value < text.length) {
    const nextCharacterTime = typeSpeedRange[0] + Math.random() * (typeSpeedRange[1] - typeSpeedRange[0]);
    setTimeout(() => {
      typeOneCharacter();
    }, nextCharacterTime);
  }
};
</script>

<template>
  <div class="typewritter">
    {{ typedText }}
  </div>
</template>

<style scoped>
.typewritter {
  min-height: 5.33em;
  text-align: center;
  font-size: 2.5em;
  font-weight: 600;
  line-height: 1.33;
}

@media (min-width:500px) {
  .typewritter {
    min-height: 4em;
    text-align: center;
    font-size: 4.5em;
    font-weight: 600;
    line-height: 1.33;
  }
}

.typewritter::after {
  color: orange;
  content: "|";
  animation: caret 1s steps(1) infinite;
}

@keyframes caret {
  50% {
    color: transparent;
  }
}
</style>
