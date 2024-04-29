import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Students from '../pages/Students.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/alunos'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/alunos',
      name: 'Alunos',
      component: Students,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) return next()

  const isAuthenticated = userIsAuthenticated()

  if (!isAuthenticated) return next('/login')

  next()
})

// TO DO
const userIsAuthenticated = () => {
  return 2 < 1
}

export default router
