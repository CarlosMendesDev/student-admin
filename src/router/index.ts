import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
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
      name: 'login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/alunos',
      name: 'students',
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

const userIsAuthenticated = () => {
  const token = localStorage.getItem('accessToken')

  if (!token || !token.length) return false

  const decodedToken = jwtDecode(token)

  const currentTime = Date.now() / 1000

  if (!decodedToken || !decodedToken.exp) return false

  if (decodedToken.exp < currentTime) return false

  return true
}

export default router
