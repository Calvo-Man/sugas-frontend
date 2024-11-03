<template>
  <v-row>
    <v-col
      cols="8"
      class="mx-auto"
    >
      <VCard>
        <VCardText class="d-flex flex-column gap-y-8">
          <v-select
            v-model="resultado"
            :items="items"
            item-title="nombre"
            return-object
            label="Selecciona resultado de aprendizaje"
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
    competencia: {
      type: Number,
      default: -1,
    },
    programa: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      resultado: null,
      items: [],
    }
  },

  watch: {
    resultado() {
      this.$emit('selresultado', this.resultado)
    },
    async competencia() {
      if (this.competencia != null && this.programa != null) {
        this.resultado = null
        const response = await axios.get(`http://localhost:3000/resultados/${this.programa}/${this.competencia}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
          },
        })
        this.items = response.data
      }
    },

    async programa() {
      if (this.competencia != null && this.programa != null) {
        this.resultado = null
        const response = await axios.get(`http://localhost:3000/resultados/${this.programa}/${this.competencia}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
          },
        })
        this.items = response.data
      }
    },
  },
}
</script>
