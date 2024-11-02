<script setup>
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <!-- 👉 Dashboards -->

  <!-- 👉 Front Pages -->

  <VerticalNavGroup
    :item="{
      title: 'Cargar Guia',
      icon: 'ri-file-copy-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Cargar guia',
        to: '/sugas/cargar_archivo',
      }"
    />
  </VerticalNavGroup>
  <VerticalNavLink
    :item="{
      title: 'Configuración',
      icon: 'ri-user-settings-line',
      to: '/sugas/account-settings',
    }"
  />

  <!-- 👉 Others -->
</template>
