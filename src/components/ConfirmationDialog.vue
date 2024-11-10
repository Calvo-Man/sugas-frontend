<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent
  >
    <v-card>
      <v-card-title class="text-h6">
        <v-icon
          left
          class="mr-2"
          >mdi-update</v-icon
        >
        Borrar
      </v-card-title>

      <v-card-text class="py-4">
        <span>
          ¿Está seguro de borrar <strong>{{ mensaje }}</strong> con código: <strong>{{ codigo }}</strong
          >?
        </span>
      </v-card-text>

      <v-card-actions class="d-flex justify-end">
        <v-btn
          color="#5cb85c"
          text
          @click="procesar"
          class="mx-2"
        >
          Aceptar
        </v-btn>
        <v-btn
          color="#FF0000"
          text
          @click="cancelar"
          class="mx-2"
        >
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    codigo: {
      type: String,
      required: true,
    },
    mensaje: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    cancelar() {
      this.$emit('cerrarconfirmation')
    },
    procesar() {
      this.$emit('procesar', this.codigo)
    },
  },
  watch: {
    active() {
      this.dialog = this.active
    },
  },
}
</script>
