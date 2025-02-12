<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { createAsset } from "@/services";
import { useAssetStore } from "@/store";
import { AssetForm, AppButton } from "@/components";
import type { AssetType } from "@/types";

const router = useRouter();
const store = useAssetStore();
const form = ref({
  title: "",
  available_from: `${Date.now()}`,
  amenities: [],
  street: "",
  street_number: "",
  postal_code: "",
  floor: 0,
  bathrooms: 0,
  bedrooms: 0,
  price: "0",
  type: {} as AssetType,
  size: 0,
  description: "",
});

const errorMessage = ref("");
const isSubmitting = ref(false);

const submitForm = async () => {
  isSubmitting.value = true;
  errorMessage.value = "";

  await createAsset({
    ...form.value,
    price: form.value.price.toString(),
    type_id: store.types.find(
      (item: AssetType) => item.name === form.value.type.name
    )?.uuid,
    available_from: new Date(form.value.available_from)
      .toISOString()
      .split("T")[0]
      .split("/")
      .reverse()
      .join("-"),
  })
    .then(() => {
      router.go(-1);
    })
    .catch((error) => {
      errorMessage.value = error.response.data.message;
    });

  isSubmitting.value = false;
};

onMounted(() => {
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
      Create a New Asset
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
    <div class="flex justify-center">
      <div
        class="relative p-2 w-full max-w-2xl max-h-full bg-black border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <AssetForm
          :asset="form"
          :on-submit="() => submitForm()"
          :amenities="store?.amenities"
          :types="store?.types.slice(1)"
          label="Create Asset"
          :disabled="isSubmitting"
        />
        <p class="text-center text-red-400" v-if="errorMessage">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </div>
</template>
