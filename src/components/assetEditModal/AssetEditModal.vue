<script setup lang="ts">
import type { AssetType, AssetWithType } from "@/types";
import {
  AssetEditModalHeader,
  AssetEditModalBackground,
  AssetForm,
} from "@/components";
import { computed } from "vue";

const props = defineProps<{
  onCloseModal: () => void;
  asset: AssetWithType;
  onSubmit: () => void;
  amenities: string[];
  types: AssetType[];
  label: string;
}>();

const assetFormProps = computed(() => ({
  asset: props.asset,
  onSubmit: props.onSubmit,
  amenities: props.amenities,
  types: props.types,
  label: props.label,
}));
</script>

<template>
  <AssetEditModalBackground>
    <div
      class="overflow-y-auto overflow-x-hidden relative p-2 w-full max-w-lg max-h-full bg-black border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <AssetEditModalHeader :on-click="onCloseModal" />
      <AssetForm v-bind="assetFormProps" />
    </div>
  </AssetEditModalBackground>
</template>
