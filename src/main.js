import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Lew from "lew-ui";
import "lew-ui/style";
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(Lew);

app.mount('#app')
