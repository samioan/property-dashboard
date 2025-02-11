<script setup lang="ts">
import { AppButton } from "@components";
import { useAssetStore } from "@store";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const store = useAssetStore();
</script>

<template>
  <div class="p-6 flex flex-wrap justify-center gap-4">
    <div class="flex items-center gap-4">
      <select
        v-model="store.selectedType"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option v-for="type in store.types" :key="type" :value="type">
          {{ type.name }}
        </option>
      </select>

      <select
        v-model="store.selectedAmenities"
        multiple
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option
          v-for="amenity in store.amenities"
          :key="amenity"
          :value="amenity"
        >
          {{ amenity }}
        </option>
      </select>

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
  </div>
</template>
