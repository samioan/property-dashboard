<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { createAsset } from "../services/apiService";
import { useAssetStore } from "@store";
import { AppButton, AssetEditModalLabel } from "@components";

const router = useRouter();
const store = useAssetStore();
const form = ref({
  title: "",
  available_from: Date.now(),
  amenities: [],
  street: "",
  street_number: "",
  postal_code: "",
  floor: 0,
  bathrooms: 0,
  bedrooms: 0,
  price: 0,
  type: {},
  size: 0,
  description: "",
});
const descriptionError = ref("");
const bathroomsError = ref("");
const availableFromError = ref("");
const errorMessage = ref("");
const isSubmitting = ref(false);

const validateForm = () => {
  let isValid = true;

  if (
    form.value.description.length < 50 ||
    form.value.description.length > 500
  ) {
    descriptionError.value =
      "Description must be between 50 and 500 characters.";
    isValid = false;
  } else {
    descriptionError.value = "";
  }

  if (form.value.bathrooms < 0 || form.value.bathrooms > 10) {
    bathroomsError.value = "Bathrooms must be between 0 and 10.";
    isValid = false;
  } else {
    bathroomsError.value = "";
  }

  const today = new Date();
  const availableFromDate = new Date(form.value.available_from);
  if (availableFromDate <= today) {
    availableFromError.value = "Available from date must be in the future.";
    isValid = false;
  } else {
    availableFromError.value = "";
  }

  return isValid;
};

const submitForm = async () => {
  // if (!validateForm()) return;

  isSubmitting.value = true;
  errorMessage.value = "";

  await createAsset({
    ...form.value,
    type_id: store.types.find((item) => item.name === form.value.type.name)
      .uuid,
  }).catch((error) => {
    errorMessage.value = "Failed to create asset. Please try again.";
  });

  router.go(-1);
  isSubmitting.value = false;
};

onMounted(() => {
  store.loadTypes();
  store.loadAmenities();
});
</script>

<template>
  <div>
    <h1
      class="mt-4 mb-8 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
    >
      Create a New Asset
    </h1>

    <div class="flex justify-center">
      <div
        class="relative p-2 w-full max-w-2xl max-h-full bg-black border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <form @submit.prevent="submitForm" class="p-4 pt-8">
          <div class="relative z-0 w-full mb-5 group">
            <input
              v-model="form.title"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <AssetEditModalLabel>Title</AssetEditModalLabel>
          </div>

          <div class="relative z-0 w-full mb-5 group">
            <input
              type="date"
              v-model="form.available_from"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <AssetEditModalLabel>Available from</AssetEditModalLabel>
          </div>

          <div class="relative z-0 w-full mb-5 group">
            <select
              multiple
              v-model="form.amenities"
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
                v-model="form.street"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <AssetEditModalLabel>Street</AssetEditModalLabel>
            </div>

            <div class="relative z-0 w-full mb-5 group">
              <input
                v-model="form.street_number"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <AssetEditModalLabel>Street Number</AssetEditModalLabel>
            </div>

            <div class="relative z-0 w-full mb-5 group">
              <input
                v-model="form.postal_code"
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
                v-model="form.floor"
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
                v-model="form.bathrooms"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <AssetEditModalLabel>Bathrooms</AssetEditModalLabel>
            </div>

            <div class="relative z-0 w-full mb-5 group">
              <input
                type="number"
                v-model="form.bedrooms"
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
                v-model="form.price"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <AssetEditModalLabel>Price</AssetEditModalLabel>
            </div>

            <div class="relative z-0 w-full mb-5 group">
              <select
                v-model="form.type.name"
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
                v-model="form.size"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <AssetEditModalLabel>Size</AssetEditModalLabel>
            </div>
          </div>

          <div class="relative z-0 w-full mb-5 group">
            <textarea
              v-model="form.description"
              maxlength="500"
              minlength="50"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <AssetEditModalLabel>Description</AssetEditModalLabel>
          </div>

          <AppButton type="submit" :disabled="isSubmitting"
            >Create Asset</AppButton
          >
        </form>
      </div>
    </div>
  </div>
</template>
