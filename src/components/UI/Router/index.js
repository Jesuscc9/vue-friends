import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import Login from '@/views/LoginPage.vue'
import PostsPage from '@/views/PostsPage.vue'

const routes = [
	{ path: '/', name: 'home', component: Home },
	{ path: '/login', name: 'login', component: Login },
	{ path: '/posts', name: 'about', component: PostsPage },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
