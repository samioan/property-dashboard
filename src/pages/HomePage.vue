<script setup lang="ts">
import { AppButton, PageTitle } from "@/components";
import { ref } from "vue";

const uuid = ref("");
</script>

<template>
  <PageTitle>Welcome to Prosperty!</PageTitle>
  <p
    class="text-center text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400 mb-4"
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
        class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
        placeholder=" "
        required
      />
      <label
        class="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Asset Id</label
      >
    </div>

    <router-link :to="`/listings/${uuid}`">
      <AppButton :disabled="!uuid">View a Specific Asset</AppButton>
    </router-link>
  </div>
</template>
