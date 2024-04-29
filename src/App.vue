<template>
  <v-app>
    <v-layout>
      <v-app-bar
        v-if="this.$route.name !== 'login'"
        color="primary"
        prominent
        :elevation="0"
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"/>
        <v-spacer/>
        <v-btn @click="logout" append-icon="mdi-logout" class="text-none">
          Sair
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        elevation-1
        class="bg-blue-lighten-5"
        v-if="this.$route.name !== 'login'"
      >
      <v-list density="compact">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          color="primary"
          class="d-flex align-center"
          active
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: true,
      group: null,
      items: [
        {
          title: 'Alunos',
          value: 'alunos',
          icon: 'mdi-account-group'
        }
      ],
    }),

    methods: {
      logout () {
        localStorage.setItem('accessToken', '')

        this.$router.push({ name: 'login' })
      }
    },

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>
