<template>
  <VCard
    title="LISTADO  DE PROGRAMAS"
    class="background-linear"
  >
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
            color="success"
            icon
            @click="editProgram(item)"
          >
            <v-icon icon="ri-pencil-fill"></v-icon>
          </v-btn>
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
      programs: [],
      show: false,
      codigo: null,
      headers: [
        { title: 'Código', value: 'codigo' },
        { title: 'Nombre', value: 'nombre' },
        { title: 'Version', value: 'version' },
        { title: 'Acciones', value: 'actions', sortable: false },
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
      const response = await axios.get('http://localhost:3000/programa/', {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
        },
      })
      this.programs = response.data
      this.$emit('plistado')
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
      const response = await axios.delete(`http://localhost:3000/programa/codigo/${codigo}`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
        },
      })
      this.$notify({ text: 'Programa eliminado con éxito...', type: 'success' })
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
  },
}
</script>
