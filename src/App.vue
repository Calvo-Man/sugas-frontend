<script setup>
import UpgradeToPro from '@/components/UpgradeToPro.vue'
</script>

<template>
  <VApp class="app-color">
    <RouterView />
    <UpgradeToPro />
    <notifications />
  </VApp>
</template>

<style lang="scss">
.app-color {
  background-image: linear-gradient(to right, white 50%, rgb(79, 228, 79)) !important;
}
</style>
