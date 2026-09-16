<template>
  <main class="app-shell pagina-publica">
    <CertificateDocument
      v-if="isLoading || certificate"
      :certificate="certificate || initialCertificate"
      :is-loading="isLoading"
    />

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
import { getCertificate, initialCertificate } from "../certificate";

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

<style scoped>
.app-shell { position: relative; width: 100%; min-height: 100vh; margin: 0 auto; padding: 22px 16px 34px; background: oklch(98% 0.006 85); box-shadow: 0 0 40px rgb(55 45 32 / 8%); }
.criar-outra { display: block; margin: 22px auto 0; color: inherit; font-size: 11px; text-align: center; }
.estado-vazio { margin-top: 60px; padding: 28px; border: 1px solid oklch(75% 0.05 80 / 50%); border-radius: 14px; text-align: center; }
.estado-vazio h1 { margin-top: 0; font-size: 22px; }
.estado-vazio p { font-size: 12px; line-height: 1.6; }
.estado-vazio a { color: oklch(45% 0.13 15); font-size: 12px; font-weight: 700; }

@media (max-width: 370px) { .app-shell { max-width: 480px; padding-right: 11px; padding-left: 11px; } }
@media (min-width: 481px) { .app-shell { min-height: calc(100vh - 36px); margin-top: 18px; border-radius: 18px 18px 0 0; } }
@media (min-width: 1024px) { .app-shell { max-width: 100%; } }
</style>
