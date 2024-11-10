<template>
  <v-row>
    <v-col
      cols="8"
      class="mx-auto"
    >
      <VCard>
        <VCardText class="d-flex flex-column gap-y-8">
          <v-select
            v-model="competencia"
            :items="items"
            item-title="nombre"
            multiple
            return-object
            label="Selecciona una competencia"
            no-data-text="No hay competencias disponibles"
          ></v-select>
        </VCardText>
      </VCard>
    </v-col>
  </v-row>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    limpiar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      competencia: [],
      items: [],
    }
  },
  async mounted() {
    const response = await axios.get(`${import.meta.env.VITE_API_BACKEND}/competencia/`, {
      headers: {
        Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
      },
    })
    console.log(response)
    this.items = response.data
  },

  watch: {
    competencia() {
      this.$emit('selcompetencia', this.competencia)
    },

    limpiar() {
      if (this.limpiar) this.competencia = []
    },
  },
}
</script>
