export const coresDeDestaque = {
  burgundy: 'oklch(45% 0.13 15)',
  gold: 'oklch(62% 0.13 80)',
  teal: 'oklch(50% 0.1 180)',
}

export const dadosIniciais = {
  nome1: '',
  nome2: '',
  data: '',
  local: '',
  accentKey: 'burgundy',
}

export function normalizarSlug(texto) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function criarSlug(dados) {
  const primeiroNome = normalizarSlug(dados.nome1 || 'fulano')
  const segundoNome = normalizarSlug(dados.nome2 || 'ciclano')
  return `${primeiroNome}-e-${segundoNome}`
}

export function salvarCertidao(slug, dados) {
  localStorage.setItem(`certidao:${slug}`, JSON.stringify(dados))
}

export function buscarCertidao(slug) {
  const certidaoSalva = localStorage.getItem(`certidao:${slug}`)
  return certidaoSalva ? JSON.parse(certidaoSalva) : null
}
