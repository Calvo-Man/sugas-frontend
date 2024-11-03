<template>
  <v-row>
    <v-col
      cols="9"
      class="mx-auto"
    >
      <ListarProgramaCompetencia />
    </v-col>
  </v-row>
</template>

<script>
import ListarProgramaCompetencia from '@/views/user-interface/programa/listarProgramaCompetencia.vue'

export default {
  components: { ListarProgramaCompetencia },
}
</script>
