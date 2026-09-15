<template>
  <main class="app-shell">
    <CertificateDocument
      :certificate="certificate"
      editable
      @update="updateField"
    />

    <section class="seletor-cores" aria-label="Cor de destaque">
      <span>Escolha a cor do selo</span>
      <div>
        <button
          v-for="(color, key) in accentColors"
          :key="key"
          type="button"
          :aria-label="colorNames[key]"
          :aria-pressed="certificate.accentKey === key"
          :class="{ selecionada: certificate.accentKey === key }"
          :style="{ '--color': color }"
          @click="certificate.accentKey = key"
        ></button>
      </div>
    </section>

    <aside v-if="showBanner" class="banner">
      <p>Adicione foto do casal: Crie um perfil!</p>
      <button
        type="button"
        aria-label="Fechar aviso"
        @click="showBanner = false"
      >
        ×
      </button>
    </aside>

    <div class="espaco-acoes"></div>

    <div
      class="acoes"
      :style="{ '--accent': accentColors[certificate.accentKey] }"
    >
      <button
        class="botao-primario"
        type="button"
        :disabled="isSaving"
        @click="createAndCopyLink"
      >
        {{ isSaving ? "Salvando..." : "Firmar namoro" }}
      </button>
      <div class="botao-secundario">
        <p>Livro do Coração — Folha Única</p>
      </div>
    </div>

    <Transition name="toast">
      <div v-if="toast" class="toast" role="status">{{ toast }}</div>
    </Transition>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";
import CertificateDocument from "../components/CertificateDocument.vue";
import {
  accentColors,
  createCertificate,
  initialCertificate,
} from "../certificate";

const certificate = reactive({ ...initialCertificate });
const showBanner = ref(true);
const toast = ref("");
const isSaving = ref(false);
let toastTimer;

const colorNames = {
  burgundy: "Vinho",
  gold: "Dourado",
  teal: "Verde-azulado",
};

function updateField(field, value) {
  certificate[field] = value;
}

async function createAndCopyLink() {
  if (
    !certificate.partnerOneName.trim() ||
    !certificate.partnerTwoName.trim()
  ) {
    showToast("Preencha os dois nomes.");
    return;
  }

  if (!certificate.coupleDate) {
    showToast("Preencha a data de início do namoro.");
    return;
  }

  console.log("nvim");
  isSaving.value = true;

  try {
    const createdCertificate = await createCertificate({
      ...certificate,
      partnerOneName: certificate.partnerOneName.trim(),
      partnerTwoName: certificate.partnerTwoName.trim(),
      location: certificate.location.trim(),
    });
    const url = `${window.location.origin}/c/${createdCertificate.publicId}`;

    try {
      await navigator.clipboard.writeText(url);
      showToast("Link copiado! Cole no WhatsApp ou Instagram.");
    } catch {
      showToast(`Link criado: ${url}`);
    }
  } catch (error) {
    console.warn("cdnVvv::: \n" + error);
    showToast(error.message || "Não foi possível salvar a certidão.");
  } finally {
    isSaving.value = false;
  }
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.value = message;
  toastTimer = setTimeout(() => {
    toast.value = "";
  }, 2200);
}
</script>
