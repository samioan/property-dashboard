<script setup lang="ts">
import { ref, watch, onMounted, computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchAssetById, updateAsset } from "@/services";
import type { AssetApi, AssetType, AssetWithType } from "@/types";
import { useAssetStore } from "@/store";
import {
  AssetForm,
  AppLoader,
  AppError,
  AppButton,
  PageTitle,
} from "@/components";
import {
  transformAssetData,
  transformSavedData,
  goToHomePage,
  keepOriginalTypes,
} from "@/utils";
import { LoadingStates } from "@/enums";

const route = useRoute();
const router = useRouter();
const store = useAssetStore();

const asset = ref<AssetWithType | null>(null);
const originalAsset = ref<AssetWithType | null>(null);
const hasChanges = ref(false);
const selectedTypeId = computed(
  () =>
    store.types.find((item: AssetType) => item.name === asset.value?.type?.name)
      ?.uuid
);
const assetFormProps = computed(() => ({
  asset: asset.value as AssetWithType,
  onSubmit: saveChanges,
  amenities: store?.amenities,
  types: keepOriginalTypes(store?.types),
  disabled: !hasChanges.value,
  label: "Save Changes",
}));

async function loadAsset() {
  store.isLoading.push(LoadingStates.DETAILS);
  store.hasError = false;
  const uuid = route.params.uuid as string;
  const assetData = await fetchAssetById(uuid).catch(() => {
    store.hasError = true;
    store.isLoading = store.isLoading.filter(
      (item: string) => item !== LoadingStates.DETAILS
    );
  });
  asset.value = transformAssetData(assetData.data) as unknown as AssetApi;
  originalAsset.value = JSON.parse(JSON.stringify(asset.value));
  store.isLoading = store.isLoading.filter(
    (item: string) => item !== LoadingStates.DETAILS
  );
}

async function saveChanges() {
  if (asset.value) {
    await updateAsset(
      asset.value?.uuid as string,
      transformSavedData(asset.value, selectedTypeId.value as string)
    );
    originalAsset.value = { ...asset.value };
  }
  loadAsset();
}

function loadData() {
  loadAsset();
  store.loadTypes();
  store.loadAmenities();
}

watch(
  asset,
  (newValue) => {
    if (originalAsset.value) {
      hasChanges.value =
        JSON.stringify(newValue) !== JSON.stringify(originalAsset.value);
    }
  },
  { deep: true }
);

onMounted(() => loadData());
onUnmounted(() => store.clearData());
</script>

<template>
  <div>
    <PageTitle>Asset Details</PageTitle>
    <div class="flex justify-center mb-8">
      <AppButton :on-click="() => goToHomePage(router)">Home</AppButton>
    </div>
    <AppLoader v-if="store.isLoading.length" />
    <AppError
      v-else-if="store.hasError || !asset"
      :on-click="() => loadData()"
    />
    <div class="flex justify-center" v-else-if="asset">
      <div
        class="relative p-2 w-full max-w-2xl max-h-full bg-black border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <AssetForm v-bind="assetFormProps" />
      </div>
    </div>
  </div>
</template>
