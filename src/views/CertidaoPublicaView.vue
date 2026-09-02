<template>
  <main class="app-shell pagina-publica">
    <header class="cabecalho-app">
      <p>Certidão de Namorado</p>
      <span>Prova oficial (não really) do seu amor</span>
    </header>

    <CertidaoDocumento v-if="dados" :dados="dados" />

    <section v-else class="estado-vazio">
      <h1>Certidão não encontrada</h1>
      <p>Este link não existe neste navegador ou a certidão ainda não foi criada.</p>
      <RouterLink to="/">Criar uma certidão</RouterLink>
    </section>

    <RouterLink v-if="dados" class="criar-outra" to="/">Criar outra certidão</RouterLink>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import CertidaoDocumento from '../components/CertidaoDocumento.vue'
import { buscarCertidao } from '../certidao'

const route = useRoute()
const dados = ref(buscarCertidao(route.params.slug))
</script>
