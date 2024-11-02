<template>
  <div>
    <VRow>
      <VCol cols="12">
        <AsignarProgramas
          @guardarc="actualizarestado"
          :item="competencia"
          @peditar="actualizarestado"
        ></AsignarProgramas>
      </VCol>

      <VCol cols="12">
        <ListarProgramaInstructor
          :estado="estado"
          @plistado="actualizarestado"
          @editar="editar"
        ></ListarProgramaInstructor>
      </VCol>
    </VRow>
  </div>
</template>

<script>
import ListarProgramaCompetencia from '@/views/user-interface/programa/listarProgramaCompetencia.vue'
import ListarProgramaInstructor from '@/views/user-interface/programa/listarProgramaInstructor.vue'
import AsignarProgramas from '@/views/user-interface/usuarios/asignarProgramas.vue'

export default {
  components: { ListarProgramaCompetencia, ListarProgramaInstructor, AsignarProgramas },
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
