
Recrie em **Vue 3** (Composition API, `<script setup>`) o app abaixo. O protótipo de referência é um app mobile-first (viewport ~480px) que gera uma "Certidão de Namoro" falsa (pegadinha), com preview ao vivo do documento e link compartilhável.

## Stack sugerida
- Vue 3 + Vite
- Sem CSS framework necessário — estilos inline/scoped simples, mobile-first, `max-width: 480px` centralizado
- Google Fonts: `Playfair Display` (400/600/700, + italic) para corpo/legal, e `Great Vibes` (cursiva) para nomes e assinaturas
- Rota dinâmica opcional `/c/:slug` para exibir a certidão via link (ver "Persistência" abaixo)

## Estrutura da tela (single page, scroll vertical)
1. **Header**: título "Certidão de Namorado" (uppercase, letter-spacing, 12px) + subtítulo itálico "Prova oficial (não really) do seu amor".
2. **Preview do documento** (o coração do app): cartão com fundo `oklch(97% 0.012 85)`, borda dupla `2px solid oklch(60% 0.09 80)`, canto arredondado ~14–18px, padding interno. Contém, na ordem:
   - Fita/ribbon diagonal no canto superior direito: "Selo Oficial", rotação 45°, cor de destaque (accent), texto branco pequeno (~7px), posicionada para não sobrepor o cabeçalho.
   - Cabeçalho do "cartório": "Cartório de Registro Amoroso" / "Livro do Coração — Folha Única" (uppercase, pequeno, opacidade 0.75).
   - Título "Certidão de Namoro" (Playfair 700, ~26px).
   - Linha divisória curta na cor de destaque.
   - Texto: "Certificamos, para os devidos fins de direito (nenhum), que" (itálico).
   - **Nome 1** — INPUT de texto editável diretamente sobre o documento, estilo Great Vibes cursiva ~38px, cor accent, borda inferior tracejada, placeholder "Fulana(o)".
   - "e" (itálico, pequeno).
   - **Nome 2** — mesmo estilo do Nome 1, placeholder "Ciclana(o)".
   - Texto: 'doravante denominados "o Casal", firmam união amorosa em **[input Local]**, com efeitos retroativos a partir de **[input Data]**.' — Local é input de texto inline (placeholder "algum lugar especial"), Data é `<input type="date">` inline — ambos estilizados como texto sublinhado tracejado, não como campo de formulário tradicional.
   - **Cláusula única** (bloco com borda tracejada topo/baixo): título pequeno uppercase "Cláusula única" + texto cômico-jurídico: "O presente vínculo obriga ambas as partes a dividir a batata frita, assistir séries no mesmo ritmo e jamais dormir de mau humor, sob pena de multa em forma de abraço."
   - **Assinaturas**: duas colunas (nome 1 / nome 2) com linha em Great Vibes ~20px sobre borda inferior, label "Assinatura" abaixo; no centro, um selo circular tracejado rotacionado -8°, texto "CARTÓRIO DO AMOR" na cor accent.
   - **QR code decorativo falso**: grid 6x6 de quadrados pretos/brancos aleatórios (puramente visual, não escaneável) + texto "Código de validação (não escaneia nada)".
   - Rodapé legal: "Documento sem valor jurídico. Vale só o amor (e o print pra story)." (itálico, opacidade 0.5, ~9.5px).
3. **Seletor de cor de destaque**: 3 bolinhas clicáveis (Vinho `oklch(45% 0.13 15)`, Dourado `oklch(62% 0.13 80)`, Verde-azulado `oklch(50% 0.1 180)`), a selecionada tem anel de destaque.
4. **Banner "em breve"** (dismissable, com "x"): "Em breve: editor completo pra mudar layout, fundo e fontes."
5. **Barra de ações fixa no rodapé** (sticky bottom, thumb-friendly):
   - Botão primário grande, full-width, cor accent: **"Copiar link da certidão"** — gera uma URL (ex.: `https://.../c/{slug-nome1}-e-{slug-nome2}`), copia para clipboard (`navigator.clipboard.writeText`), mostra toast de confirmação "Link copiado! Cole no WhatsApp ou Instagram."
   - Link secundário discreto, texto sublinhado, sem destaque: **"baixar imagem em vez disso"** — ação secundária (pode ficar como stub/TODO; renderização em imagem é opcional, não é o foco do MVP).
6. **Toast**: mensagem flutuante centralizada, fixa perto do rodapé, desaparece após ~2.2s.

## Estado / dados
```
nome1: string
nome2: string
data: string (YYYY-MM-DD)
local: string
accentKey: 'burgundy' | 'gold' | 'teal'
showBanner: boolean
toast: string
```
- Nome exibido no documento faz fallback para "Fulana(o)" / "Ciclana(o)" quando vazio.
- Data exibida formatada `dd/mm/aaaa`, ou `__ / __ / ____` quando vazia.
- Local exibido com fallback "algum lugar especial".
- Slug do link: normalizar (remover acentos), lowercase, `nome1-e-nome2`.

## Persistência / compartilhamento (para o MVP web real)
O protótipo HTML só simula o link. Na versão Vue real, implemente:
- Ao gerar o link, salvar os dados da certidão (nome1, nome2, data, local, accentKey) no backend (ou num serviço simples de key-value) associados ao slug/id, e a rota `/c/:slug` deve buscar e renderizar a certidão somente-leitura (sem inputs) a partir desses dados.
- Se ainda não houver backend, ao menos persistir em localStorage por slug como fallback temporário.

## Estilo geral
- Fundo da página: `oklch(93% 0.01 85)` (bege claro), cartão do app centralizado `max-width: 480px` com fundo `oklch(98% 0.006 85)`.
- Tipografia: Playfair Display para todo o texto de UI e do documento; Great Vibes só para nomes/assinaturas.
- Cor de texto padrão do documento: `oklch(28% 0.02 45)`.
- Sem gradientes fortes, sem emojis, visual "cartório elegante" — não meme colorido.
- Mobile-first; testar em ~375–480px de largura.

## Fora do escopo do MVP (não implementar agora)
- Múltiplos temas/fundos (o MVP tem só o tema "elegante/cartório").
- Editor de layout.
- Download de imagem em alta fidelidade (fica como stub).
