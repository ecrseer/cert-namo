<template>
  <section class="clausula">
    <h2>Cláusula {{ number }}</h2>
    <textarea
      v-if="editable"
      :value="clause.text"
      class="texto-clausula"
      :aria-label="`Texto da cláusula ${number}`"
      rows="3"
      @input="emit('update-text', $event.target.value)"
    ></textarea>
    <p v-else :class="{ carregando: isLoading }">
      {{ isLoading ? "Carregando..." : clause.text }}
    </p>
    <button
      v-if="editable"
      class="remover-clausula"
      type="button"
      @click="emit('remove')"
    >
      remover
    </button>
  </section>
</template>

<script setup>
defineProps({
  clause: { type: Object, required: true },
  number: { type: Number, required: true },
  editable: { type: Boolean, default: false },
  isLoading: { type: Boolean, default: false },
});

const emit = defineEmits(["update-text", "remove"]);
</script>

<style scoped>
.clausula {
  margin: 0;
  padding: 12px 5px;
  border-top: 1px dashed oklch(60% 0.09 80 / 65%);
  border-bottom: 1px dashed oklch(60% 0.09 80 / 65%);
}
.clausula + .clausula {
  border-top: 0;
}
.clausula h2 {
  margin: 0 0 6px;
  color: var(--accent);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.clausula p,
.texto-clausula {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  border: 0;
  border-radius: 0;
  outline: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 9.5px;
  line-height: 1.6;
  text-align: center;
}
.texto-clausula {
  display: block;
  resize: vertical;
  border-bottom: 1px dashed transparent;
}
.texto-clausula:focus {
  border-bottom-color: var(--accent);
}
.remover-clausula {
  margin-top: 6px;
  padding: 0;
  border: 0;
  background: transparent;
  color: color-mix(in oklch, var(--accent), transparent 25%);
  font: inherit;
  font-size: 8px;
  text-decoration: underline;
}
</style>
