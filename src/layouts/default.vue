<script setup>
import DefaultLayoutWithVerticalNav from './components/DefaultLayoutWithVerticalNav.vue'
</script>

<template>
  <DefaultLayoutWithVerticalNav class="app-color">
    <RouterView />
  </DefaultLayoutWithVerticalNav>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use '@layouts/styles/default-layout';
.background-linear {
  background: rgb(245, 245, 245) !important;

  // Color verde sofia plus rgb(94, 179, 25)
}
.navbar-side-color {
  background: rgb(219, 218, 218) !important;
}
.app-color {
  background: rgb(245, 248, 245) !important;
}
@media screen and (min-width: 1280px) {
  .app-color {
    background-image: url('./../public/logo-sena-azul.png') !important;
    background-repeat: no-repeat !important;
    background-position: 65% 60% !important;
    background-attachment: fixed !important;
    background-size: 40% !important;
  }
}
</style>
