<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-if="create"
        class="bg-blue-darken-3 text-none pa-none"
        prepend-icon="mdi-plus"
        text="Cadastrar aluno"
        variant="large"
        height="40px"
        v-bind="activatorProps"
      ></v-btn>

      <v-icon
        v-else
        size="small"
        v-bind="activatorProps"
      >
        mdi-pencil
      </v-icon>
    </template>

    <v-card
      :title="`${create ? 'Cadastrar' : 'Editar'} aluno`"
      class="pa-2"
    >
      <v-card-text class="mt-2">
        <v-text-field
          label="Nome*"
          variant="outlined"
          v-model="studentForm.name"
        />
        <v-text-field
          label="E-mail*"
          variant="outlined"
          v-model="studentForm.email"
        />
        <v-text-field
          label="RA*"
          variant="outlined"
          v-model="studentForm.ra"
          :disabled="!create"
        />
        <v-text-field
          label="CPF*"
          variant="outlined"
          v-model="studentForm.cpf"
          :disabled="!create"
          maxlength="11"
        />

        <small class="text-caption text-medium-emphasis">*Campos obrigatórios</small>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Cancelar"
          variant="outlined"
          class="text-none"
          @click="cancel"
        />

        <v-btn
          text="Salvar"
          class="bg-blue-darken-3 text-none"
          variant="outlined"
          :disabled="!isValidForm()"
          @click="save"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { api } from '../config/axios';

export default {
  emits: [
    'saveStudent'
  ],

  props: {
    create: {
      type: Boolean,
      default: false
    },
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

  data: () => ({
    dialog: false,
    studentForm: {
      name: '',
      email: '',
      ra: '',
      cpf: ''
    }
  }),

  methods: {
    save () {
      if (this.create) return this.createStudent()

      this.updateStudent()
    },
    cancel () {
      this.studentForm = {
        name: '',
        email: '',
        ra: '',
        cpf: ''
      }

      this.dialog = false
    },
    async createStudent () {
      try {
        await api.post('/student', this.studentForm)

        this.$emit('saveStudent')

        this.studentForm = {
          name: '',
          email: '',
          ra: '',
          cpf: ''
        }

        this.dialog = false
      } catch (error) {
        console.log(error)
      }
    },
    async updateStudent () {
      try {
        console.log('test', this.studentForm)
        await api.put(`/student/${this.studentForm.id}`, this.studentForm)

        this.$emit('saveStudent')

        this.dialog = false
      } catch (error) {
        console.log(error)
      }
    },
    isValidForm () {
      if (!this.studentForm.cpf.length || !this.studentForm.email.length || !this.studentForm.name.length || !this.studentForm.ra.length) return false

      return true
    }
  },

  mounted() {
    this.studentForm = this.student
  }
}
</script>
