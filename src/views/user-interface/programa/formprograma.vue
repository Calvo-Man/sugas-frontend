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

        <v-text-field
          v-model="paquete.nombre"
          label="Nombre"
          :rules="[rules.required]"
          required
          class="mb-2"
        ></v-text-field>

        <v-text-field
          v-model="paquete.version"
          label="Version"
          type="number"
          :rules="[rules.required]"
          required
        ></v-text-field>

        <v-btn
          v-if="!item"
          class="mt-3"
          @click="guardar()"
          color="primary"
          >Guardar</v-btn
        >
        <v-btn
          v-if="item"
          class="mt-3"
          @click="editar()"
          color="primary"
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
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
      },
    }
  },

  methods: {
    async guardar() {
      if (this.$refs.form.validate()) {
        try {
          this.dialog = true
          const response = await axios.post('http://localhost:3000/programa/CrearPrograma', this.paquete, {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
            },
          })

          console.log(response.data) // Suponiendo que la respuesta incluye un mensaje.
          this.$notify({ text: 'Programa guardado con éxito...', type: 'success' }) // Cambia el tipo según sea necesario);
          this.resetForm()
          this.$emit('pguardar')
          this.dialog = false
        } catch (error) {
          console.error('Error al enviar datos:', error)
        }

        this.resetForm()
      }
    },

    async editar() {
      try {
        // this.paquete.id  = this.id
        this.dialog = true
        const response = await axios.patch(`http://localhost:3000/programa/${this.id}`, this.paquete, {
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
