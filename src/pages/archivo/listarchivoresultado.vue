<template>
  <v-row>
    <v-col
      cols="9"
      class="mx-auto"
    >
      <VCard title="LISTADO  DE ARCHIVOS">
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
            :items="archivos"
            items-per-page="5"
            :search="search"
          >
            <template #item.actions="{ item }">
              <v-btn
                v-if="userRole === 'admin' || userRole === 'coordinador'"
                color="error"
                icon
                @click="predelete(item)"
              >
                <v-icon icon="ri-delete-bin-line"></v-icon>
              </v-btn>
              <v-btn
                class="ml-2"
                color="#2D882D"
                icon
                :href="item.url"
                target="_blank"
              >
                <v-icon
                  icon="ri-eye-line"
                  color="white"
                ></v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </VCardText>
        <ConfirmationDialog
          :active="show"
          :codigo="id"
          mensaje="Guia de aprendizaje"
          @cerrarconfirmation="cerrar"
          @procesar="deleteArchivo"
        />
      </VCard>
    </v-col>
  </v-row>
</template>
<script>
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import axios from 'axios'
export default {
  components: { ConfirmationDialog },
  props: {
    idresultado: {
      type: Number,
      required: true,
    },
    actualizar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: '',
      archivos: [],
      show: false,
      item: null,
      id: -1,
      headers: [
        { title: 'Nombre', value: 'name' },
        { title: 'Tamaño', value: 'tamano' },
        { title: 'Fecha Creacion', value: 'createdAt' },
        { title: 'Acciones', value: 'actions', sortable: false, width: '200px' },
      ],
    }
  },
  computed: {
    userRole() {
      return this.$store.state.user.rol // Obtener el rol desde el store
    },
  },
  methods: {
    async recargar() {
      const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/archivo/${this.idresultado}`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
        },
      })
      this.archivos = response.data
    },

    predelete(item) {
      this.show = true
      this.item = item
      this.id = item.id
    },

    cerrar() {
      this.show = false
    },

    async deleteArchivo() {
      const response = await axios.delete(`${import.meta.env.VITE_API_BACKEND}/archivo/${this.item.id}`, {
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
    idresultado(newValue) {
      console.log('llego', this.idresultado)
      if (newValue) {
        this.recargar()
      }
    },

    actualizar() {
      this.recargar()
    },
  },
}
</script>
