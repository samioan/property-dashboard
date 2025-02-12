<script setup lang="ts">
import { ref, watch, onMounted, computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchAssetById, updateAsset } from "@/services";
import type { AssetType, AssetWithType } from "@/types";
import { useAssetStore } from "@/store";
import { AssetForm, AppLoader, AppError, AppButton } from "@/components";

const route = useRoute();
const router = useRouter();
const store = useAssetStore();
const asset = ref<AssetWithType | null>(null);
const originalAsset = ref<AssetWithType | null>(null);
const hasChanges = ref(false);

const loadAsset = async () => {
  store.isLoading.push("Details");
  store.hasError = false;
  const uuid = route.params.uuid as string;
  const assetData = await fetchAssetById(uuid).catch(() => {
    store.hasError = true;
    store.isLoading = store.isLoading.filter(
      (item: string) => item !== "Details"
    );
  });
  asset.value = {
    ...assetData.data,
    available_from: assetData.data.available_from.split("T")[0],
  };
  originalAsset.value = { ...(asset.value as AssetWithType) };
  store.isLoading = store.isLoading.filter(
    (item: string) => item !== "Details"
  );
};

watch(
  asset,
  (newValue) => {
    if (originalAsset.value) {
      console.log(
        JSON.stringify(newValue),
        JSON.stringify(originalAsset.value),
        JSON.stringify(newValue) !== JSON.stringify(originalAsset.value)
      );
      // hasChanges.value =
      //   JSON.stringify(newValue) !== JSON.stringify(originalAsset.value);
    }
  },
  { deep: true }
);

const selectedTypeId = computed(
  () =>
    store.types.find((item: AssetType) => item.name === asset.value?.type?.name)
      ?.uuid
);

const saveChanges = async () => {
  if (asset.value) {
    await updateAsset(asset.value?.uuid as string, {
      ...(asset.value as AssetWithType),
      type_id: selectedTypeId.value as string,
      available_from: new Date(asset.value.available_from)
        .toISOString()
        .split("T")[0]
        .split("/")
        .reverse()
        .join("-"),
    });
    originalAsset.value = { ...asset.value };
  }
  loadAsset();
};

onMounted(() => {
  loadAsset();
  store.loadTypes();
  store.loadAmenities();
});

onUnmounted(() => store.clearData());
</script>

<template>
  <div>
    <h1
      class="my-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
    >
      Asset Details
    </h1>
    <div class="flex justify-center mb-8">
      <AppButton
        :on-click="
          () => {
            router.push({
              path: `/`,
            });
          }
        "
        >Home</AppButton
      >
    </div>
    <AppLoader v-if="store.isLoading.length" />
    <AppError
      v-else-if="store.hasError || !asset"
      :on-click="
        () => {
          loadAsset();
          store.loadTypes();
          store.loadAmenities();
        }
      "
    />
    <div class="flex justify-center" v-else-if="asset">
      <div
        class="relative p-2 w-full max-w-2xl max-h-full bg-black border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <AssetForm
          :asset="asset"
          :on-submit="() => saveChanges()"
          :amenities="store?.amenities"
          :types="store?.types.slice(1)"
          :disabled="hasChanges"
          label="Save Changes"
        />
      </div>
    </div>
  </div>
</template>
