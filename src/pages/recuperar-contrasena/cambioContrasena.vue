<script setup>
import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import { defineProps } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  email: String,
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
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="d-flex"
          v-html="logo"
        />
        <h2 class="font-weight-medium text-2xl text-uppercase">Sugaas</h2>
      </VCardItem>

      <VCardText class="pt-2">
        <h4 class="text-h4 mb-1">Welcome to Sugaas! 👋🏻</h4>
        <p class="mb-0">Ingrese su nueva contrasena</p>
      </VCardText>

      <VCardText>
        <v-form
          ref="form"
          validate-on="login lazy"
          @submit.prevent="login"
        >
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <v-text-field
                :disabled="!puede"
                v-model="password"
                label="Password"
                :rules="passwordRules"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <v-text-field
                :disabled="!puede"
                v-model="confirmPassword"
                label="Confirm Password"
                :rules="passwordRules"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <!-- Mensaje de error si las contraseñas no coinciden -->
              <VCol
                cols="12"
                v-if="passwordError"
              >
                <p style="color: red">{{ passwordError }}</p>
              </VCol>
              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap my-6"></div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
                :disabled="!puede"
              >
                Cambiar contraseña
              </VBtn>
            </VCol>
          </VRow>
        </v-form>
      </VCardText>
    </VCard>

    <!-- bg img -->
  </div>
</template>
<script>
import store from '@/store'
import axios from 'axios'
export default {
  data: () => ({
    API: process.env.VUE_APP_API,
    loading: false,
    // email: '',
    emailRules: [
      value => !!value || 'E-mail is required.',
      value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
    ],
    password: '',
    confirmPassword: '',

    passwordError: '',
    passwordRules: [
      value => !!value || 'Password is required.',
      // Agregar más reglas según sea necesario
    ],
  }),

  async mounted() {
    //this.email = this.$store.getters.getUser.email
  },
  computed: {
    puede() {
      return this.$store.state.puede
    },
  },
  methods: {
    async login() {
      // Validar que ambas contraseñas coincidan
      if (this.password !== this.confirmPassword) {
        this.passwordError = 'Las contraseñas no coinciden' // Actualiza el mensaje de error
        return
      }

      // Limpiar el mensaje de error si todo está correcto
      this.passwordError = ''
      const isValid = this.$refs.form.validate() // Valida el formulario

      if (!isValid) {
        console.log('Formulario no válido')
        return // Si el formulario no es válido, no se envía
      }

      try {
        const response = await axios.post(`http://localhost:3000/auth/cambiar-contrasena`, {
          email: this.email,
          password: this.password,
        })
        this.password = ''
        this.confirmPassword = ''
        this.$notify({ text: response.data.message, type: 'success' })
        store.dispatch('reset')
        this.$router.push({ path: '/sugas' })
      } catch (error) {
        if (error.response) {
          // console.error('Error de respuesta:', error.response.data)
          // console.error('Código de estado:', error.response.status)
          // console.error('Encabezados:', error.response.headers)
        } else if (error.request) {
          // console.error('Sin respuesta del servidor:', error.request)
        } else {
          // console.error('Error en la solicitud:', error.message)
        }
        //console.error('Configuración completa del error:', error.config)
      }
    },
  },
}
</script>
