<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string[];
    label: string;
    options: string[];
    required?: boolean;
  }>(),
  {
    required: true,
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string[]): void;
}>();

const handleCheckboxChange = (value: string) => {
  const updatedValues = [...props.modelValue];
  if (updatedValues.includes(value)) {
    updatedValues.splice(updatedValues.indexOf(value), 1);
  } else {
    updatedValues.push(value);
  }
  emit("update:modelValue", updatedValues);
};
</script>

<template>
  <div class="w-full mb-6">
    <div class="flex flex-col space-y-2">
      <label class="text-sm font-medium text-gray-300">{{ label }}</label>
      <div class="flex flex-wrap gap-4 items-center justify-start">
        <div
          v-for="option in options"
          :key="option"
          class="flex items-center space-x-2"
        >
          <input
            type="checkbox"
            :value="option"
            :checked="modelValue.includes(option)"
            @change="handleCheckboxChange(option)"
            class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
          />
          <span class="text-sm text-gray-300">{{ option }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
