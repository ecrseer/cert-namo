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
import { useRouter } from "vue-router";
import CertificateDocument from "../components/CertificateDocument.vue";
import {
  accentColors,
  createCertificate,
  initialCertificate,
} from "../certificate";

const certificate = reactive({ ...initialCertificate });
const router = useRouter();
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
    await router.push({
      path: `/c/${encodeURIComponent(createdCertificate.publicId)}`,
    });
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

<style scoped>
.app-shell {
  position: relative;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 22px 16px 0;
  background: oklch(98% 0.006 85);
  box-shadow: 0 0 40px rgb(55 45 32 / 8%);
}
.seletor-cores {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 17px 3px;
}
.seletor-cores > span {
  font-size: 11px;
  font-style: italic;
  opacity: 0.72;
}
.seletor-cores > div {
  display: flex;
  gap: 11px;
}
.seletor-cores button {
  width: 25px;
  height: 25px;
  padding: 0;
  border: 4px solid oklch(98% 0.006 85);
  border-radius: 50%;
  background: var(--color);
  box-shadow: 0 0 0 1px oklch(45% 0.02 45 / 22%);
  cursor: pointer;
}
.seletor-cores button.selecionada {
  box-shadow: 0 0 0 2px var(--color);
}
.banner {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 17px;
  padding: 11px 12px;
  border: 1px solid oklch(75% 0.05 80 / 50%);
  border-radius: 10px;
  background: oklch(95% 0.025 85);
}
.banner p {
  flex: 1;
  margin: 0;
  font-size: 10px;
  line-height: 1.45;
}
.banner button {
  align-self: flex-start;
  padding: 0 2px;
  border: 0;
  background: transparent;
  font-size: 19px;
  line-height: 1;
  opacity: 0.55;
  cursor: pointer;
}
.espaco-acoes {
  height: 114px;
}
.acoes {
  position: fixed;
  z-index: 10;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: auto;
  padding: 11px 16px max(12px, env(safe-area-inset-bottom));
  border-top: 1px solid oklch(75% 0.025 75 / 35%);
  background: oklch(98% 0.006 85 / 92%);
  backdrop-filter: blur(12px);
}
.botao-primario {
  width: 100%;
  padding: 13px 18px;
  border: 0;
  border-radius: 10px;
  background: var(--accent);
  color: white;
  font-weight: 700;
  cursor: pointer;
}
.botao-secundario {
  display: block;
  margin: 8px auto 0;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 10px;
  text-decoration: underline;
  opacity: 0.62;
  cursor: pointer;
}
.toast {
  position: fixed;
  z-index: 20;
  right: 20px;
  bottom: 105px;
  left: 20px;
  max-width: 390px;
  margin: auto;
  padding: 11px 15px;
  border-radius: 9px;
  background: oklch(25% 0.02 45);
  color: white;
  box-shadow: 0 8px 24px rgb(30 20 10 / 24%);
  font-size: 11px;
  text-align: center;
}
.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 370px) {
  .app-shell {
    max-width: 480px;
    padding-right: 11px;
    padding-left: 11px;
  }
  .acoes {
    max-width: 480px;
  }
}
@media (min-width: 481px) {
  .app-shell {
    min-height: calc(100vh - 36px);
    margin-top: 18px;
    border-radius: 18px 18px 0 0;
  }
}
@media (min-width: 1024px) {
  .app-shell,
  .acoes {
    width: 100%;
    max-width: 100%;
  }
}
</style>
