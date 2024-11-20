<template>
  <VCard title="LISTADO DE USUARIOS">
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
        :items="usuarios"
        items-per-page="5"
        :search="search"
      >
        <template
          v-if="userRole === 'admin'"
          v-slot:item.actions="{ item }"
        >
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
      usuarios: [],
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
    await this.fechtInstructores()
  },
  methods: {
    async fechtInstructores() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/usuarios/`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
          },
        })
        this.usuarios = response.data
      } catch (error) {
        console.error('Error fetching instructors:', error)
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
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_BACKEND}/usuarios/${codigo}/`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
          },
        })
        this.$notify({ text: 'Usuario eliminado con éxito...', type: 'success' })
        this.show = false
        this.codigo = null
      } catch (error) {
        this.$notify({ text: error.response.data.message, type: 'error' })
        this.show = false
      }
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
