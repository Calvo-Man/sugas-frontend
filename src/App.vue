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
  background: rgb(245, 248, 245) !important;
}
</style>
