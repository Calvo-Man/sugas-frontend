<template>
  <div class="layout-wrapper layout-blank">
    <RouterView />
  </div>
</template>

<style>
.layout-wrapper.layout-blank {
  flex-direction: column;
}
@media screen and (min-width: 1367px) {
  .layout-wrapper.layout-blank {
    padding: 4rem;
  }
}
</style>
