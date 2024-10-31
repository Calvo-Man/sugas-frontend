<script setup>
import DefaultLayoutWithVerticalNav from './components/DefaultLayoutWithVerticalNav.vue'
</script>

<template>
  <DefaultLayoutWithVerticalNav>
    <RouterView />
  </DefaultLayoutWithVerticalNav>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use '@layouts/styles/default-layout';
.background-linear {
  //background-image: linear-gradient(to left, rgb(246, 250, 248) 40%, rgb(79, 228, 79)) !important;
  background: rgb(79, 228, 79) !important;
}
.navbar-side-color {
  background: linear-gradient(to left, transparent 10%, rgb(79, 228, 79)) !important;
}
</style>
