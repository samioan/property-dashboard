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
      class="border t text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
