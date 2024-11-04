<template>
  <v-row>
    <v-col
      cols="8"
      class="mx-auto"
    >
      <VCard>
        <VCardText class="d-flex flex-column gap-y-8">
          <v-select
            v-model="programa"
            :items="items"
            item-value="id"
            item-title="nombre"
            label="Selecciona un programa"
            no-data-text="El usuario no tiene programas asignados"
            return-object
          ></v-select>
        </VCardText>
      </VCard>
    </v-col>
  </v-row>
</template>
<script>
import store from '@/store'
import axios from 'axios'
export default {
  data() {
    return {
      items: [],
      programa: null,
      id: store.state.user.id,
    }
  },

  methods: {},
  async mounted() {
    if (store.state.user.rol == 'admin') {
      const response = await axios.get('http://localhost:3000/programa/', {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
        },
      })
      this.items = response.data
    } else {
      const response = await axios.get(`http://localhost:3000/usuarios/${this.id}/programas-asignados`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
        },
      })
      this.items = response.data
    }
  },

  watch: {
    programa() {
      // let arreglo2 = this.items
      //let obj = arreglo2.find(objeto => objeto.id =  this.programa);
      this.$emit('selprograma', this.programa)
    },
  },
}
</script>
