<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchAssetById, updateAsset } from "@services";
import { Asset } from "@types";
import { useAssetStore } from "@store";
import { AppButton, AssetEditModalLabel } from "@components";

const route = useRoute();
const store = useAssetStore();
const asset = ref<Asset | null>(null);
const originalAsset = ref<Asset | null>(null);
const hasChanges = ref(false);

const loadAsset = async () => {
  const uuid = route.params.uuid as string;
  const assetData = await fetchAssetById(uuid);
  asset.value = assetData.data;
  originalAsset.value = { ...asset.value };
};

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

const saveChanges = async () => {
  if (asset.value) {
    await updateAsset(asset.value.uuid, {
      ...asset.value,
      type_id: store.types.find((item) => item.name === asset.value.type.name)
        .uuid,
    });
    originalAsset.value = { ...asset.value };
  }
};

onMounted(() => {
  loadAsset();
  store.loadTypes();
  store.loadAmenities();
});
</script>

<template>
  <div>
    <h1
      class="mt-4 mb-8 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
    >
      Asset Details
    </h1>
    <div class="flex justify-center">
      <div
        v-if="asset"
        class="relative p-2 w-full max-w-2xl max-h-full bg-black border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <form @submit.prevent="saveChanges" class="p-4 pt-8">
          <div class="relative z-0 w-full mb-5 group">
            <input
              v-model="asset.title"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <AssetEditModalLabel>Title</AssetEditModalLabel>
          </div>

          <div class="relative z-0 w-full mb-5 group">
            <input
              type="date"
              v-model="
                new Date(asset.available_from).toISOString().split('T')[0]
              "
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <AssetEditModalLabel>Available from</AssetEditModalLabel>
          </div>

          <div class="relative z-0 w-full mb-5 group">
            <select
              multiple
              v-model="asset.amenities"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            >
              <option
                v-for="amenity in store.amenities"
                :key="amenity"
                :value="amenity"
              >
                {{ amenity }}
              </option>
            </select>
            <AssetEditModalLabel>Amenities</AssetEditModalLabel>
          </div>

          <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
              <input
                v-model="asset.street"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <AssetEditModalLabel>Street</AssetEditModalLabel>
            </div>

            <div class="relative z-0 w-full mb-5 group">
              <input
                v-model="asset.street_number"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <AssetEditModalLabel>Street Number</AssetEditModalLabel>
            </div>

            <div class="relative z-0 w-full mb-5 group">
              <input
                v-model="asset.postal_code"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <AssetEditModalLabel>Postal Code</AssetEditModalLabel>
            </div>
          </div>

          <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="number"
                v-model="asset.floor"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <AssetEditModalLabel>Floor</AssetEditModalLabel>
            </div>

            <div class="relative z-0 w-full mb-5 group">
              <input
                type="number"
                min="0"
                max="10"
                v-model="asset.bathrooms"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <AssetEditModalLabel>Bathrooms</AssetEditModalLabel>
            </div>

            <div class="relative z-0 w-full mb-5 group">
              <input
                type="number"
                v-model="asset.bedrooms"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <AssetEditModalLabel>Bedrooms</AssetEditModalLabel>
            </div>
          </div>

          <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="number"
                v-model="asset.price"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <AssetEditModalLabel>Price</AssetEditModalLabel>
            </div>

            <div class="relative z-0 w-full mb-5 group">
              <select
                v-model="asset.type.name"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              >
                <option
                  class="bg-gray-700"
                  v-for="type in store.types.slice(1)"
                  :key="type"
                  :value="type.name"
                >
                  {{ type.name }}
                </option>
              </select>
              <AssetEditModalLabel>Type</AssetEditModalLabel>
            </div>

            <div class="relative z-0 w-full mb-5 group">
              <input
                type="number"
                v-model="asset.size"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <AssetEditModalLabel>Size</AssetEditModalLabel>
            </div>
          </div>

          <div class="relative z-0 w-full mb-5 group">
            <textarea
              v-model="asset.description"
              maxlength="500"
              minlength="50"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <AssetEditModalLabel>Description</AssetEditModalLabel>
          </div>

          <AppButton type="submit" :disabled="!hasChanges">Save</AppButton>
        </form>
      </div>

      <div v-else>
        <p>Loading asset details...</p>
      </div>
    </div>
  </div>
</template>
