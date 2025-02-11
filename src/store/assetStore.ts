import { defineStore } from "pinia";
import {
  fetchAssets,
  fetchAssetsByType,
  fetchAssetsByAmenities,
  fetchAssetById,
  updateAsset,
  fetchAmenities,
  fetchTypes,
} from "@services";
import type { Asset, AssetApi, AssetType, AssetWithType } from "@types";
import { ref } from "vue";
import { mapAssets, mapTypes } from "@utils";

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
    isLoading.value.push("Assets");
    hasError.value = false;
    const assetData = await fetchAssets(
      page.value,
      LIMIT_PER_PAGE,
      selectedType.value.id,
      selectedAmenities.value
    ).catch(() => (hasError.value = true));
    isLoading.value = isLoading.value.filter((item) => item !== "Assets");
    assets.value = mapAssets(assetData.data);
    lastPage.value = assetData.meta.last_page;
  }

  async function loadAssetById(uuid: string) {
    const currentAssetData = await fetchAssetById(uuid);
    currentAsset.value = currentAssetData.data;
  }

  async function saveAsset(uuid: string, data: AssetWithType) {
    await updateAsset(uuid, data);
    await loadAssets();
  }

  async function loadTypes() {
    isLoading.value.push("Types");
    const typesData = await fetchTypes().catch(() => (hasError.value = true));
    isLoading.value = isLoading.value.filter((item) => item !== "Types");
    types.value = mapTypes(typesData.data);
  }

  async function loadAmenities() {
    isLoading.value.push("Amenities");
    const amenitiesData = await fetchAmenities().catch(
      () => (hasError.value = true)
    );
    isLoading.value = isLoading.value.filter((item) => item !== "Amenities");
    amenities.value = amenitiesData.data;
  }

  function setIsModalOpen(value: boolean) {
    isModalOpen.value = value;
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
  };
});
