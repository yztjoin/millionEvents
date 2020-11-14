let routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/million'
  }
  ,
  {
    path: '/million',
    name: 'million',
    component: () => import('../pages/millionEnvelopes/index.vue')
  } ,
  {
    path: '/awardDeails',
    name: 'awardDeails',
    component: () => import('../pages/millionEnvelopes/awardDetails.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/index.vue')
  }
]
export default routes