import { createRouter, createWebHashHistory } from "vue-router"

const Home = { template: '<div>Home</div>' }
const About = { template: "<div>About</div>" }

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
	{ path: "/", name: "home", component: Home },
	{ path: "/about", name: "about", component: About },
]

const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHashHistory(),
	routes, // short for `routes: routes`
})

export default router
