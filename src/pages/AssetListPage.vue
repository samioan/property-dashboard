<script setup lang="ts">
import { onMounted, watch, onUnmounted, computed } from "vue";
import {
  AssetList,
  AssetEditModal,
  AppButton,
  AssetFilters,
  AppLoader,
  AppError,
  PageTitle,
} from "@/components";
import { goToHomePage, keepOriginalTypes } from "@/utils";
import { useRoute, useRouter } from "vue-router";
import { useAssetStore } from "@/store";
import type { AssetWithType } from "@/types";

const store = useAssetStore();
const route = useRoute();
const router = useRouter();

const modalProps = computed(() => ({
  onCloseModal: () => store.setIsModalOpen(false),
  asset: store?.currentAsset ?? ({} as AssetWithType),
  onSubmit: () => store.saveChanges(),
  amenities: store?.amenities,
  types: keepOriginalTypes(store?.types),
  label: "Save",
}));

const prevBtnProps = computed(() => ({
  disabled: store.page === 1,
  onClick: () => goToPage(store.page - 1),
}));

const nextBtnProps = computed(() => ({
  disabled: store.page === store.lastPage,
  onClick: () => goToPage(store.page + 1),
}));

const assetListProps = computed(() => ({
  assets: store.assets,
  onClick: async (id: string) => {
    await store.loadAssetById(id.toString());
    store.setIsModalOpen(true);
  },
}));

const assetFilterProps = computed(() => ({
  types: store.types,
  amenities: store.amenities,
  filterResults: () => filterResults(),
}));

function filterResults() {
  router.push({
    path: `/listings/page/${store.page}`,
    query: {
      ...(store.selectedType?.id ? { typeId: store.selectedType.id } : {}),
      ...(!!store.selectedAmenities?.length
        ? { amenities: store.selectedAmenities }
        : {}),
    },
  });
}

function reload() {
  store.loadAssets();
  store.loadTypes();
  store.loadAmenities();
}

function goToPage(page: number) {
  router.push({
    path: `/listings/page/${page}`,
    query: {
      ...(store.selectedType?.id ? { typeId: store.selectedType.id } : {}),
      ...(!!store.selectedAmenities?.length
        ? { amenities: store.selectedAmenities }
        : {}),
    },
  });
}

watch(
  () => route.query,
  () => {
    store.page = Number(route.params.page);
    if (!!route.query.typeId)
      store.selectedType.id = Number(route.query.typeId);
    if (!!route.query.amenities?.length)
      store.selectedAmenities = route.query.amenities as string[];
    store.loadAssets();
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  store.loadTypes();
  store.loadAmenities();
});

onUnmounted(() => store.clearData());

watch(
  () => store.isModalOpen,
  (isModalOpen) => {
    if (isModalOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }
);
</script>

<template>
  <div>
    <PageTitle>Assets List</PageTitle>
    <AppLoader v-if="store.isLoading.length" />
    <AppError v-else-if="store.hasError" :on-click="reload" />
    <div v-else>
      <AssetFilters v-bind="assetFilterProps" />
      <div class="flex flex-wrap items-center justify-center m-auto gap-2">
        <AppButton v-bind="prevBtnProps">Previous Page</AppButton>
        <AppButton v-bind="nextBtnProps"> Next Page</AppButton>
        <AppButton :on-click="() => goToHomePage(router)">Home</AppButton>
      </div>
      <AssetList v-bind="assetListProps" />
      <AssetEditModal v-if="store.isModalOpen" v-bind="modalProps" />
    </div>
  </div>
</template>
