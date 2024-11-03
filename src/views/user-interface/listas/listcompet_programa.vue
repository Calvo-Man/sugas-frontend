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
            return-object
            label="Selecciona una competencia"
          ></v-select>
        </VCardText>
      </VCard>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    competencias: {
      type: Array,
    },
  },
  data() {
    return {
      competencia: null,
      items: [],
    }
  },

  watch: {
    competencias() {
      this.competencia = null
      this.items = this.competencias
    },

    competencia() {
      this.$emit('selcompetencia', this.competencia)
    },
  },
}
</script>
