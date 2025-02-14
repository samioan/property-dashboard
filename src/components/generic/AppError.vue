<script setup lang="ts">
defineProps<{
  onClick: () => void;
}>();
</script>

<template>
  <div class="m-screen flex justify-center items-center">
    <div
      id="alert-additional-content-2"
      class="p-4 mb-4 border rounded-lg bg-gray-800 text-red-400 border-red-800 max-w-lg"
      role="alert"
    >
      <div class="flex items-center">
        <svg
          class="shrink-0 w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
          />
        </svg>
        <span class="sr-only">Info</span>
        <h3 class="text-lg font-medium">Oops!</h3>
      </div>
      <div class="mt-2 mb-4 text-sm">
        Something went wrong during your request.
      </div>
      <div class="flex">
        <button
          @click="onClick"
          type="button"
          class="cursor-pointer text-white font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
        >
          Try again
        </button>
      </div>
    </div>
  </div>
</template>
