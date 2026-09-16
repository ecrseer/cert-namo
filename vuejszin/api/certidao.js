export function GET(request) {
  const id = new URL(request.url).searchParams.get('id') || 'demonstracao'
  const certidao = {
    id,
    nome1: 'Fulana(o)',
    nome2: 'Ciclana(o)',
    data: '__/__/____',
    local: 'algum lugar especial',
    cor: '#963a4d',
  }

  return new Response(montarHtmlDaCertidao(certidao), {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      'Content-Type': 'text/html; charset=utf-8',
    },
  })
}

function montarHtmlDaCertidao(certidao) {
  const nome1 = escaparHtml(certidao.nome1)
  const nome2 = escaparHtml(certidao.nome2)
  const data = escaparHtml(certidao.data)
  const local = escaparHtml(certidao.local)
  const id = escaparHtml(certidao.id)
  const cor = escaparHtml(certidao.cor)

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#f5f0e6" />
    <title>Certidão de Namoro</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
    <style>
      :root { color: #453d38; background: #eeeae2; font-family: 'Playfair Display', Georgia, serif; font-synthesis: none; }
      * { box-sizing: border-box; }
      body { min-width: 320px; min-height: 100vh; margin: 0; background: #eeeae2; }
      main { width: 100%; max-width: 480px; min-height: 100vh; margin: 0 auto; padding: 22px 16px 34px; background: #faf8f3; box-shadow: 0 0 40px rgb(55 45 32 / 8%); }
      .documento { position: relative; overflow: hidden; padding: 27px 22px 19px; border: 2px solid #b09565; border-radius: 16px; outline: 1px solid rgb(176 149 101 / 45%); outline-offset: -7px; background: #faf6e9; box-shadow: 0 10px 30px rgb(71 56 32 / 9%); text-align: center; }
      .fita { position: absolute; top: 14px; right: -30px; width: 112px; padding: 4px 0; transform: rotate(45deg); background: ${cor}; color: white; font-size: 7px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
      .cartorio p { margin: 0; font-size: 12px; font-weight: 600; letter-spacing: .13em; line-height: 1.55; opacity: .75; text-transform: uppercase; }
      h1 { margin: 12px 0 8px; font-size: clamp(23px, 6vw, 28px); line-height: 1.1; }
      .divisoria { width: 54px; height: 2px; margin: 0 auto 13px; background: ${cor}; }
      .introducao { margin: 0 5px 9px; font-size: 12px; font-style: italic; line-height: 1.5; }
      .nome { min-height: 45px; margin: 0 auto; color: ${cor}; font-family: 'Great Vibes', cursive; font-size: clamp(32px, 9vw, 40px); line-height: 1.1; }
      .conector { margin: 1px 0; font-size: 12px; font-style: italic; }
      .texto-legal { margin: 15px 0 16px; font-size: 12px; line-height: 2.05; text-align: justify; }
      .valor { border-bottom: 1px dashed ${cor}; }
      .clausula { padding: 12px 5px; border-top: 1px dashed rgb(176 149 101 / 65%); border-bottom: 1px dashed rgb(176 149 101 / 65%); }
      .clausula h2 { margin: 0 0 6px; color: ${cor}; font-size: 9px; letter-spacing: .14em; text-transform: uppercase; }
      .clausula p { margin: 0; font-size: 12px; line-height: 1.6; }
      .assinaturas { display: grid; grid-template-columns: minmax(0, 1fr) 66px minmax(0, 1fr); align-items: end; gap: 8px; margin: 22px 0 18px; }
      .assinatura strong { display: block; overflow: hidden; padding: 0 2px 2px; border-bottom: 1px solid rgb(74 66 61 / 60%); font-family: 'Great Vibes', cursive; font-size: 19px; font-weight: 400; line-height: 1; text-overflow: ellipsis; white-space: nowrap; }
      .assinatura small { display: block; margin-top: 4px; font-size: 7px; opacity: .58; }
      .selo { display: grid; width: 61px; height: 61px; place-content: center; border: 1.5px dashed ${cor}; border-radius: 50%; transform: rotate(-8deg); color: ${cor}; font-size: 7px; font-weight: 700; letter-spacing: .09em; line-height: 1.35; text-transform: uppercase; }
      footer { margin-top: 15px; font-size: 9px; font-style: italic; opacity: .5; }
      footer small { display: block; margin-top: 4px; }
      @media (max-width: 370px) {
        main { padding-right: 11px; padding-left: 11px; }
        .documento { padding-right: 17px; padding-left: 17px; }
        .assinaturas { grid-template-columns: minmax(0, 1fr) 58px minmax(0, 1fr); gap: 5px; }
        .selo { width: 55px; height: 55px; }
      }
    </style>
  </head>
  <body>
    <main>
      <article class="documento">
        <div class="fita">Selo Oficial</div>
        <header class="cartorio">
          <p>Cartório de Registro Amoroso</p>
          <p>Livro do Coração — Folha Única</p>
        </header>
        <h1>Certidão de Namoro</h1>
        <div class="divisoria"></div>
        <p class="introducao">Certificamos, para os devidos fins de direito (nenhum), que</p>
        <p class="nome">${nome1}</p>
        <p class="conector">e</p>
        <p class="nome">${nome2}</p>
        <p class="texto-legal">doravante denominados “o Casal”, firmam união amorosa em <strong class="valor">${local}</strong>, com efeitos retroativos a partir de <strong class="valor">${data}</strong>.</p>
        <section class="clausula">
          <h2>Cláusula única</h2>
          <p>O presente vínculo obriga ambas as partes a dividir a batata frita, assistir séries no mesmo ritmo e jamais dormir de mau humor, sob pena de multa em forma de abraço.</p>
        </section>
        <section class="assinaturas">
          <div class="assinatura"><strong>${nome1}</strong><small>Assinatura</small></div>
          <div class="selo">Cartório<br />do Amor</div>
          <div class="assinatura"><strong>${nome2}</strong><small>Assinatura</small></div>
        </section>
        <footer>Documento sem valor jurídico. Vale só o amor (e o print pra story).<small>Certidão ${id}</small></footer>
      </article>
    </main>
  </body>
</html>`
}

function escaparHtml(texto) {
  return String(texto)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
