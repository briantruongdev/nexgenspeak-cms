<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="flex justify-between items-center bg-white px-4 mx-6 mt-6 rounded-lg">
    <img src="/images/logo.png" alt="Logo" class="cursor-pointer h-20" @click="router.push('/')" />
  </div>
</template>

<style scoped></style>
