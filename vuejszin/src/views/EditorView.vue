<template>
  <main class="app-shell">
    <header class="cabecalho-app">
      <p>Certidão de Namorado</p>
      <span>Prova nao-oficial do seu amor</span>
    </header>

    <CertidaoDocumento :dados="dados" editavel @atualizar="atualizarCampo" />

    <section class="seletor-cores" aria-label="Cor de destaque">
      <span>Escolha a cor do selo</span>
      <div>
        <button
          v-for="(cor, chave) in coresDeDestaque"
          :key="chave"
          type="button"
          :aria-label="nomesDasCores[chave]"
          :aria-pressed="dados.accentKey === chave"
          :class="{ selecionada: dados.accentKey === chave }"
          :style="{ '--cor': cor }"
          @click="dados.accentKey = chave"
        ></button>
      </div>
    </section>

    <aside v-if="showBanner" class="banner">
      <p><strong>Em breve:</strong> editor completo pra mudar layout, fundo e fontes.</p>
      <button type="button" aria-label="Fechar aviso" @click="showBanner = false">×</button>
    </aside>

    <div class="espaco-acoes"></div>

    <div class="acoes" :style="{ '--accent': coresDeDestaque[dados.accentKey] }">
      <button class="botao-primario" type="button" @click="copiarLink">Copiar link da certidão</button>
      <button class="botao-secundario" type="button" @click="avisarDownload">baixar imagem em vez disso</button>
    </div>

    <Transition name="toast">
      <div v-if="toast" class="toast" role="status">{{ toast }}</div>
    </Transition>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import CertidaoDocumento from '../components/CertidaoDocumento.vue'
import { coresDeDestaque, criarSlug, dadosIniciais, salvarCertidao } from '../certidao'

const dados = reactive({ ...dadosIniciais })
const showBanner = ref(true)
const toast = ref('')
let temporizadorDoToast

const nomesDasCores = {
  burgundy: 'Vinho',
  gold: 'Dourado',
  teal: 'Verde-azulado',
}

function atualizarCampo(campo, valor) {
  dados[campo] = valor
}

async function copiarLink() {
  const slug = criarSlug(dados)
  salvarCertidao(slug, { ...dados })
  console.log("nvim")
  const url = `${window.location.origin}/c/${slug}`

  try {
    await navigator.clipboard.writeText(url)
    exibirToast('Link copiado! Cole no WhatsApp ou Instagram.')
  } catch {
    exibirToast(`Link criado: ${url}`)
  }
}

function avisarDownload() {
  exibirToast('Download de imagem chega em breve.')
}

function exibirToast(mensagem) {
  clearTimeout(temporizadorDoToast)
  toast.value = mensagem
  temporizadorDoToast = setTimeout(() => {
    toast.value = ''
  }, 2200)
}
</script>
