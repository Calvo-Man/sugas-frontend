export const routes = [
  {
    path: '',
    name: 'login',
    component: () => import('@/layouts/blank.vue'),
    redirect: 'login',
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: 'login',
        component: () => import('@/pages/[...error].vue'), // Para rutas no encontradas
      },
    ],
  },
  {
    path: '/validar',
    name: 'EnviarCorreo',
    component: () => import('@/layouts/blank.vue'),
    redirect: 'validar/correo',
    children: [
      {
        path: 'correo',
        component: () => import('@/pages/recuperar-contrasena/pedirCorreo.vue'),
      },
    ],
  },
  {
    path: '/cambio-contrasena/:cedula/:token',
    name: 'RecuperarContrasena',
    component: () => import('@/pages/recuperar-contrasena/recuperarContrasena.vue'),
    props: true, // Esto permite pasar los parámetros como props al componente
  },

  // {
  //   path: '/auth',
  //   name: 'CambioContrasena',
  //   component: () => import('@/layouts/blank.vue'),
  //   redirect: '/auth/cambiar-contrasena',
  //   meta: { puede: true, requiresAuth: true },
  //   children: [
  //     {
  //       path: 'cambiar-contrasena',
  //       component: () => import('@/pages/recuperar-contrasena/cambioContrasena.vue'),
  //     },
  //   ],
  // },
  {
    path: '/sugas',
    name: 'sugas',
    component: () => import('@/layouts/default.vue'),
    meta: { requiresAuth: true },
    redirect: 'sugas/cargar_archivo',
    children: [
      {
        path: 'programa',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/programa/programa.vue'),
      },
      {
        path: 'competencia',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/competencia/competencia.vue'),
      },
      {
        path: 'programacompetencia',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/programacompetencia/programacompetencia.vue'),
      },

      {
        path: 'ver_asociacion',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/programacompetencia/verAsociacion.vue'),
      },

      {
        path: 'resultado_aprendizaje',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/ResultadoAprendizaje/resultadoaprendizaje.vue'),
      },
      {
        path: 'cargar_archivo',

        component: () => import('@/pages/archivo/archivocarga.vue'),
      },
      {
        path: 'registro_usuario',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/register.vue'),
      },
      {
        path: 'account-settings',
        meta: { requiresAdmin: false },
        component: () => import('@/pages/account-settings.vue'),
      },
      {
        path: 'cambiar-contrasena',
        component: () => import('@/pages/recuperar-contrasena/cambioContrasenaLogin.vue'),
      },
      {
        path: 'asignar-programa',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/usuarios/asignarProgramas.vue'),
      },
    ],
  },
]
