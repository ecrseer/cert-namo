<template>
  <article class="documento" :style="{ '--accent': accentColor }">
    <div class="fita">Selo de Qualidade</div>

    <h1>Certidão de Namoro</h1>

    <p>Livro do Coração — Folha Única</p>

    <div class="divisoria"></div>

    <p class="introducao">Certificamos, para os devidos fins de direito, que</p>

    <input
      v-if="editable"
      :value="certificate.partnerOneName"
      class="campo-nome"
      aria-label="Nome da primeira pessoa"
      placeholder="Fulana(o)"
      maxlength="38"
      @input="updateField('partnerOneName', $event.target.value)"
    />
    <p v-else class="nome-publico" :class="{ carregando: isLoading }">
      {{ isLoading ? "Carregando..." : certificate.partnerOneName || "Fulana(o)" }}
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
    <p v-else class="nome-publico" :class="{ carregando: isLoading }">
      {{ isLoading ? "Carregando..." : certificate.partnerTwoName || "Ciclana(o)" }}
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
      <strong v-else class="valor-publico" :class="{ carregando: isLoading }">{{
        isLoading ? "Carregando..." : certificate.location || "algum lugar especial"
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
      <strong v-else class="valor-publico" :class="{ carregando: isLoading }">{{
        isLoading ? "Carregando..." : formattedDate
      }}</strong
      >.
    </p>

    <CertificateClause
      v-for="(clause, index) in clauses"
      :key="clause.id"
      :clause="clause"
      :number="index + 1"
      :editable="editable"
      :is-loading="isLoading"
      @update-text="updateClauseText(clause.id, $event)"
      @remove="removeClause(clause.id)"
    />
    <button
      v-if="editable"
      class="adicionar-clausula"
      type="button"
      @click="addClause"
    >
      + Adicionar cláusula
    </button>

    <section class="assinaturas">
      <div class="assinatura">
        <span :class="{ carregando: isLoading }">{{
          isLoading ? "Carregando..." : certificate.partnerOneName || "Fulana(o)"
        }}</span>
        <small>Assinatura</small>
      </div>
      <div class="selo">Cartório<br />do Amor</div>
      <div class="assinatura">
        <span :class="{ carregando: isLoading }">{{
          isLoading ? "Carregando..." : certificate.partnerTwoName || "Ciclana(o)"
        }}</span>
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
import CertificateClause from "./CertificateClause.vue";

const props = defineProps({
  certificate: { type: Object, required: true },
  editable: { type: Boolean, default: false },
  isLoading: { type: Boolean, default: false },
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
const clauses = computed(() => props.certificate.clauses || []);

function updateField(field, value) {
  emit("update", field, value);
}

function addClause() {
  updateField("clauses", [
    ...clauses.value,
    { id: crypto.randomUUID(), text: "" },
  ]);
}

function updateClauseText(clauseId, text) {
  updateField(
    "clauses",
    clauses.value.map((clause) =>
      clause.id === clauseId ? { ...clause, text } : clause,
    ),
  );
}

function removeClause(clauseId) {
  updateField(
    "clauses",
    clauses.value.filter((clause) => clause.id !== clauseId),
  );
}

function formatDate(date) {
  if (!date) return "__ / __ / ____";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
</script>

<style scoped>
.documento {
  position: relative;
  overflow: hidden;
  padding: 27px 22px 19px;
  border: 2px solid oklch(60% 0.09 80);
  border-radius: 16px;
  outline: 1px solid oklch(60% 0.09 80 / 45%);
  outline-offset: -7px;
  background: oklch(97% 0.012 85);
  box-shadow: 0 10px 30px rgb(71 56 32 / 9%);
  text-align: center;
}
.fita {
  position: absolute;
  z-index: 1;
  top: 14px;
  right: -30px;
  width: 112px;
  padding: 4px 0;
  transform: rotate(45deg);
  background: var(--accent);
  color: white;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.documento h1 {
  margin: 12px 0 8px;
  font-size: clamp(23px, 6vw, 28px);
  line-height: 1.1;
}
.divisoria {
  width: 54px;
  height: 2px;
  margin: 0 auto 13px;
  background: var(--accent);
}
.introducao {
  margin: 0 5px 9px;
  font-size: 11px;
  font-style: italic;
  line-height: 1.5;
}
.campo-nome,
.nome-publico {
  display: block;
  width: min(92%, 330px);
  min-height: 45px;
  margin: 0 auto;
  border: 0;
  border-bottom: 1px dashed color-mix(in oklch, var(--accent), transparent 45%);
  outline: 0;
  background: transparent;
  color: var(--accent);
  font-family: "Great Vibes", cursive;
  font-size: clamp(32px, 9vw, 40px);
  line-height: 1.1;
  text-align: center;
}
.campo-nome::placeholder {
  color: color-mix(in oklch, var(--accent), transparent 50%);
  opacity: 1;
}
.nome-publico {
  border-bottom-color: transparent;
}
.carregando {
  opacity: 0.58;
}
.conector {
  margin: 1px 0;
  font-size: 11px;
  font-style: italic;
}
.texto-legal {
  margin: 15px 0 16px;
  font-size: 11px;
  line-height: 2.05;
  text-align: justify;
}
.campo-inline {
  border: 0;
  border-bottom: 1px dashed var(--accent);
  border-radius: 0;
  outline: 0;
  background: transparent;
  color: inherit;
  font-size: 10px;
  font-weight: 700;
  text-align: center;
}
.campo-local {
  width: 126px;
}
.campo-data {
  width: 111px;
  color-scheme: light;
}
.valor-publico {
  border-bottom: 1px dashed var(--accent);
}
.adicionar-clausula {
  display: block;
  margin: 10px auto 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--accent);
  font: inherit;
  font-size: 9px;
  text-decoration: underline;
}
.assinaturas {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 66px minmax(0, 1fr);
  align-items: end;
  gap: 8px;
  margin: 22px 0 18px;
}
.assinatura span {
  display: block;
  overflow: hidden;
  padding: 0 2px 2px;
  border-bottom: 1px solid oklch(40% 0.02 45 / 60%);
  font-family: "Great Vibes", cursive;
  font-size: 19px;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.assinatura small {
  display: block;
  margin-top: 4px;
  font-size: 7px;
  opacity: 0.58;
}
.selo {
  display: grid;
  width: 61px;
  height: 61px;
  place-content: center;
  border: 1.5px dashed var(--accent);
  border-radius: 50%;
  transform: rotate(-8deg);
  color: var(--accent);
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.09em;
  line-height: 1.35;
  text-transform: uppercase;
}
.validacao {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.qr-falso {
  display: grid;
  width: 36px;
  height: 36px;
  padding: 2px;
  border: 1px solid oklch(25% 0 0);
  grid-template-columns: repeat(6, 1fr);
  gap: 1px;
  background: white;
}
.qr-falso i {
  display: block;
  background: white;
}
.qr-falso i.preenchido {
  background: oklch(18% 0 0);
}
.validacao span {
  font-size: 7px;
  line-height: 1.45;
  opacity: 0.55;
  text-align: left;
}
.documento footer {
  margin-top: 15px;
  font-size: 9px;
  font-style: italic;
  opacity: 0.5;
}
.documento p:not(.nome-publico) {
  font-size: 0.842rem;
}

@media (max-width: 370px) {
  .documento {
    padding-right: 17px;
    padding-left: 17px;
  }
  .assinaturas {
    grid-template-columns: minmax(0, 1fr) 58px minmax(0, 1fr);
    gap: 5px;
  }
  .selo {
    width: 55px;
    height: 55px;
  }
}
@media (min-width: 1024px) {
  .documento p:not(.nome-publico) {
    font-size: 2rem;
  }
}
</style>
