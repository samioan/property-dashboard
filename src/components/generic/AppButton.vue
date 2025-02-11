<script setup lang="ts">
defineProps<{
  onClick?: () => void;
  isDisabled?: boolean;
}>();
</script>

<template>
  <button
    :disabled="isDisabled"
    @click="onClick"
    class="disabled:opacity-50 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  >
    <slot />
  </button>
</template>
