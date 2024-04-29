<template>
  <div class="bg-blue-lighten-5 fill-height d-flex align-center justify-center">
    <v-card class="mx-auto pa-12 pb-8" width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Usuário</div>

      <v-text-field
        density="compact"
        placeholder="Usuário da conta"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
      />

      <div class="text-subtitle-1 text-medium-emphasis">Senha</div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Sua senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      />

      <v-btn block class="bg-blue-darken-3 text-none" variant="flat">
        Entrar
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    visible: false,
  }),
}
</script>
