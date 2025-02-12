<script setup lang="ts">
import { AppButton } from "@/components";
import { ref } from "vue";

const uuid = ref("");
</script>

<template>
  <h1
    class="my-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
  >
    Welcome to Prosperty!
  </h1>
  <p
    class="text-center text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 mb-4"
  >
    Make Your Selection
  </p>

  <div class="flex flex-wrap items-center justify-center mx-auto gap-2 mb-8">
    <router-link :to="`/listings/page/1`">
      <AppButton>Assets List</AppButton>
    </router-link>

    <router-link :to="`/listings/create`">
      <AppButton>Create a New Asset</AppButton>
    </router-link>
  </div>

  <div class="flex flex-wrap items-baseline justify-center m-auto gap-2">
    <div class="relative z-0 w-full mb-5 group max-w-md">
      <input
        v-model="uuid"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Asset Id</label
      >
    </div>

    <router-link :to="`/listings/${uuid}`">
      <AppButton :disabled="!uuid">View a Specific Asset</AppButton>
    </router-link>
  </div>
</template>
