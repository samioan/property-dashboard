import { defineStore } from "pinia";
import {
  fetchAssets,
  fetchAssetById,
  updateAsset,
  fetchAmenities,
  fetchTypes,
} from "@/services";
import type { Asset, AssetApi, AssetType, AssetWithType } from "@/types";
import { ref } from "vue";
import { mapAssets, mapTypes } from "@/utils";
import { LoadingStates } from "@/enums";

export const useAssetStore = defineStore("assetStore", () => {
  const LIMIT_PER_PAGE = 30;

  const assets = ref<Asset[]>([]);
  const currentAsset = ref<AssetApi>();
  const types = ref<AssetType[]>([]);
  const amenities = ref<string[]>([]);
  const selectedType = ref<AssetType>({ id: 0, uuid: "0", name: "None" });
  const selectedAmenities = ref<string[]>([]);
  const page = ref<number>(1);
  const lastPage = ref<number>(2);
  const isModalOpen = ref(false);
  const isLoading = ref<string[]>([]);
  const hasError = ref(false);

  async function loadAssets() {
    isLoading.value.push(LoadingStates.ASSETS);
    hasError.value = false;
    const assetData = await fetchAssets(
      page.value,
      LIMIT_PER_PAGE,
      selectedType.value.id,
      selectedAmenities.value
    ).catch(() => (hasError.value = true));
    isLoading.value = isLoading.value.filter(
      (item) => item !== LoadingStates.ASSETS
    );
    assets.value = mapAssets(assetData.data);
    lastPage.value = assetData.meta.last_page;
  }

  async function loadAssetById(uuid: string) {
    const currentAssetData = await fetchAssetById(uuid);
    currentAsset.value = {
      ...currentAssetData.data,
      available_from: currentAssetData.data.available_from.split("T")[0],
    };
  }

  async function saveAsset(uuid: string, data: AssetWithType) {
    await updateAsset(uuid, data);
    await loadAssets();
  }

  async function loadTypes() {
    if (types.value.length) return;
    isLoading.value.push(LoadingStates.TYPES);
    const typesData = await fetchTypes().catch(() => (hasError.value = true));
    isLoading.value = isLoading.value.filter(
      (item) => item !== LoadingStates.TYPES
    );
    types.value = mapTypes(typesData.data);
  }

  async function loadAmenities() {
    if (amenities.value.length) return;
    isLoading.value.push(LoadingStates.AMENITIES);
    const amenitiesData = await fetchAmenities().catch(
      () => (hasError.value = true)
    );
    isLoading.value = isLoading.value.filter(
      (item) => item !== LoadingStates.AMENITIES
    );
    amenities.value = amenitiesData.data;
  }

  function setIsModalOpen(value: boolean) {
    isModalOpen.value = value;
  }

  async function saveChanges() {
    await saveAsset(currentAsset.value?.uuid as string, {
      ...(currentAsset.value as AssetWithType),
      type_id: types.value.find(
        (item: AssetType) => item.name === currentAsset.value?.type.name
      )?.uuid as string,
    });
    setIsModalOpen(false);
  }

  function clearData() {
    assets.value = [];
    currentAsset.value = {} as AssetApi;
    selectedType.value = { id: 0, uuid: "0", name: "None" };
    selectedAmenities.value = [];
    page.value = 1;
    lastPage.value = 2;
    isModalOpen.value = false;
    isLoading.value = [];
    hasError.value = false;
  }

  return {
    assets,
    currentAsset,
    types,
    amenities,
    selectedType,
    selectedAmenities,
    page,
    lastPage,
    isModalOpen,
    isLoading,
    hasError,
    loadAssets,
    loadAssetById,
    saveAsset,
    loadTypes,
    loadAmenities,
    setIsModalOpen,
    clearData,
    saveChanges,
  };
});
