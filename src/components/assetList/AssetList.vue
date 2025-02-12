<script setup lang="ts">
import type { Asset } from "@/types";
import { AssetListCard } from "@/components/assetList";

defineProps<{
  assets: Asset[];
  onClick: (id: string) => void;
}>();
</script>

<template>
  <div class="flex flex-wrap items-center justify-center m-auto gap-8 p-4">
    <AssetListCard
      v-if="assets.length"
      v-for="asset in assets"
      :key="asset.id"
      :asset="asset"
      :on-click="() => onClick(asset.id)"
    />
    <p
      v-else
      class="text-center text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 mb-4"
    >
      No results found!
    </p>
  </div>
</template>
