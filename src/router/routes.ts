import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [{ path: '', name: 'dashboard-index', component: () => import('pages/dashboard/dashboard-index.vue') }],
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/auth/login.vue') 
      }
    ],
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'setting',
        name: 'account-setting',
        component: () => import('pages/account/index.vue') 
      }
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true, role: 0 },
    children: [
      {
        path: '',
        name: 'admin-index',
        component: () => import('pages/admin/admin-index.vue') 
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
