<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import { createAsset } from "@/services";
import { useAssetStore } from "@/store";
import { AssetForm, AppButton, PageTitle } from "@/components";
import type { AssetApi, AssetType } from "@/types";
import {
  transformFormData,
  keepOriginalTypes,
  setMinDate,
  goToHomePage,
} from "@/utils";

const router = useRouter();
const store = useAssetStore();

const errorMessage = ref("");
const isSubmitting = ref(false);
const form = ref<AssetApi>({
  title: "",
  available_from: "",
  amenities: [],
  street: "",
  street_number: "",
  postal_code: "",
  floor: 0,
  bathrooms: 0,
  bedrooms: 0,
  price: "0",
  type: { name: "Apartment" } as AssetType,
  size: 0,
  description: "",
});

const assetFormProps = computed(() => ({
  asset: form.value,
  onSubmit: () => submitForm(),
  amenities: store?.amenities,
  types: keepOriginalTypes(store?.types),
  label: "Create Asset",
  disabled: isSubmitting.value,
  minDate: setMinDate(),
}));

async function submitForm() {
  isSubmitting.value = true;
  errorMessage.value = "";

  await createAsset(transformFormData(form.value, store.types))
    .then(() => {
      router.go(-1);
    })
    .catch((error) => {
      errorMessage.value = error.response.data.message;
    });

  isSubmitting.value = false;
}

onMounted(() => {
  store.loadTypes();
  store.loadAmenities();
});

onUnmounted(() => store.clearData());
</script>

<template>
  <div>
    <PageTitle>Create a New Asset</PageTitle>
    <div class="flex justify-center mb-8">
      <AppButton :on-click="() => goToHomePage(router)">Home</AppButton>
    </div>
    <div class="flex justify-center">
      <div
        class="relative p-2 w-full max-w-2xl max-h-full border rounded-xl shadow-sm bg-gray-800 border-gray-700"
      >
        <AssetForm v-bind="assetFormProps" />
        <p class="text-center text-red-400" v-if="errorMessage">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </div>
</template>
