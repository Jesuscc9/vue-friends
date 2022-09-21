import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import Login from '@/views/LoginPage.vue'
import Signup from '@/views/SignupPage.vue'
import PostsPage from '@/views/PostsPage.vue'
import { supabase } from '@/services/supabase'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      isPrivate: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      isPrivate: false,
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      isPrivate: false,
    },
  },
  {
    path: '/posts',
    name: 'posts',
    component: PostsPage,
    meta: {
      isPrivate: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const isAuthenticated = supabase.auth.session()

router.beforeEach(async (to) => {
  if (isAuthenticated && to.name !== 'posts') {
    return { name: 'posts' }
  }

  if (!isAuthenticated && to.meta.isPrivate && to.name !== 'login') {
    return { name: 'login' }
  }
})

export default router
