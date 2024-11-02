<template>
  <VCard title="ASIGNAR PROGRAMAS A INSTRUCTORES">
    <VCardText class="d-flex flex-column gap-y-8">
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-select
          v-model="paquete.instructor"
          label="Instructor"
          :items="instructores"
          item-title="name"
          item-value="id"
          :rules="[rules.required]"
          required
          class="mb-2"
          @update:model-value="fetchProgramasNoAsignados"
        ></v-select>

        <v-select
          v-model="paquete.programa"
          label="Programas"
          :items="programasNoAsignados"
          item-title="nombre"
          item-value="id"
          multiple
          :rules="[rules.required]"
          required
          :disabled="!paquete.instructor"
          class="mb-2"
        ></v-select>

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
          color="#5cb85c"
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
      programas: [],
      instructores: [],
      programasAsignadas: [],
      programasNoAsignados: [],
      paquete: {
        instructor: null,
        programa: [],
      },
      id: null,
      dialog: false,
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
      },
    }
  },
  mounted() {
    this.fetchInstructores()
    this.fetchProgramas()
  },
  methods: {
    async guardar() {
      if (this.$refs.form.validate()) {
        try {
          this.dialog = true
          const response = await axios.post('http://localhost:3000/programas-instructor', this.paquete, {
            headers: { Authorization: `Bearer ${this.$store.getters.getUser.access_token}` },
          })

          console.log(response.data)
          this.$notify({ text: 'Programas asignados con éxito...', type: 'success' })
          this.resetForm()
          this.$emit('pguardar')
          this.dialog = false
        } catch (error) {
          console.error('Error al enviar datos:', error)
        }

        this.resetForm()
      }
    },

    // async editar() {
    //   try {
    //     this.dialog = true
    //     const response = await axios.patch(`http://localhost:3000/programa/${this.id}`, this.paquete)
    //     this.$notify({ text: 'Programa editado con éxito...', type: 'success' })
    //     this.resetForm()
    //     this.$emit('peditar')
    //     this.dialog = false
    //   } catch (error) {
    //     console.error('Error al enviar datos:', error)
    //   }
    // },

    async fetchInstructores() {
      try {
        const response = await axios.get('http://localhost:3000/usuarios', {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
          },
        })
        this.instructores = response.data
      } catch (error) {
        console.error('Error fetching instructors:', error)
      }
      this.fetchProgramasNoAsignados()
    },

    async fetchProgramas() {
      try {
        const response = await axios.get('http://localhost:3000/programa', {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
          },
        })
        this.programas = response.data
      } catch (error) {
        console.error('Error fetching programs:', error)
      }
    },

    async fetchProgramasAsignadas() {
      if (this.paquete.instructor) {
        try {
          const response = await axios.get(
            `http://localhost:3000/usuarios/${this.paquete.instructor}/programas-asignados`,
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
              },
            },
          )
          this.programasAsignados = response.data // Guardar las competencias asignadas
        } catch (error) {
          console.error('Error fetching assigned competencies:', error)
        }
      }
      this.fetchProgramas() // Cargar todas las competencias
    },
    async fetchProgramasNoAsignados() {
      if (this.paquete.instructor) {
        try {
          const response = await axios.get(
            `http://localhost:3000/usuarios/${this.paquete.instructor}/programas-no-asignados`,
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
              },
            },
          )
          this.programasNoAsignados = response.data // Guardar las competencias asignadas
        } catch (error) {
          console.error('Error fetching assigned competencies:', error)
        }
      }
    },

    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Determina si una competencia ya se encuentra asignada a un programa.
     * @param {Object} competencia - La competencia a evaluar.
     * @returns {Boolean} true si la competencia ya se encuentra asignada, de lo contrario false.
     */
    /******  f3c8e038-d77e-49bd-8108-a84624cc8b82  *******/
    competenciaDeshabilitada(competencia) {
      console.log(this.competenciasAsignadas.some(item => item.id === competencia.id))
    },

    resetForm() {
      this.paquete.programa = null
      this.paquete.competencia = []
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
