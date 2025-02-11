<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";

import {
  AssetList,
  AssetEditModal,
  AppButton,
  AssetFilters,
  AppLoader,
  AppError,
} from "@components";
import { useRoute, useRouter } from "vue-router";
import { useAssetStore } from "@store";

const store = useAssetStore();
const route = useRoute();
const router = useRouter();

watch(
  () => route.query,
  () => {
    store.page = Number(route.params.page);
    if (!!route.query.typeId) store.selectedType.id = route.query.typeId;
    if (!!route.query.amenities?.length)
      store.selectedAmenities = route.query.amenities;
    store.loadAssets();
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  store.loadTypes();
  store.loadAmenities();
});
</script>

<template>
  <AppLoader v-if="store.isLoading.length" />
  <AppError
    v-else-if="store.hasError"
    :on-click="
      () => {
        store.loadAssets();
        store.loadTypes();
        store.loadAmenities();
      }
    "
  />
  <div v-else>
    <h1
      class="my-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
    >
      Assets List
    </h1>
    <AssetFilters />
    <div class="flex flex-wrap items-center justify-center m-auto gap-2">
      <AppButton
        :disabled="store.page === 1"
        :on-click="
          () => {
            router.push({
              path: `/listings/page/${store.page - 1}`,
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
        >Previous Page</AppButton
      >

      <AppButton
        :disabled="store.page === store.lastPage"
        :on-click="
          () => {
            router.push({
              path: `/listings/page/${store.page + 1}`,
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
      >
        Next Page</AppButton
      >
    </div>

    <AssetList
      :assets="store.assets"
      :on-click="
        (id) => {
          store.loadAssetById(id);
          store.setIsModalOpen(true);
        }
      "
    />
    <AssetEditModal v-if="store.isModalOpen" />
  </div>
</template>
