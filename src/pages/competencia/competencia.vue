<template>
  <div>
    <VRow>
      <VCol
        cols="8"
        class="mx-auto"
      >
        <formcompetencia
          @guardarc="actualizarestado"
          :item="competencia"
          @peditar="actualizarestado"
        ></formcompetencia>
      </VCol>
      <VCol
        cols="8"
        class="mx-auto"
      >
        <listcompetencia
          :estado="estado"
          @plistado="actualizarestado"
          @editar="editar"
        ></listcompetencia>
      </VCol>
    </VRow>
  </div>
</template>

<script>
import formcompetencia from '@/views/user-interface/competencia/formcompetencia.vue'
import listcompetencia from '@/views/user-interface/competencia/listcompetencia.vue'
export default {
  components: { formcompetencia, listcompetencia },
  data() {
    return {
      estado: false,
      competencia: null,
    }
  },
  methods: {
    actualizarestado() {
      this.estado = !this.estado
      this.competencia = null
    },
    editar(item) {
      this.competencia = item
    },
  },
}
</script>

<style></style>
