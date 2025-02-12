<script setup lang="ts">
import {
  AppButton,
  AssetFormInput,
  AssetFormSelect,
  AssetFormTextarea,
  AssetFormCheckbox,
} from "@/components";
import type { AssetType, AssetWithType } from "@/types";

withDefaults(
  defineProps<{
    asset: AssetWithType;
    onSubmit: () => void;
    label: string;
    amenities: string[];
    types: AssetType[];
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);
</script>

<template>
  <form @submit.prevent="onSubmit" class="p-4 pt-8">
    <AssetFormInput v-model="asset.title" label="Title" />
    <AssetFormInput
      :min="new Date().toISOString().split('T')[0]"
      type="date"
      v-model="asset.available_from"
      label="Available from"
    />

    <AssetFormCheckbox
      v-model="asset.amenities"
      label="Amenities"
      :options="amenities"
    />

    <div class="grid md:grid-cols-3 md:gap-6">
      <AssetFormInput v-model="asset.street" label="Street" />
      <AssetFormInput v-model="asset.street_number" label="Street Number" />
      <AssetFormInput v-model="asset.postal_code" label="Postal Code" />
    </div>

    <div class="grid md:grid-cols-3 md:gap-6">
      <AssetFormInput
        type="number"
        min="0"
        v-model="asset.floor"
        label="Floor"
      />
      <AssetFormInput
        type="number"
        min="0"
        max="10"
        v-model="asset.bathrooms"
        label="Bathrooms"
      />
      <AssetFormInput
        type="number"
        min="0"
        v-model="asset.bedrooms"
        label="Bedrooms"
      />
    </div>

    <div class="grid md:grid-cols-3 md:gap-6">
      <AssetFormInput type="number" v-model="asset.price" label="Price" />

      <AssetFormSelect
        v-model="asset.type.name"
        :options="types"
        label="Type"
      />

      <AssetFormInput type="number" v-model="asset.size" label="Size" />
    </div>

    <AssetFormTextarea
      maxlength="500"
      minlength="50"
      v-model="asset.description"
      label="Description"
    />

    <AppButton type="submit" :disabled="disabled">{{ label }}</AppButton>
  </form>
</template>
