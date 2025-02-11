<script setup lang="ts">
import type { Asset } from "@types";
import { AssetListCardText, AppButton } from "@components";

defineProps<{
  asset: Asset;
  onClick: () => void;
}>();
</script>

<template>
  <div
    class="w-sm h-[400px] overflow-auto p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
  >
    <h5
      class="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      {{ asset?.entry }}. {{ asset?.title }}
    </h5>
    <AssetListCardText>
      <template #title>Type: </template>
      <template #text>{{ asset.type }}</template>
    </AssetListCardText>
    <AssetListCardText>
      <template #title>Size: </template>
      <template #text>{{ asset.size }}</template>
    </AssetListCardText>
    <AssetListCardText>
      <template #title>Address: </template>
      <template #text>{{ asset.address }}</template>
    </AssetListCardText>
    <AssetListCardText>
      <template #title>Description: </template>
      <template #text>{{ asset.description }}</template>
    </AssetListCardText>
    <AssetListCardText>
      <template #title>Created At: </template>
      <template #text>{{ asset.created }}</template>
    </AssetListCardText>
    <AssetListCardText>
      <template #title>Updated At: </template>
      <template #text>{{ asset.updated }}</template>
    </AssetListCardText>
    <AppButton :on-click="onClick" class="inline-flex items-center mt-2">
      Edit Asset
      <svg
        class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </AppButton>
  </div>
</template>
