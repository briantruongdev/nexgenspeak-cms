<script setup lang="ts"></script>

<template>
  <div class="h-screen flex w-screen">
    <TheSidebar />
    <div class="flex flex-col w-full h-screen overflow-hidden">
      <TheHeader />
      <div class="flex-1 overflow-y-auto">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
