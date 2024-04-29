<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-icon
        size="small"
        v-bind="activatorProps"
        color="red-darken-3"
      >
        mdi-delete
      </v-icon>
    </template>

    <v-card
      prepend-icon="mdi-delete"
      :text="`Essa ação vai deleter o aluno ${student.name} permanentemente. Dejesa continuar?`"
      title="Deletar aluno"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Cancelar"
          variant="outlined"
          class="text-none"
          @click="dialog = false"
        />

        <v-btn
          text="Excluir"
          class="bg-red-darken-3 text-none"
          variant="outlined"
          @click="deleteStudent"
        />
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import { api } from '../config/axios';

export default {
  emits: [
    'deleteStudent'
  ],

  props: {
    student: {
      type: Object,
      default: {
        name: '',
        email: '',
        ra: '',
        cpf: ''
      }
    }
  },

  data () {
    return {
      dialog: false,
    }
  },

  methods: {
    async deleteStudent () {
      try {
        await api.delete(`student/${this.student.id}`)

        this.$emit('deleteStudent')

        this.dialog = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
