<script setup lang="ts">
import { AppButton, AssetFormCheckbox } from "@/components";
import { useAssetStore } from "@/store";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useAssetStore();
</script>

<template>
  <div class="p-6 flex flex-wrap justify-center gap-4 max-w-lg m-auto">
    <select
      v-model="store.selectedType"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option v-for="type in store.types" :key="type.id" :value="type">
        {{ type.name }}
      </option>
    </select>

    <AssetFormCheckbox
      v-model="store.selectedAmenities"
      label="Amenities"
      :options="store.amenities"
    />

    <AppButton
      :disabled="!store.selectedType"
      class="h-[40px] w-full whitespace-nowrap"
      :on-click="
        () => {
          router.push({
            path: `/listings/page/${store.page}`,
            query: {
              ...(store.selectedType?.id
                ? { typeId: store.selectedType.id }
                : {}),
              ...(!!store.selectedAmenities?.length
                ? { amenities: store.selectedAmenities }
                : {}),
            },
          });
        }
      "
      >Filter Results</AppButton
    >
  </div>
</template>
