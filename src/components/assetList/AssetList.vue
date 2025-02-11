<script setup lang="ts">
import type { Asset } from "@types";
import { AssetListCard } from "@components/assetList";

defineProps<{
  assets: Asset[];
  onClick: () => void;
}>();
</script>

<template>
  <div class="flex flex-wrap items-center justify-center m-auto gap-8 p-4">
    <AssetListCard
      v-for="asset in assets"
      :key="asset.id"
      :asset="asset"
      :on-click="() => onClick(asset.id)"
    />
  </div>
</template>
