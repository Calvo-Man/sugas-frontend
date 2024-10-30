<script setup>
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-5"
      max-width="500"
      elevation="3"
    >
      <VCardItem class="justify-center">
        <RouterLink
          to="/"
          class="d-flex align-center gap-3"
        >
          <!-- eslint-disable vue/no-v-html -->
          <div class="d-flex">
            <img
              src="../../../public/logo.png"
              alt="Logo"
              width="100"
            />
          </div>
          <h2 class="font-weight-medium text-2xl text-uppercase">Sugas</h2>
        </RouterLink>
      </VCardItem>

      <VCardText>
        <h4 class="text-h4 mb-3">Información personal</h4>
        <VForm
          @submit.prevent="() => {}"
          ref="form"
        >
          <VRow>
            <VCol cols="12">
              <h5 class="label">Nombre:</h5>
              <p class="user-info">{{ name }}</p>
            </VCol>

            <VCol cols="12">
              <h5 class="label">Email:</h5>
              <p class="user-info">{{ email }}</p>
            </VCol>

            <VCol cols="12">
              <h5 class="label">Cédula:</h5>
              <p class="user-info">{{ cedula }}</p>
            </VCol>

            <VCol cols="12">
              <h5 class="label">Teléfono:</h5>
              <p class="user-info">{{ telefono }}</p>
            </VCol>

            <VCol cols="12">
              <h5 class="label">Rol:</h5>
              <p class="user-info">{{ role }}</p>
            </VCol>

            <VCol
              cols="12"
              v-if="role !== 'admin'"
            >
              <h5 class="label">Programas asignados:</h5>

              <p
                v-for="programa in programas"
                :key="programa.id"
              >
                {{ programa.nombre }}
              </p>
            </VCol>

            <VCol cols="12">
              <v-btn
                block
                to="/auth"
                type="submit"
                color="primary"
                class="btn-submit"
              >
                Cambiar contraseña
              </v-btn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<script>
import store from '@/store'
import axios from 'axios'
export default {
  data() {
    return {
      valid: false,

      name: this.$store.getters.getUser.nombre,
      email: this.$store.getters.getUser.email,
      cedula: this.$store.getters.getUser.cedula,
      telefono: this.$store.getters.getUser.telefono,
      role: this.$store.getters.getUser.rol,
      programas: [],
      id: null,
      dialog: false,
    }
  },

  async mounted() {
    await this.fetchProgramas()
  },

  methods: {
    async CambiarContrasena() {
      try {
        const response = await axios.post(
          'http://localhost:3000/usuarios/recuperar-contrasena',
          { email: this.email },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
            },
          },
        )

        this.$notify({ text: response.data.message, type: 'success' }) // Cambia el tipo según sea necesario;
      } catch (error) {
        console.error('Error al obtener los roles:', error)
      }
    },
    async fetchProgramas() {
      try {
        const response = await axios.get(
          `http://localhost:3000/usuarios/${store.getters.getUser.id}/programas-asignados`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
            },
          },
        )
        this.programas = response.data
      } catch (error) {
        console.error('Error al obtener los programas:', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  font-weight: 600;
  color: #2d882d;
}

h5.label {
  color: #555;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

p.user-info {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.logo-container {
  width: 50px;
}

.btn-submit {
  background-color: #2d882d !important;
  color: white !important;
  font-weight: 600;
}

.v-btn:hover {
  background-color: #256c25 !important;
}

.v-btn:active {
  background-color: #1d571d !important;
}
</style>
