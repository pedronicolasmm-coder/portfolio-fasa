/* Portfolio FASA · monta as secoes a partir de dados.js */
(function () {
  var D = window.DADOS;
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  var ICO_PILHA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="13" height="13" rx="2"/><path d="M4 16V5a1 1 0 0 1 1-1h11"/></svg>';
  var ICO_PINO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.4"/></svg>';

  /* ---------- obras (pecas com variacoes de formato) ---------- */
  function obra(p) {
    var n = p.slides.length;
    var qtd = n > 1 ? '<span class="qtd">' + ICO_PILHA + n + (n > 1 ? " versões" : "") + "</span>" : "";
    var chips = p.formatos.map(function (f) { return '<span class="chip">' + esc(f) + "</span>"; }).join("");
    var b = document.createElement("button");
    b.type = "button";
    b.className = "obra revela";
    b.setAttribute("aria-label", "Ver " + p.titulo);
    b.innerHTML =
      '<span class="moldura">' + qtd +
      '<img src="' + p.capa + '" width="' + p.w + '" height="' + p.h + '" loading="lazy" decoding="async" alt="' + esc(p.titulo) + '"></span>' +
      '<span class="legenda"><h3>' + esc(p.titulo) + '</h3><span class="chips">' + chips + "</span></span>";
    b.addEventListener("click", function () { abrir(p.slides, p.titulo, p.formatos, 0); });
    return b;
  }
  function preencher(id, lista) {
    var alvo = document.getElementById(id);
    if (!alvo) return;
    lista.forEach(function (p) { alvo.appendChild(obra(p)); });
  }
  preencher("obras-inverno", D.secoes.inverno);
  preencher("obras-vestibular", D.secoes.vestibular);
  preencher("obras-cursos", D.secoes.cursos);
  preencher("obras-summit", D.secoes.summit);
  preencher("obras-institucional", D.secoes.institucional);

  /* ---------- redacao ---------- */
  var frases = $("#frases");
  D.copy.forEach(function (t) {
    var q = document.createElement("blockquote");
    q.textContent = t;
    frases.appendChild(q);
  });

  /* ---------- crachas do Summit ---------- */
  var crachas = $("#crachas");
  var slidesCrachas = D.secoes.crachas.map(function (p) { return p.slides[0]; });
  D.secoes.crachas.forEach(function (p, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "cracha revela";
    b.setAttribute("aria-label", "Ver crachá " + p.titulo);
    b.innerHTML = '<img src="' + p.capa + '" loading="lazy" decoding="async" alt="Organização confirmada: ' + esc(p.titulo) + '"><span>' + esc(p.titulo) + "</span>";
    b.addEventListener("click", function () {
      abrir(slidesCrachas, "Organização confirmada", ["Feed 4:5"], i, D.secoes.crachas.map(function (c) { return c.titulo; }));
    });
    crachas.appendChild(b);
  });

  /* ---------- escolas ---------- */
  var lista = $("#lista-escolas");
  var todasEscolas = [D.abertura].concat(D.escolas);
  todasEscolas.forEach(function (e, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "escola revela";
    var cidade = e.cidade || (i === 0 ? "Abertura da série" : "Noroeste do RS");
    b.setAttribute("aria-label", "Ver carrossel " + e.titulo + ", " + cidade);
    b.innerHTML =
      '<img src="' + e.capa + '" loading="lazy" decoding="async" alt="' + esc(e.titulo) + '">' +
      (e.slides.length > 1 ? '<span class="qtd">' + ICO_PILHA + e.slides.length + "</span>" : "") +
      '<span class="escola-txt"><b>' + esc(e.titulo) + "</b><span>" + ICO_PINO + esc(cidade) + "</span></span>";
    b.addEventListener("click", function () {
      abrir(e.slides, e.titulo + (e.cidade ? " · " + e.cidade : ""), ["Carrossel"], 0);
    });
    lista.appendChild(b);
  });
  var cidades = {};
  D.escolas.forEach(function (e) { if (e.cidade) cidades[e.cidade] = 1; });
  var caixa = $("#cidades");
  Object.keys(cidades).sort(function (a, b) { return a.localeCompare(b, "pt"); }).forEach(function (c) {
    var s = document.createElement("span");
    s.textContent = c;
    caixa.appendChild(s);
  });

  /* ---------- campus ---------- */
  var bento = $("#bento");
  var fotos = D.campus.filter(function (f) { return f.id !== "hero"; });
  fotos.forEach(function (f, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "b" + (i + 1) + " revela";
    b.setAttribute("aria-label", "Ampliar foto: " + f.alt);
    b.innerHTML = '<img src="' + f.t + '" loading="lazy" decoding="async" alt="' + esc(f.alt) + '">';
    b.addEventListener("click", function () {
      abrir(fotos.map(function (x) { return x.g; }), "Campus", ["Fotografia"], i, fotos.map(function (x) { return x.alt; }));
    });
    bento.appendChild(b);
  });

  /* ---------- contadores dos atalhos ---------- */
  var soma = function (arr) { return arr.reduce(function (t, p) { return t + p.slides.length; }, 0); };
  var contas = {
    vestibular: soma(D.secoes.inverno) + soma(D.secoes.vestibular),
    cursos: soma(D.secoes.cursos),
    summit: soma(D.secoes.summit) + soma(D.secoes.crachas),
    escolas: todasEscolas.length
  };
  document.querySelectorAll("[data-conta]").forEach(function (el) { el.textContent = contas[el.dataset.conta]; });

  /* ---------- visualizador ---------- */
  var lupa = $("#lupa"), img = $("#lupa-img"), tit = $("#lupa-tit"), cont = $("#lupa-cont"),
      base = $("#lupa-base"), atual = { slides: [], i: 0, titulos: null }, focoAntes = null;

  function mostrar(i) {
    var n = atual.slides.length;
    atual.i = (i + n) % n;
    img.src = atual.slides[atual.i];
    var t = atual.titulos ? atual.titulos[atual.i] : atual.titulo;
    tit.textContent = t;
    img.alt = t;
    cont.textContent = n > 1 ? (atual.i + 1) + " / " + n : "";
    $("#lupa-ant").hidden = n < 2;
    $("#lupa-prox").hidden = n < 2;
    // pre-carrega a proxima
    if (n > 1) { var pre = new Image(); pre.src = atual.slides[(atual.i + 1) % n]; }
  }
  function abrir(slides, titulo, formatos, i, titulos) {
    focoAntes = document.activeElement;
    atual = { slides: slides, i: 0, titulo: titulo, titulos: titulos || null };
    base.innerHTML = (formatos || []).map(function (f) { return '<span class="chip">' + esc(f) + "</span>"; }).join("");
    mostrar(i || 0);
    lupa.classList.add("on");
    document.body.style.overflow = "hidden";
    $("#lupa-x").focus();
  }
  function fechar() {
    lupa.classList.remove("on");
    document.body.style.overflow = "";
    img.src = "";
    if (focoAntes) focoAntes.focus();
  }
  $("#lupa-x").addEventListener("click", fechar);
  $("#lupa-ant").addEventListener("click", function () { mostrar(atual.i - 1); });
  $("#lupa-prox").addEventListener("click", function () { mostrar(atual.i + 1); });
  $("#lupa-palco").addEventListener("click", function (e) { if (e.target.id === "lupa-palco") fechar(); });
  document.addEventListener("keydown", function (e) {
    if (!lupa.classList.contains("on")) return;
    if (e.key === "Escape") fechar();
    if (e.key === "ArrowLeft") mostrar(atual.i - 1);
    if (e.key === "ArrowRight") mostrar(atual.i + 1);
  });
  var x0 = null;
  $("#lupa-palco").addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  $("#lupa-palco").addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45 && atual.slides.length > 1) mostrar(atual.i + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  /* ---------- menu e cabecalho ---------- */
  var menu = $("#menu"), hamb = $("#hamb"), cab = $("#cab");
  hamb.addEventListener("click", function () {
    var aberto = menu.classList.toggle("aberto");
    hamb.setAttribute("aria-expanded", aberto ? "true" : "false");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { menu.classList.remove("aberto"); hamb.setAttribute("aria-expanded", "false"); }
  });
  var marcarRolagem = function () { cab.classList.toggle("rolou", window.scrollY > 40); };
  window.addEventListener("scroll", marcarRolagem, { passive: true });
  marcarRolagem();

  /* ---------- efeitos ao rolar ---------- */
  var semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window) {
    var obsRevela = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visto"); obsRevela.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    document.querySelectorAll(".revela").forEach(function (el) { obsRevela.observe(el); });

    var links = {};
    menu.querySelectorAll("a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var mapa = { inverno: "inverno", vestibular: "inverno", cursos: "cursos", summit: "summit",
                 escolas: "escolas", campus: "campus", institucional: "campus" };
    var obsSecao = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.remove("ativo"); });
        var alvo = links[mapa[en.target.id]];
        if (alvo) alvo.classList.add("ativo");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(mapa).forEach(function (id) { var s = document.getElementById(id); if (s) obsSecao.observe(s); });

    if (!semMovimento) {
      var obsNum = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target, alvo = +el.dataset.alvo, t0 = null;
          obsNum.unobserve(el);
          var passo = function (t) {
            if (!t0) t0 = t;
            var k = Math.min(1, (t - t0) / 1100);
            el.textContent = Math.round(alvo * (1 - Math.pow(1 - k, 3)));
            if (k < 1) requestAnimationFrame(passo);
          };
          requestAnimationFrame(passo);
        });
      }, { threshold: .6 });
      document.querySelectorAll("[data-alvo]").forEach(function (el) { obsNum.observe(el); });
    }
  } else {
    document.querySelectorAll(".revela").forEach(function (el) { el.classList.add("visto"); });
  }
})();
