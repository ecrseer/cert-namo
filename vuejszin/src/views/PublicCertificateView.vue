<template>
  <main class="app-shell pagina-publica">
    <header class="cabecalho-app">
      <p>Certidão de Namoro</p>
    </header>

    <p v-if="isLoading" class="estado-vazio">Carregando certidão...</p>

    <CertificateDocument v-else-if="certificate" :certificate="certificate" />

    <section v-else class="estado-vazio">
      <h1>Certidão não encontrada</h1>
      <p>{{ errorMessage }}</p>
      <RouterLink to="/">Criar uma certidão</RouterLink>
    </section>

    <RouterLink v-if="certificate" class="criar-outra" to="/"
      >Criar outra certidão</RouterLink
    >
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import CertificateDocument from "../components/CertificateDocument.vue";
import { getCertificate } from "../certificate";

const route = useRoute();
const certificate = ref(null);
const isLoading = ref(true);
const errorMessage = ref(
  "Este link não existe ou a certidão não está disponível.",
);

onMounted(async () => {
  try {
    certificate.value = await getCertificate(route.params.publicId);
  } catch (error) {
    errorMessage.value = error.message || errorMessage.value;
  } finally {
    isLoading.value = false;
  }
});
</script>
