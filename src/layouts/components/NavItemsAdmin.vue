<script setup>
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavGroup
    :item="{
      title: 'Programa',
      badgeClass: 'bg-error',
      icon: 'ri-home-smile-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Crear Programa',
        badgeClass: 'bg-light-primary text-primary',
        to: '/sugas/programa',
      }"
    />
  </VerticalNavGroup>

  <VerticalNavGroup
    :item="{
      title: 'Competencia',
      badgeClass: 'bg-error',
      icon: 'ri-home-smile-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Crear Competencias',
        badgeClass: 'bg-light-primary text-primary',
        to: '/sugas/competencia',
      }"
    />
  </VerticalNavGroup>

  <VerticalNavGroup
    :item="{
      title: 'Asociacion',
      badgeClass: 'bg-error',
      icon: 'ri-home-smile-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Crear asocacion',
        badgeClass: 'bg-light-primary text-primary',
        to: '/sugas/programacompetencia',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Ver asociaciones',
        badgeClass: 'bg-light-primary text-primary',
        to: '/sugas/ver_asociacion',
      }"
    />
  </VerticalNavGroup>

  <!-- 👉 Front Pages -->
  <VerticalNavGroup
    :item="{
      title: 'Resultado Aprendizaje',
      icon: 'ri-file-copy-line',
      badgeClass: 'bg-error',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Res. Aprendizaje',
        badgeClass: 'bg-light-primary text-primary',
        to: '/sugas/resultado_aprendizaje',
      }"
    />
  </VerticalNavGroup>

  <VerticalNavGroup
    :item="{
      title: 'Cargar Guia',
      icon: 'ri-file-copy-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Cargar guia',
        to: 'cargar_archivo',
      }"
    />
  </VerticalNavGroup>
  <VerticalNavGroup
    :item="{
      title: 'Gest. Usuarios',
      icon: 'ri-file-copy-line',
      badgeClass: 'bg-error',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Registrar usuario',
        icon: 'ri-user-add-line',
        to: 'registro_usuario',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Asignar Programa',
        icon: 'ri-user-add-line',
        to: 'asignar-programa',
      }"
    />
  </VerticalNavGroup>
  <!-- 
  <VerticalNavLink
    :item="{
      title: 'Account Settings',
      icon: 'ri-user-settings-line',
      to: '/sugas/account-settings',
    }"
  /> -->

  <!-- 👉 Others -->
</template>
