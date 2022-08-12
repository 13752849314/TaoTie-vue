import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router"
import store from "./store"


createApp(App)
    .use(ElementPlus)
    .use(router)
    .use(store)
    .mount('#app')
