<script setup lang="ts">
defineProps<{
  onClick: () => void;
}>();
</script>

<template>
  <div
    class="flex items-center justify-between p-2 border-b rounded-t border-gray-600"
  >
    <h3 class="text-xl font-semibold text-white">Edit Asset</h3>
    <button
      @click="onClick"
      type="button"
      class="cursor-pointer text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
      data-modal-hide="default-modal"
    >
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span class="sr-only">Close modal</span>
    </button>
  </div>
</template>
