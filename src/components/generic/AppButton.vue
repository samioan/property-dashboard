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
    class="disabled:opacity-50 cursor-pointer text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
  >
    <slot />
  </button>
</template>
