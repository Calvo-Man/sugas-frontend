export const routes = [
 // { path: '/', redirect: '/dashboard' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
      },
      {
        path: 'account-settings',
        component: () => import('@/pages/account-settings.vue'),
      },
      {
        path: 'typography',
        component: () => import('@/pages/typography.vue'),
      },
      {
        path: 'programa',
        component: () => import('@/pages/programa/programa.vue'),
      },
      {
        path: 'competencia',
        component: () => import('@/pages/competencia/competencia.vue'),
      },
      {
        path: 'programacompetencia',
        component: () => import('@/pages/programacompetencia/programacompetencia.vue'),
      },
      {
        path: 'resultado_aprendizaje',
        component: () => import('@/pages/ResultadoAprendizaje/resultadoaprendizaje.vue'),
      },
      {
        path: 'cargar_archivo',
        component: () => import('@/pages/archivo/archivocarga.vue'),
      },
      {
        path: 'icons',
        component: () => import('@/pages/icons.vue'),
      },
      {
        path: 'cards',
        component: () => import('@/pages/cards.vue'),
      },
      {
        path: 'tables',
        component: () => import('@/pages/tables.vue'),
      },
      {
        path: 'form-layouts',
        component: () => import('@/pages/form-layouts.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: 'register',
        component: () => import('@/pages/register.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
]
