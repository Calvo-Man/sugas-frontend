<template>
  <v-row>
    <v-col cols="12">
      <listprograma @selprograma="gprograma"></listprograma>
    </v-col>
    <v-col cols="12">
      <VCard>
        <VCardText class="d-flex flex-column gap-y-8">
          <v-select
            v-model="competencia"
            :items="competencias"
            item-value="id"
            item-title="nombre"
            label="Selecciona una competencia"
          ></v-select>
        </VCardText>
      </VCard>
    </v-col>
    <v-col cols="12">
      <VCard title="REGISTRO DE RESULTADO DE APRENDIZAJE">
        <VCardText class="d-flex flex-column gap-y-8">
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-text-field
              v-model="paquete.nombre"
              label="Nombre"
              type="text"
              :rules="[rules.required]"
              required
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model.number="paquete.duracion"
              label="Duracion"
              type="number"
              :rules="[rules.required]"
              required
              class="mb-2"
            ></v-text-field>

            <v-btn
              v-if="!id"
              class="mt-3"
              @click="guardar()"
              color="#5cb85c"
              >Guardar</v-btn
            >
            <v-btn
              v-if="id"
              class="mt-3"
              @click="editar()"
              color="#0090A5"
              >Editar</v-btn
            >
          </v-form>
          <LoaderCarga :dialog="dialog"></LoaderCarga>
        </VCardText>
      </VCard>
    </v-col>
    <v-col cols="12">
      <listadoresultado
        :estado="estado"
        :programa="programa"
        :competencia="competencia"
        @plistado="actualizaestado"
        @editar="preeditar"
      ></listadoresultado>
    </v-col>
  </v-row>
</template>
<script>
import listadoresultado from '@/pages/ResultadoAprendizaje/listadoresultado.vue'
import listprograma from '@/views/user-interface/listas/listprogramas.vue'
import axios from 'axios'
export default {
  components: { listprograma, listadoresultado },
  data() {
    return {
      competencias: [],
      estado: false,
      programa: null,
      id: null,
      competencia: null,
      paquete: {
        nombre: '',
        duracion: 0,
      },
      dialog: false,
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
      },
    }
  },
  methods: {
    preeditar(item) {
      this.paquete.nombre = item.nombre
      this.paquete.duracion = item.duracion
      this.id = item.id
    },

    async editar() {
      if (this.$refs.form.validate()) {
        try {
          this.dialog = true
          const response = await axios.patch(`http://localhost:3000/resultados/${this.id}`, this.paquete, {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
            },
          })
          this.$notify({ text: 'Resultado de aprendizaje editado con éxito...', type: 'success' })
          this.$refs.form.reset()
          this.estado = true
          this.dialog = false
        } catch (error) {
          console.error('Error al enviar datos:', error)
        }
      }
    },

    actualizaestado() {
      this.estado = false
    },

    gprograma(programa) {
      this.competencias = programa.competencias
      this.programa = programa.id
    },
    async guardar() {
      if (this.$refs.form.validate()) {
        try {
          this.dialog = true
          console.log(this.programa)
          const response = await axios.post(
            `http://localhost:3000/resultados/${this.competencia}/${this.programa}`,
            this.paquete,
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
              },
            },
          )
          console.log(response.data) // Suponiendo que la respuesta incluye un mensaje.
          this.$notify({ text: 'Resultado de aprendizaje guardado con éxito...', type: 'success' }) // Cambia el tipo según sea necesario);
          //this.$emit('guardarc')
          this.$refs.form.reset()
          this.estado = true
          this.dialog = false
        } catch (error) {
          console.error('Error al enviar datos:', error)
        }
      }
    },
  },
}
</script>
