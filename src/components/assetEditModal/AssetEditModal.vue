<script setup lang="ts">
import { useAssetStore } from "@/store";
import type { AssetType } from "@/types";
import {
  AssetEditModalHeader,
  AssetEditModalBackground,
  AssetForm,
} from "@/components";

const store = useAssetStore();

const saveChanges = async () => {
  await store.saveAsset(store.currentAsset.uuid, {
    ...store.currentAsset,
    type_id: store.types.find(
      (item: AssetType) => item.name === store.currentAsset?.type.name
    )?.uuid,
  });
  store.setIsModalOpen(false);
};
</script>

<template>
  <AssetEditModalBackground>
    <div
      class="overflow-y-auto overflow-x-hidden relative p-2 w-full max-w-lg max-h-full bg-black border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <AssetEditModalHeader :on-click="() => store.setIsModalOpen(false)" />

      <AssetForm
        :asset="store?.currentAsset"
        :on-submit="() => saveChanges()"
        :amenities="store?.amenities"
        :types="store?.types.slice(1)"
        label="Save"
      />
    </div>
  </AssetEditModalBackground>
</template>
