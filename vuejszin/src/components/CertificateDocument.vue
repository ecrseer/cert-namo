<template>
  <article class="documento" :style="{ '--accent': accentColor }">
    <div class="fita">Selo de Qualidade</div>

    <h1>Certidão de Namoro</h1>

    <p>Livro do Coração — Folha Única</p>

    <div class="divisoria"></div>

    <p class="introducao">
      Certificamos, para os devidos fins de direito (nenhum), que
    </p>

    <input
      v-if="editable"
      :value="certificate.partnerOneName"
      class="campo-nome"
      aria-label="Nome da primeira pessoa"
      placeholder="Fulana(o)"
      maxlength="38"
      @input="updateField('partnerOneName', $event.target.value)"
    />
    <p v-else class="nome-publico">
      {{ certificate.partnerOneName || "Fulana(o)" }}
    </p>

    <p class="conector">e</p>

    <input
      v-if="editable"
      :value="certificate.partnerTwoName"
      class="campo-nome"
      aria-label="Nome da segunda pessoa"
      placeholder="Ciclana(o)"
      maxlength="38"
      @input="updateField('partnerTwoName', $event.target.value)"
    />
    <p v-else class="nome-publico">
      {{ certificate.partnerTwoName || "Ciclana(o)" }}
    </p>

    <p class="texto-legal">
      doravante denominados “o Casal”, firmam união amorosa em
      <input
        v-if="editable"
        :value="certificate.location"
        class="campo-inline campo-local"
        aria-label="Local especial"
        placeholder="algum lugar especial"
        maxlength="48"
        @input="updateField('location', $event.target.value)"
      />
      <strong v-else class="valor-publico">{{
        certificate.location || "algum lugar especial"
      }}</strong
      >, com efeitos retroativos a partir de
      <input
        v-if="editable"
        :value="certificate.coupleDate"
        class="campo-inline campo-data"
        aria-label="Data de início do namoro"
        type="date"
        @input="updateField('coupleDate', $event.target.value)"
      />
      <strong v-else class="valor-publico">{{ formattedDate }}</strong
      >.
    </p>

    <section class="clausula">
      <h2>Cláusula única</h2>
      <p>
        O presente vínculo obriga ambas as partes a dividir a batata frita,
        assistir séries no mesmo ritmo e jamais dormir de mau humor, sob pena de
        multa em forma de abraço.
      </p>
    </section>

    <section class="assinaturas">
      <div class="assinatura">
        <span>{{ certificate.partnerOneName || "Fulana(o)" }}</span>
        <small>Assinatura</small>
      </div>
      <div class="selo">Cartório<br />do Amor</div>
      <div class="assinatura">
        <span>{{ certificate.partnerTwoName || "Ciclana(o)" }}</span>
        <small>Assinatura</small>
      </div>
    </section>

    <section class="validacao">
      <div class="qr-falso" aria-hidden="true">
        <i
          v-for="index in 36"
          :key="index"
          :class="{ preenchido: filledSquares.has(index) }"
        ></i>
      </div>
      <span>Código de validação<br />(não escaneia nada)</span>
    </section>

    <footer>
      Documento sem valor jurídico. Vale só o amor (e o print pra story).
    </footer>
  </article>
</template>

<script setup>
import { computed } from "vue";
import { accentColors } from "../certificate";

const props = defineProps({
  certificate: { type: Object, required: true },
  editable: { type: Boolean, default: false },
});

const emit = defineEmits(["update"]);

const filledSquares = new Set([
  1, 2, 3, 6, 7, 9, 11, 12, 13, 15, 16, 18, 21, 23, 24, 25, 27, 30, 31, 32, 34,
  36,
]);
const accentColor = computed(
  () => accentColors[props.certificate.accentKey] || accentColors.burgundy,
);
const formattedDate = computed(() => formatDate(props.certificate.coupleDate));

function updateField(field, value) {
  emit("update", field, value);
}

function formatDate(date) {
  if (!date) return "__ / __ / ____";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
</script>
