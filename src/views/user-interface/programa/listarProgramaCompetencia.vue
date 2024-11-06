<template>
  <VCard title="LISTADO DE COMPETENCIAS DE PROGRAMAS">
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
      @update:model-value="fetchCompetenciasPorPrograma"
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
            color="#0090A5"
            icon
            @click="editProgram(item)"
          >
            <v-icon icon="ri-pencil-fill"></v-icon>
          </v-btn> -->
          <v-btn
            color="error"
            icon
            @click="predelete(item.codigo)"
          >
            <v-icon icon="ri-delete-bin-line"></v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <ConfirmationDialog
        :active="show"
        :codigo="codigo"
        mensaje="La competencia "
        @cerrarconfirmation="cerrar"
        @procesar="deleteProgram"
      />
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
        { title: 'Código', value: 'codigo' },
        { title: 'Nombre', value: 'nombre' },
        { title: 'Duración', value: 'duracion' },
      ]

      if (this.userRole === 'admin') {
        baseHeaders.push({ title: 'Acciones', value: 'actions', sortable: false })
      }

      return baseHeaders
    },
  },
  async mounted() {
    this.fetchCompetenciasPorPrograma()
    await this.showProgramByRole()
  },
  methods: {
    async fetchCompetenciasPorPrograma() {
      if (this.programaSelected) {
        try {
          const response = await axios.get(`http://localhost:3000/programa/${this.programaSelected}/competencias`, {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
            },
          })
          this.competencias = response.data

          this.$emit('plistado')
        } catch (error) {
          console.error('Error fetching competencies:', error)
        }
      }
    },
    async showProgramByRole() {
      if (this.userRole === 'admin') {
        await this.fetchProgramas()
      } else if (this.userRole === 'instructor') {
        await this.fetchProgramasAsignadas()
      }
    },

    async fetchProgramas() {
      try {
        const response = await axios.get('http://localhost:3000/programa', {
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
          `http://localhost:3000/usuarios/${this.$store.getters.getUser.id}/programas-asignados`,
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

    predelete(codigo) {
      this.show = true
      this.codigo = codigo
    },

    cerrar() {
      this.show = false
    },

    async deleteProgram(codigo) {
      console.log(codigo)
      const response = await axios.delete(
        `http://localhost:3000/programacompetencia/${this.programaSelected}/competencia/${this.codigo}`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
          },
        },
      )
      this.$notify({ text: 'Programa eliminado con éxito...', type: 'success' })
      this.show = false
      this.codigo = null
      this.fetchCompetenciasPorPrograma()
    },
  },

  watch: {
    estado(newValue) {
      if (newValue) {
        this.fetchCompetenciasPorPrograma()
      }
    },
  },
}
</script>
