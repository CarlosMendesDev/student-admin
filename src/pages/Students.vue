<template>
  <div class="pa-5">
    <div class="d-flex ga-4 pb-6">
      <v-card-text class="pa-0">
        <v-text-field
          append-inner-icon="mdi-magnify"
          label="Buscar por RA, nome, e-mail ou CPF"
          variant="outlined"
          hide-details
          clearable
          density="compact"
          single-line
          v-model="searchQuery"
        ></v-text-field>
      </v-card-text>

      <student-form-modal create @saveStudent="fetchStudents"/>
    </div>

    <v-data-table :headers="headers" :items="items">
      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-4">
          <student-form-modal class="me-2" :student="item" @saveStudent="fetchStudents"/>
          <delete-student-modal :student="item" @deleteStudent="fetchStudents"/>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { api } from '../config/axios'
import StudentFormModal from '../components/StudentFormModal.vue'
import DeleteStudentModal from '../components/DeleteStudentModal.vue'

  export default {
    data: () => ({
      items: [],
      headers: [
        {
          title: 'Nome',
          key: 'name'
        },
        {
          title: 'E-mail',
          key: 'email'
        },
        {
          title: 'RA',
          key: 'ra'
        },
        {
          title: 'CPF',
          key: 'cpf'
        },
        {
          title: 'Actions',
          key: 'actions'
        }
      ],
      _timerId: null
    }),

    computed: {
      searchQuery: {
        get () {
          return this.$route.query.search
        },
        set (value) {
          this.setSearchDebounced(value)
        }
      }
    },

    methods: {
      async fetchStudents () {
        try {
          const { data } = await api.get('/students', { params: { search: this.searchQuery } })

          this.items = data
        } catch (error) {
          console.log(error)
        }
      },

      setSearchDebounced(value) {
        clearTimeout(this._timerId)

        this._timerId = setTimeout(() => {
          this.$router.replace({ query: { search: value } })
        }, 500)
      }
    },

    watch: {
      searchQuery () {
        this.fetchStudents()
      }
    },

    mounted() {
      this.fetchStudents()
    }
  }
</script>
