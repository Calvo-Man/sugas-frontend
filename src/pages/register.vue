<script setup>
// import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
// import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import { useTheme } from 'vuetify'

const form = ref({
  username: '',
  email: '',
  password: '',
  privacyPolicies: false,
})

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <RouterLink
          to="/"
          class="d-flex align-center gap-3"
        >
          <!-- eslint-disable vue/no-v-html -->
          <div class="d-flex">
            <img
              src="../../../public/suga-sena.png"
              alt="Logo"
              width="150"
            />
          </div>
          <!-- <h2 class="font-weight-medium text-2xl text-uppercase">Sugas</h2> -->
        </RouterLink>
      </VCardItem>

      <VCardText class="pt-2">
        <h4 class="text-h4 mb-1">Registro de usuarios</h4>
      </VCardText>

      <VCardText>
        <VForm
          @submit.prevent="() => {}"
          ref="form"
        >
          <VRow>
            <!-- Username -->

            <VCol cols="12">
              <VTextField
                v-model="paquete.name"
                label="Nombre"
                type="text"
                color="#2D882D"
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="paquete.email"
                label="Email"
                placeholder="johndoe@email.com"
                type="email"
                color="#2D882D"
              />
            </VCol>

            <!-- cedula -->
            <VCol cols="12">
              <VTextField
                v-model="paquete.cedula"
                label="Cedula"
                type="number"
                color="#2D882D"
              />
            </VCol>

            <!-- telefono -->
            <VCol cols="12">
              <VTextField
                v-model="paquete.telefono"
                label="Telefono"
                type="number"
                color="#2D882D"
              />
            </VCol>
            <!-- programas -->

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="paquete.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                color="#2D882D"
              />

              <!-- rol -->
              <VCol cols="12">
                <v-select
                  v-model.number="paquete.role"
                  label="Rol"
                  :items="roles"
                  item-title="rol_name"
                  item-value="id"
                  required
                  class="mb-2"
                  color="#2D882D"
                ></v-select>
              </VCol>

              <v-btn
                block
                @click="registrar"
                type="submit"
                color="#5cb85c"
              >
                Registrar
              </v-btn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  props: {
    estado: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      valid: false,
      roles: [],
      paquete: {
        name: '',
        email: '',
        cedula: '',
        telefono: '',

        password: '',
        role: null,
      },
      id: null,
      dialog: false,
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
      },
    }
  },
  mounted() {
    this.fetchRoles()
  },

  methods: {
    async registrar() {
      try {
        this.dialog = true

        const response = await axios.post('http://localhost:3000/auth/register', this.paquete, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
          },
        })
        this.$notify({ text: 'Usuario guardado con éxito...', type: 'success' }) // Cambia el tipo según sea necesario);
        this.resetForm()
        this.$emit('pguardar')
        this.dialog = false
      } catch (error) {
        console.error('Error al enviar datos:', error)
      }
    },
    async fetchRoles() {
      try {
        const response = await axios.get('http://localhost:3000/roles', {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
          },
        })
        this.roles = response.data
      } catch (error) {
        console.error('Error al obtener los roles:', error)
      }
    },

    resetForm() {
      this.codigo = ''
      this.nombre = ''
      this.version = ''
      this.$refs.form.reset()
    },
  },
}
</script>
<style lang="scss" scoped>
@use '@core/scss/template/pages/page-auth';
.bg-primary {
  background-color: green !important;
  color: rgb(var(--v-theme-on-primary)) !important;
}
.text-primary {
  color: green !important;
}
</style>
