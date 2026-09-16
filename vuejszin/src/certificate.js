export const accentColors = {
  burgundy: "oklch(45% 0.13 15)",
  gold: "oklch(62% 0.13 80)",
  teal: "oklch(50% 0.1 180)",
};

export const defaultClauseText =
  "O presente vínculo obriga ambas as partes a dividir a batata frita, assistir séries no mesmo ritmo e jamais dormir de mau humor, sob pena de multa em forma de abraço.";

export function createInitialCertificate() {
  return {
    partnerOneName: "",
    partnerTwoName: "",
    coupleDate: "",
    location: "",
    accentKey: "burgundy",
    clauses: [
      {
        id: crypto.randomUUID(),
        text: defaultClauseText,
      },
    ],
  };
}

export const initialCertificate = createInitialCertificate();

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "/vrcel" : "https://cert-namo.onrender.com");

async function request(path, options) {
  const response = await fetch(`${apiBaseUrl}${path}`, options);

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message = Array.isArray(payload?.message)
      ? payload.message.join(", ")
      : payload?.message;
    throw new Error(message || "Não foi possível acessar o certificado.");
  }

  return await response.json();
}

export function createCertificate(certificate) {
  return request("/certificates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(certificate),
  });
}

export function getCertificate(publicId) {
  return request(`/certificates/${encodeURIComponent(publicId)}`);
}
