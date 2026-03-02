<!-- Parent.vue -->
<script setup lang="ts">
const onBuy = (product: any) => {
  console.log('🚀 Mua sản phẩm:', product)
}
const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div>
    <UiChildComponent
      v-slot="{ product, onBuy: emitBuy }"
      @action-click="onBuy"
    >
      <div class="p-3 border mb-2 flex justify-between">
        <span>{{ product.name }}</span>
        <button @click="emitBuy()">
          Mua
        </button>
      </div>
    </UiChildComponent>
    <UIcon
      name="i-lucide-menu"
      class="size-5 hover:cursor-pointer z-50 relative"
      @click="toggleMenu"
    />

    <!-- MENU -->
    <div
      class="menu"
      :class="{ 'menu--open': isMenuOpen }"
    >
      <p class="text-white text-2xl font-bold p-4">
        Ngo Duc Canh
      </p>
    </div>
  </div>
</template>

<style scoped>
.menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: #ef4444;

  /* trạng thái đóng */
  transform: translateX(100%);
  transition: transform 0.4s ease-in-out;
  z-index: 40;
}

.menu--open {
  transform: translateX(0);
}
</style>
