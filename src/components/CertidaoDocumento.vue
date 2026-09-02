<template>
  <article class="documento" :style="{ '--accent': corDeDestaque }">
    <div class="fita">Selo Oficial</div>

    <header class="cabecalho-cartorio">
      <p>Cartório de Registro Amoroso</p>
      <p>Livro do Coração — Folha Única</p>
    </header>

    <h1>Certidão de Namoro</h1>
    <div class="divisoria"></div>
    <p class="introducao">Certificamos, para os devidos fins de direito (nenhum), que</p>

    <input
      v-if="editavel"
      :value="dados.nome1"
      class="campo-nome"
      aria-label="Nome da primeira pessoa"
      placeholder="Fulana(o)"
      maxlength="38"
      @input="atualizarCampo('nome1', $event.target.value)"
    />
    <p v-else class="nome-publico">{{ dados.nome1 || 'Fulana(o)' }}</p>

    <p class="conector">e</p>

    <input
      v-if="editavel"
      :value="dados.nome2"
      class="campo-nome"
      aria-label="Nome da segunda pessoa"
      placeholder="Ciclana(o)"
      maxlength="38"
      @input="atualizarCampo('nome2', $event.target.value)"
    />
    <p v-else class="nome-publico">{{ dados.nome2 || 'Ciclana(o)' }}</p>

    <p class="texto-legal">
      doravante denominados “o Casal”, firmam união amorosa em
      <input
        v-if="editavel"
        :value="dados.local"
        class="campo-inline campo-local"
        aria-label="Local especial"
        placeholder="algum lugar especial"
        maxlength="48"
        @input="atualizarCampo('local', $event.target.value)"
      />
      <strong v-else class="valor-publico">{{ dados.local || 'algum lugar especial' }}</strong>,
      com efeitos retroativos a partir de
      <input
        v-if="editavel"
        :value="dados.data"
        class="campo-inline campo-data"
        aria-label="Data de início do namoro"
        type="date"
        @input="atualizarCampo('data', $event.target.value)"
      />
      <strong v-else class="valor-publico">{{ dataFormatada }}</strong>.
    </p>

    <section class="clausula">
      <h2>Cláusula única</h2>
      <p>O presente vínculo obriga ambas as partes a dividir a batata frita, assistir séries no mesmo ritmo e jamais dormir de mau humor, sob pena de multa em forma de abraço.</p>
    </section>

    <section class="assinaturas">
      <div class="assinatura">
        <span>{{ dados.nome1 || 'Fulana(o)' }}</span>
        <small>Assinatura</small>
      </div>
      <div class="selo">Cartório<br />do Amor</div>
      <div class="assinatura">
        <span>{{ dados.nome2 || 'Ciclana(o)' }}</span>
        <small>Assinatura</small>
      </div>
    </section>

    <section class="validacao">
      <div class="qr-falso" aria-hidden="true">
        <i v-for="indice in 36" :key="indice" :class="{ preenchido: quadradosPreenchidos.has(indice) }"></i>
      </div>
      <span>Código de validação<br />(não escaneia nada)</span>
    </section>

    <footer>Documento sem valor jurídico. Vale só o amor (e o print pra story).</footer>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { coresDeDestaque } from '../certidao'

const props = defineProps({
  dados: { type: Object, required: true },
  editavel: { type: Boolean, default: false },
})

const emit = defineEmits(['atualizar'])

const quadradosPreenchidos = new Set([1, 2, 3, 6, 7, 9, 11, 12, 13, 15, 16, 18, 21, 23, 24, 25, 27, 30, 31, 32, 34, 36])
const corDeDestaque = computed(() => coresDeDestaque[props.dados.accentKey] || coresDeDestaque.burgundy)
const dataFormatada = computed(() => formatarData(props.dados.data))

function atualizarCampo(campo, valor) {
  emit('atualizar', campo, valor)
}

function formatarData(data) {
  if (!data) return '__ / __ / ____'
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}
</script>
