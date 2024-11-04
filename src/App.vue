<script setup>
import UpgradeToPro from '@/components/UpgradeToPro.vue'
</script>

<template>
  <VApp>
    <RouterView />
    <UpgradeToPro />
    <notifications />
  </VApp>
</template>

<style lang="scss">
/* Personaliza el fondo de la barra de desplazamiento */
::-webkit-scrollbar {
  width: 12px; /* Ancho de la barra de scroll */
}

/* Personaliza el "track" o fondo sobre el que se desplaza */
::-webkit-scrollbar-track {
  background: #f1f1f1; /* Color de fondo del track */
}

/* Personaliza el "thumb" o control deslizante */
::-webkit-scrollbar-thumb {
  background: #888; /* Color del control */
}

/* Cambia el color del "thumb" cuando está en hover */
::-webkit-scrollbar-thumb:hover {
  background: #1298cd;
}

/* Cambia el color del "thumb" cuando se presiona */
::-webkit-scrollbar-thumb:active {
  background: #333;
}
</style>
