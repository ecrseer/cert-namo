import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import EditorView from './views/EditorView.vue'
import CertidaoPublicaView from './views/CertidaoPublicaView.vue'
import './styles.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: EditorView },
    { path: '/c/:slug', component: CertidaoPublicaView },
  ],
})

createApp(App).use(router).mount('#app')
