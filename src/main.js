import { createApp } from 'vue'
import './style.css'
import router from '@/components/UI/Router'
import App from './App.vue'

import { library } from "@fortawesome/fontawesome-svg-core"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faArrowRight)

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon)

app.use(router)
app.mount('#app')
