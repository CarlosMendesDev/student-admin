<template>
  <div class="bg-blue-lighten-5 fill-height d-flex align-center justify-center">
    <v-card class="mx-auto pa-12 pb-8" width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Usuário</div>

      <v-text-field
        v-model="username"
        density="compact"
        placeholder="Usuário da conta"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
      />

      <div class="text-subtitle-1 text-medium-emphasis">Senha</div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Sua senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      />

      <v-btn @click="login" block class="bg-blue-darken-3 text-none" variant="flat">
        Entrar
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    visible: false,
    username: '',
    password: ''
  }),

  methods: {
    async login() {
      try {
        const { data } = await axios.post('http://localhost:3001/login', {
          username: this.username,
          password: this.password
        })

        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('username', data.username)

        this.$router.push({ name: 'Alunos' })
      } catch (error) {
        console.error('Erro ao efetuar login:', error)
      }
    }
  }
}
</script>
