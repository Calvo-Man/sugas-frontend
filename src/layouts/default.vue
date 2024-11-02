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
  background: rgb(245, 245, 245) !important;

  // Color verde sofia plus rgb(94, 179, 25)
}
.navbar-side-color {
  background: rgb(219, 218, 218) !important;
}
</style>
