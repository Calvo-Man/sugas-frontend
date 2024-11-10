<template>
  <VCard
    title="REGISTRO DE PROGRAMAS"
    class="background-linear"
  >
    <VCardText class="d-flex flex-column gap-y-8">
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-text-field
          v-model="paquete.codigo"
          label="Código"
          type="number"
          :rules="[rules.required]"
          required
          class="mb-2"
        ></v-text-field>

        <p
          v-if="mensaje_error_codigo"
          style="color: red"
        >
          {{ mensaje_error_codigo }}
        </p>

        <v-text-field
          v-model="paquete.nombre"
          label="Nombre"
          :rules="[rules.required]"
          required
          class="mb-2"
        ></v-text-field>

        <p
          v-if="mensaje_error_nombre"
          style="color: red"
        >
          {{ mensaje_error_nombre }}
        </p>

        <v-text-field
          v-model.number="paquete.version"
          label="Version"
          type="number"
          :rules="[rules.required]"
          required
        ></v-text-field>

        <v-btn
          v-if="!item"
          class="mt-3"
          @click="guardar()"
          color="#5cb85c"
          >Guardar</v-btn
        >
        <v-btn
          v-if="item"
          class="mt-3"
          @click="editar()"
          color="#0090A5"
          >Editar</v-btn
        >
      </v-form>
      <LoaderCarga :dialog="dialog"></LoaderCarga>
    </VCardText>
  </VCard>
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
      paquete: {
        codigo: '',
        nombre: '',
        version: '',
      },
      id: null,
      dialog: false,
      mensaje_error_codigo: null,
      mensaje_error_nombre: null,
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
      },
    }
  },

  methods: {
    async guardar() {
      if (this.$refs.form.validate()) {
        this.mensaje_error_codigo = null
        this.mensaje_error_nombre = null
        try {
          this.dialog = true
          const response = await axios.post(
            `${import.meta.env.VITE_API_BACKEND}/programa/CrearPrograma`,
            this.paquete,
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
              },
            },
          )

          if (!response.data.success) {
            response.data.column === 'codigo'
              ? (this.mensaje_error_codigo = 'Ya existe un programa con este código')
              : (this.mensaje_error_nombre = 'Ya existe un programa con este nombre')
          } else {
            this.$notify({ text: response.data.message, type: response.data.type }) // Cambia el tipo según sea necesario);
          }
          this.resetForm()
          this.$emit('pguardar')
          this.dialog = false
        } catch (error) {
          //console.error('Error al enviar datos:', error.response.data.statusCode)
          if (error.response.data.statusCode === 409) {
            return this.$notify({ text: 'El programa ya existe', type: 'error' })
          }
        }

        this.resetForm()
      }
    },

    async editar() {
      try {
        // this.paquete.id  = this.id
        this.dialog = true
        const response = await axios.patch(`${import.meta.env.VITE_API_BACKEND}/programa/${this.id}`, this.paquete, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
          },
        })
        this.$notify({ text: 'Programa editado con éxito...', type: 'success' }) //
        this.resetForm()
        this.$emit('peditar')
        this.dialog = false
      } catch (error) {
        console.error('Error al enviar datos:', error)
      }
    },

    resetForm() {
      this.codigo = ''
      this.nombre = ''
      this.version = ''
      this.$refs.form.reset()
    },
  },

  watch: {
    item(newValue) {
      if (newValue) {
        this.id = this.item.id
        this.paquete.codigo = this.item.codigo
        this.paquete.nombre = this.item.nombre
        this.paquete.version = this.item.version
      }
    },
  },
}
</script>
<style>
.notification.success {
  background-color: #4caf50; /* Color de fondo para éxito */
  color: white; /* Color del texto */
}
</style>
