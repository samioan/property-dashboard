<script setup lang="ts">
import { AssetFormLabel } from "@/components";

withDefaults(
  defineProps<{
    type?: string;
    modelValue: string | number;
    label: string;
    required?: boolean;
    min?: string;
    max?: string;
  }>(),
  {
    required: true,
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <div class="relative z-0 w-full mb-5 group">
    <input
      :type="type"
      :min="min"
      :max="max"
      :value="modelValue"
      @input="
        emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
      class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
      placeholder=" "
      :required="required"
    />
    <AssetFormLabel> {{ label }}</AssetFormLabel>
  </div>
</template>
