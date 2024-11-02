<template>
  <VCard title="LISTADO  DE RESULTADO DE APRENDIZAJES">
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
    <VCardText class="d-flex flex-column gap-y-8">
      <v-data-table
        :headers="headers"
        :items="programs"
        items-per-page="5"
        :search="search"
      >
        <template #item.actions="{ item }">
          <v-btn
            class="mr-5"
            color="#0090A5"
            icon
            @click="editProgram(item)"
          >
            <v-icon icon="ri-pencil-fill"></v-icon>
          </v-btn>
          <v-btn
            color="error"
            icon
            @click="predelete(item.id)"
          >
            <v-icon icon="ri-delete-bin-line"></v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <ConfirmationDialog
        :active="show"
        :codigo="codigo"
        mensaje="Resultado de aprendizaje y sus competencias asociadas"
        @cerrarconfirmation="cerrar"
        @procesar="deleteResultado"
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
    programa: {
      type: Number,
      required: true,
    },
    competencia: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      search: '',
      programs: [],
      show: false,
      codigo: null,
      headers: [
        { title: 'Nombre', value: 'nombre', width: '600px' },
        { title: 'Duración', value: 'duracion', width: '200px' },
        { title: 'Acciones', value: 'actions', sortable: false, width: '200px' },
      ],
    }
  },
  computed: {
    filteredPrograms() {
      return this.programs.filter(program => program.codigo.toLowerCase().includes(this.search.toLowerCase()))
    },
  },
  async mounted() {
    this.recargar()
  },
  methods: {
    async recargar() {
      if (this.programa && this.competencia) {
        const response = await axios.get(`http://localhost:3000/resultados/${this.programa}/${this.competencia}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
          },
        })
        this.programs = response.data
        this.$emit('plistado')
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

    async deleteResultado(codigo) {
      const response = await axios.delete(`http://localhost:3000/resultados/codigo/${codigo}`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
        },
      })
      this.$notify({ text: 'Resultado eliminado con éxito...', type: 'success' })
      this.show = false
      this.codigo = null
      this.recargar()
    },
  },

  watch: {
    estado(newValue) {
      if (newValue) {
        this.recargar()
      }
    },

    programa(newValue) {
      if (newValue) {
        this.recargar()
      }
    },

    competencia(newValue) {
      if (newValue) {
        this.recargar()
      }
    },
  },
}
</script>
