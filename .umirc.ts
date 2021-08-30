import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index', wrappers: ['@/wrappers/auth',], },
    { path: '/zack', component: '@/pages/zack', wrappers: ['@/wrappers/auth',], },
    { path: '/login', component: '@/pages/login' },
    { path: '/implicit/callback', component: '@/pages/callback' },
  ],
  fastRefresh: {},
});
