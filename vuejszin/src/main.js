import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import EditorView from "./views/EditorView.vue";
import PublicCertificateView from "./views/PublicCertificateView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: EditorView },
    { path: "/c/:publicId", component: PublicCertificateView },
  ],
});

createApp(App).use(router).mount("#app");
