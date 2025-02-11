<script setup lang="ts">
import { useAssetStore } from "@store";
import {
  AppButton,
  AssetEditModalHeader,
  AssetEditModalBackground,
  AssetEditModalLabel,
} from "@components";

const store = useAssetStore();

const saveChanges = async () => {
  await store.saveAsset(store.currentAsset.uuid, {
    ...store.currentAsset,
    type_id: store.currentAsset.type.uuid,
  });
  store.setIsModalOpen(false);
};
</script>

<template>
  <AssetEditModalBackground>
    <div
      class="relative p-2 w-full max-w-lg max-h-full bg-black border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <AssetEditModalHeader :on-click="() => store.setIsModalOpen(false)" />

      <form @submit.prevent="saveChanges" class="p-4 pt-8">
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="store.currentAsset.title"
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
              new Date(store.currentAsset.available_from)
                .toISOString()
                .split('T')[0]
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
            v-model="store.currentAsset.amenities"
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
              v-model="store.currentAsset.street"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <AssetEditModalLabel>Street</AssetEditModalLabel>
          </div>

          <div class="relative z-0 w-full mb-5 group">
            <input
              v-model="store.currentAsset.street_number"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <AssetEditModalLabel>Street Number</AssetEditModalLabel>
          </div>

          <div class="relative z-0 w-full mb-5 group">
            <input
              v-model="store.currentAsset.postal_code"
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
              v-model="store.currentAsset.floor"
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
              v-model="store.currentAsset.bathrooms"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <AssetEditModalLabel>Bathrooms</AssetEditModalLabel>
          </div>

          <div class="relative z-0 w-full mb-5 group">
            <input
              type="number"
              v-model="store.currentAsset.bedrooms"
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
              v-model="store.currentAsset.price"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <AssetEditModalLabel>Price</AssetEditModalLabel>
          </div>

          <div class="relative z-0 w-full mb-5 group">
            <select
              v-model="store.currentAsset.type.name"
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
              v-model="store.currentAsset.size"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <AssetEditModalLabel>Size</AssetEditModalLabel>
          </div>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <textarea
            v-model="store.currentAsset.description"
            maxlength="500"
            minlength="50"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <AssetEditModalLabel>Description</AssetEditModalLabel>
        </div>

        <AppButton type="submit">Save</AppButton>
      </form>
    </div>
  </AssetEditModalBackground>
</template>
