<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <main class="bg-slate-900 flex flex-col justify-center items-center min-h-screen">
  <div class="container mx-auto px-4"></div>
    <h1 class="text-9xl text-center text-white">404</h1>
    <h2 class="text-center text-gray-700 text-2xl">There is nothing here.</h2>
    <RouterLink class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded my-2" to="/">Go Home</RouterLink>
  </main>
</template>
