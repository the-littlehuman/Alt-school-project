import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiStar, BiEyeFill, OiRepoForked } from "oh-vue-icons/icons";
import './style.css'

addIcons(BiStar, BiEyeFill, OiRepoForked)

const app = createApp(App)

app.use(router)
app.component("v-icon", OhVueIcon);
app.mount('#app')
