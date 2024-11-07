<template>
  <v-row>
    <v-col cols="12">
      <listprograma @selprograma="gprograma"></listprograma>
    </v-col>
    <v-col cols="12">
      <listcompetencia
        @selcompetencia="gcompetencia"
        :limpiar="limpiar"
      ></listcompetencia>
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="6">
          <VCard>
            <v-card-title color="blue"> Competencias Seleccionadas </v-card-title>
            <VCardText class="d-flex flex-column gap-y-8">
              <v-data-table
                :headers="headers2"
                :items="competenciaSeleccionadas"
                items-per-page="5"
              >
              </v-data-table>
            </VCardText>
            <VCardActions>
              <v-btn
                block="true"
                color="#5cb85c"
                @click="guardar()"
              >
                GUARDAR
              </v-btn>
            </VCardActions>
          </VCard>
        </v-col>
        <v-col cols="6">
          <VCard>
            <v-card-title> Competencias Guardadas </v-card-title>
            <VCardText class="d-flex flex-column gap-y-8">
              <v-data-table
                :headers="headers"
                :items="competenciaGuardadas"
                items-per-page="5"
              >
                <template #item.actions="{ item }">
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
                @procesar="delcompetprograma"
              />
            </VCardText>
          </VCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import listcompetencia from '@/views/user-interface/listas/listcompetencia.vue'
import listprograma from '@/views/user-interface/listas/listprogramas.vue'
import axios from 'axios'
export default {
  components: { listcompetencia, listprograma },
  data() {
    return {
      programa: null,
      limpiar: false,
      competenciaGuardadas: [],
      competenciaSeleccionadas: [],
      show: false,
      codigo: null,
      headers: [
        { title: 'Nombre', value: 'nombre' },
        { title: 'Duración', value: 'duracion' },
        { title: 'Código', value: 'codigo' },
        { title: 'Acciones', value: 'actions', sortable: false },
      ],
      headers2: [
        { title: 'Nombre', value: 'nombre' },
        { title: 'Duración', value: 'duracion' },
        { title: 'Código', value: 'codigo' },
      ],
    }
  },
  methods: {
    async guardar() {
      if (this.programa != null && this.competenciaSeleccionadas.length > 0) {
        const ids = this.competenciaSeleccionadas.map(objeto => objeto.id)
        const obj = new Object()
        obj.programaId = this.programa
        console.log('Progrma id: ', obj.programaId)
        obj.competenciaId = ids
        console.log('competencia ID: ', obj.competenciaId)
        try {
          const response = await axios.post(`http://localhost:3000/programacompetencia`, obj, {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
            },
          })
          this.$notify({ text: 'Competencia guardada con éxito...', type: 'success' })
          this.gprograma(obj.programaId)
          this.competenciaSeleccionadas = []
        } catch (error) {
          console.error('Error al enviar datos:', error)
        }
      } else {
        this.$notify({ text: 'Faltan datos por seleccionar ...', type: 'error' })
      }
    },

    async gprograma(programa) {
      programa.id === undefined ? (this.programa = programa) : (this.programa = programa.id)
      console.log(this.programa)

      if (this.programa !== null) {
        this.limpiar = true
        const response = await axios.get(`http://localhost:3000/programa/codigo/${this.programa}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
          },
        })
        console.log(response)
        this.competenciaGuardadas = response.data.competencias
      } else {
        this.competenciaGuardadas = null
      }
    },

    gcompetencia(competencia) {
      this.limpiar = false
      // const resultado = competencia.filter(
      //   item1 => !this.competenciaGuardadas.map(item2 => item2.id).includes(item1.id),
      // )
      this.competenciaSeleccionadas = competencia
    },
    predelete(codigo) {
      this.show = true
      this.codigo = codigo
    },
    cerrar() {
      this.show = false
    },

    async delcompetprograma(id) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/programacompetencia/${this.programa}/competencia/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
            },
          },
        )
        this.limpiar = true
        this.$notify({ text: 'Competencia borrada del programa con éxito...', type: 'success' })
        this.gprograma(this.programa)
        this.show = false
        this.codigo = null
      } catch (error) {
        console.error('Se ha producido un error:', error)
      }
    },
  },
}
</script>
