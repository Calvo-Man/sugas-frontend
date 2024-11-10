<template>
  <VCard title="LISTADO DE INSTRUCTORES POR PROGRAMAS">
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="ri-search-2-line"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>
    <v-select
      v-model="programaSelected"
      label="Programa"
      :items="programs"
      item-title="nombre"
      item-value="id"
      class="mx-auto w-50"
      @update:model-value="fechtInstructoresPorPrograma"
      no-data-text="No hay programas disponibles"
    ></v-select>
    <VCardText class="d-flex flex-column gap-y-8">
      <v-data-table
        :headers="headers"
        :items="competencias"
        items-per-page="5"
        :search="search"
      >
        <template
          v-if="userRole === 'admin'"
          v-slot:item.actions="{ item }"
        >
          <!-- <v-btn
            class="mr-5"
            color="success"
            icon
            @click="editProgram(item)"
          >
            <v-icon icon="ri-pencil-fill"></v-icon>
          </v-btn> -->
          <v-btn
            color="error"
            icon
            @click="predelete(item.id)"
          >
            <v-icon icon="ri-delete-bin-line"></v-icon>
          </v-btn>
          <ConfirmationDialog
            :active="show"
            :codigo="codigo"
            mensaje="El instructor "
            @cerrarconfirmation="cerrar"
            @procesar="deleteInstructor"
          />
        </template>
      </v-data-table>
    </VCardText>
  </VCard>
</template>
<script>
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import axios from 'axios'
export default {
  components: { ConfirmationDialog },
  props: {
    estado: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      search: '',
      programaSelected: null,
      programs: [],
      competencias: [],
      show: false,
      codigo: null,
      mensaje: null,
    }
  },
  computed: {
    filteredPrograms() {
      return this.programs.filter(program => program.codigo.toLowerCase().includes(this.search.toLowerCase()))
    },
    userRole() {
      return this.$store.state.user.rol // Obtener el rol desde el store
    },
    headers() {
      const baseHeaders = [
        { title: 'Nombre', value: 'name' },
        { title: 'Email', value: 'email' },
        { title: 'Cedula', value: 'cedula' },
        { title: 'Celular', value: 'telefono' },
        { title: 'Rol', value: 'role.rol_name' },
      ]

      if (this.userRole === 'admin') {
        baseHeaders.push({ title: 'Acciones', value: 'actions', sortable: false })
      }

      return baseHeaders
    },
  },
  async mounted() {
    this.fechtInstructoresPorPrograma()

    this.fetchProgramas()
  },
  methods: {
    async fechtInstructoresPorPrograma() {
      if (this.programaSelected) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BACKEND}/programa/${this.programaSelected}/instructores`,
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
              },
            },
          )
          this.competencias = response.data

          this.$emit('plistado')
        } catch (error) {
          console.error('Error fetching competencies:', error)
        }
      }
    },

    async fetchProgramas() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/programa`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
          },
        })
        this.programs = response.data
      } catch (error) {
        console.error('Error fetching programs:', error)
      }
    },
    async fetchProgramasAsignadas() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BACKEND}/usuarios/${this.$store.getters.getUser.id}/programas-asignados`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
            },
          },
        )
        this.programs = response.data // Guardar las competencias asignadas
      } catch (error) {
        console.error('Error fetching assigned competencies:', error)
      }
    },

    editProgram(item) {
      this.$emit('editar', item)
    },

    predelete(id) {
      this.show = true
      this.codigo = id
    },

    cerrar() {
      this.show = false
    },

    async deleteInstructor(codigo) {
      console.log(codigo)
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BACKEND}/programas-instructor/programa/${
          this.programaSelected
        }/instructor/${codigo}`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
          },
        },
      )
      this.$notify({ text: 'Programa eliminado con éxito...', type: 'success' })
      this.show = false
      this.codigo = null
      this.fechtInstructoresPorPrograma()
    },
  },

  watch: {
    estado(newValue) {
      if (newValue) {
        this.fechtInstructoresPorPrograma()
      }
    },
  },
}
</script>
