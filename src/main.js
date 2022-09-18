import { createApp } from 'vue'
import './style.css'
import router from '@/components/UI/Router'
import App from './App.vue'

import { library } from "@fortawesome/fontawesome-svg-core"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import Button from './components/UI/Button.vue'

import 'vue-loaders/dist/vue-loaders.css'
import VueLoaders from 'vue-loaders'

library.add(faArrowRight)

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon).component('v-button', Button)

app.use(router)
app.use(VueLoaders)
app.mount('#app')
