import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

import store from '../../store/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Middleware para autenticación
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated
  const userRole = store.state.user?.rol || ''
  const puede = store.state.puede || false

  if (to.matched.some(record => record.meta.puede)) {
    if (!puede) {
      return next({ path: '/sugas' }) // Redirige a la ruta anterior si no puede
    }
  }

  // Si la ruta requiere autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next(from) // Redirige a la ruta anterior si no está autenticado
    }

    // Verificación para admin
    if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (userRole !== 'admin') {
        return next({ path: '/sugas' }) // Si no es admin, redirige
      }
    }

    // Verificación para admin o coordinador
    if (to.matched.some(record => record.meta.requiresAdmin && record.meta.requiresCoordinador)) {
      if (userRole !== 'admin' && userRole !== 'coordinador') {
        return next({ path: '/sugas' }) // Si no es admin ni coordinador, redirige
      }
    }
  }

  next()
})

export default function (app) {
  app.use(router)
}

export { router }
