<script setup>
import Footer from '@/layouts/components/Footer.vue'
import NavItemsAdmin from '@/layouts/components/NavItemsAdmin.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import NavItemsCoordinador from './NavItemsCoordinador.vue'
import NavItemsInstructor from './NavItemsInstructor.vue'
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="ri-menu-line" />
        </IconBtn>

        <!-- 👉 Search -->
        <div
          class="d-flex align-center cursor-pointer"
          style="user-select: none"
        >
          <!-- 👉 Search Trigger button -->
          <!-- <IconBtn>
            <VIcon icon="ri-search-line" />
          </IconBtn> -->

          <span class="d-none d-md-flex align-center text-disabled">
            <span class="me-3">Poner algo para llenar este espacio</span>
          </span>
        </div>

        <VSpacer />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-header="{ toggleIsOverlayNavActive }">
      <RouterLink
        to="/"
        class="app-logo app-title-wrapper"
      >
        <!-- eslint-disable vue/no-v-html -->
        <div class="d-flex">
          <img
            src="../../../public/logo.png"
            alt="Logo"
            width="200"
            height="160"
          />
        </div>
        <!-- eslint-enable -->

        <!-- <h1 class="font-weight-medium leading-normal text-xl text-uppercase">SUGA</h1> -->
      </RouterLink>

      <IconBtn
        class="d-block d-lg-none"
        @click="toggleIsOverlayNavActive(false)"
      >
        <VIcon icon="ri-close-line" />
      </IconBtn>
    </template>

    <template #vertical-nav-content>
      <NavItemsAdmin v-if="userRole === 'admin'" />
      <NavItemsCoordinador v-if="userRole === 'coordinador'" />
      <NavItemsInstructor v-if="userRole === 'instructor'" />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>
<script>
export default {
  data() {
    return {
      userRole: '',
    }
  },
  computed: {},
  mounted() {
    this.userRole = this.$store.getters.getUser.rol
  },
}
</script>
<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}

.app-logo {
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  .app-logo-title {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.75rem;
    text-transform: uppercase;
  }
}
</style>
