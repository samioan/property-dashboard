<script setup lang="ts">
import { AppButton, AssetFormCheckbox } from "@/components";
import { useAssetStore } from "@/store";

import type { AssetType } from "@/types";

const store = useAssetStore();

defineProps<{
  types: AssetType[];
  amenities: string[];
  filterResults: () => void;
}>();
</script>

<template>
  <div class="p-6 flex flex-wrap justify-center gap-4 max-w-lg m-auto">
    <select
      v-model="store.selectedType"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option v-for="type in types" :key="type.id" :value="type">
        {{ type.name }}
      </option>
    </select>

    <AssetFormCheckbox
      v-model="store.selectedAmenities"
      label="Amenities"
      :options="amenities"
    />
    <AppButton
      class="h-[40px] w-full whitespace-nowrap"
      :on-click="filterResults"
      >Filter Results</AppButton
    >
  </div>
</template>
