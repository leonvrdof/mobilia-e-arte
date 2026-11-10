(function(){
  function porId(id){ return document.getElementById(id) || document.createElement('div'); }
  var STAR = function(s){return '<svg aria-hidden="true" width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="#F2B705"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/></svg>';};
  document.querySelectorAll('[data-stars]').forEach(function(el){ var s=el.getAttribute('data-stars'); el.innerHTML = STAR(s)+STAR(s)+STAR(s)+STAR(s)+STAR(s); });

  // ---- Instagram: fotos fixas, escolhidas do perfil (não atualizam sozinhas) ----
  var posts = [
    ['sala-painel-ripado','Sala com painel ripado e rack amadeirado'],
    ['cozinha-azul-corredor','Cozinha azul com torre amadeirada'],
    ['cozinha-branca-freijo','Cozinha americana branca com madeira'],
    ['banheiro-gabinete','Gabinete de banheiro com gavetas'],
    ['cozinha-clara','Cozinha clara com nicho amadeirado'],
    ['guarda-roupa-branco','Guarda-roupa branco de parede inteira'],
    ['cozinha-freijo-bancada','Cozinha com aéreos amadeirados e bancada'],
    ['cozinha-azul','Cozinha com armários azuis e bancada preta']
  ];
  var igIcon = '<svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>';
  var igEl = porId('insta'), igMax = +igEl.getAttribute('data-max') || posts.length;
  igEl.innerHTML = posts.slice(0, igMax).map(function(p){
    return '<li><a href="https://www.instagram.com/mobiliaearte.moveis/" aria-label="'+p[1]+', ver no Instagram"><img src="/img/'+p[0]+'.webp" alt="" loading="lazy" width="800" height="797"><span class="ov">'+igIcon+'</span></a></li>';
  }).join('');

  // ---- Avaliações reais do Google: textos fixos, copiados do perfil (não atualizam sozinhos) ----
  var cores = ['#2F4A66','#8A5A2B','#3D6B57','#6B4A7A','#9A4B3D','#2F5E73'];
  var revs = [
    ['Leticia Duarte','9 avaliações','5 meses atrás','Fez todos os móveis da minha casa, ótimo atendimento e qualidade.'],
    ['Letícia Di Beo','6 avaliações','1 ano atrás','O melhor marceneiro da região! Indico de olhos fechados!'],
    ['V A','Local Guide, 52 avaliações','1 ano atrás','Trabalho bom, honesto e bem feito.'],
    ['Sônia Rosalino','Local Guide, 35 avaliações','6 anos atrás','Melhor preço que achei na região, serviço executado dentro do prazo estipulado pela empresa, acabamento excelente eu recomendo.'],
    ['Vitoria Jenner','Local Guide, 13 avaliações','7 anos atrás','Gostei muito do serviço, achei que o material é de qualidade e o principal, o acabamento ficou ótimo! Achei o preço muito bom pelo que me entregaram.'],
    ['Patrícia Queiroz','Local Guide, 42 avaliações','7 anos atrás','Ótimo serviço e o preço é condizente com o que entregam!']
  ];
  porId('reviews').innerHTML = revs.map(function(r,i){
    var ini = r[0].split(' ').map(function(w){return w[0];}).slice(0,2).join('');
    return '<figure class="rev"><header><span class="av" aria-hidden="true" style="background:'+cores[i%cores.length]+'">'+ini+'</span><div><strong>'+r[0]+'</strong><span>'+r[1]+'</span></div></header>'+
      '<span class="stars" role="img" aria-label="5 de 5 estrelas">'+STAR(16)+STAR(16)+STAR(16)+STAR(16)+STAR(16)+'</span>'+
      '<blockquote>“'+r[3]+'”</blockquote><div class="meta"><span>'+r[2]+'</span><span>no Google</span></div></figure>';
  }).join('');

  // ---- Carrossel do topo ----
  (function(){
    var root = document.getElementById('carrossel'); if(!root) return;
    var TEMPO = 6000;
    var slides = [].slice.call(root.querySelectorAll('.slide'));
    var ind = root.querySelector('.car-ind'), dots = [].slice.call(ind.querySelectorAll('button'));
    var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var i = 0, tocando = !reduz, segurando = false, timer = null, inicio = 0, resta = TEMPO;
    var btnP = root.querySelector('[data-car="pausa"]'), ic = document.getElementById('car-ic');
    var PAUSE = '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>', PLAY = '<path d="M8 5l11 7-11 7z"/>';
    function para(){ if (timer){ clearTimeout(timer); timer = null; resta = Math.max(0, resta - (Date.now() - inicio)); } }
    function roda(){ if (timer || !tocando || segurando) return; inicio = Date.now(); timer = setTimeout(function(){ timer = null; show(i+1); }, resta); }
    function show(n){
      if (timer){ clearTimeout(timer); timer = null; }
      i = (n + slides.length) % slides.length; resta = TEMPO;
      slides.forEach(function(sl,k){ sl.classList.toggle('ativo', k===i); sl.setAttribute('aria-hidden', k===i ? 'false' : 'true'); });
      dots.forEach(function(d,k){ d.classList.remove('ativo'); d.classList.toggle('visto', k<i); d.setAttribute('aria-current', k===i ? 'true' : 'false'); });
      void dots[i].offsetWidth; dots[i].classList.add('ativo');
      document.getElementById('car-leg').textContent = slides[i].getAttribute('data-leg');
      roda();
    }
    function estado(){
      ind.classList.toggle('parado', !tocando);
      ind.classList.toggle('pausado', tocando && segurando);
      ic.innerHTML = tocando ? PAUSE : PLAY;
      btnP.setAttribute('aria-label', tocando ? 'Pausar fotos' : 'Continuar passando as fotos');
    }
    function segura(v){ segurando = v; estado(); if (v) para(); else roda(); }
    dots.forEach(function(d,k){ d.addEventListener('click', function(){ show(k); }); });
    root.querySelector('[data-car="ant"]').addEventListener('click', function(){ show(i-1); });
    root.querySelector('[data-car="prox"]').addEventListener('click', function(){ show(i+1); });
    btnP.addEventListener('click', function(){ tocando = !tocando; estado(); if (tocando) show(i); else para(); });
    var foto = root.querySelector('.carrossel');
    foto.addEventListener('mouseenter', function(){ segura(true); });
    foto.addEventListener('mouseleave', function(){ segura(false); });
    root.addEventListener('focusin', function(){ segura(true); });
    root.addEventListener('focusout', function(e){ if (!root.contains(e.relatedTarget)) segura(false); });
    var sx = null;
    foto.addEventListener('touchstart', function(e){ sx = e.touches[0].clientX; }, {passive:true});
    foto.addEventListener('touchend', function(e){ if (sx===null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) show(i + (dx<0 ? 1 : -1)); sx = null; });
    estado(); show(0);
  })();

  // ---- Antes e depois ----
  var EXEMPLOS = {
    cozinha: {
      antes:'/img/cozinha-antes.webp', depois:'/img/cozinha-depois.webp',
      altAntes:'Antes da reforma: cozinha em L com armários bege, aéreo com porta de vidro branca e bancada de granito.',
      altDepois:'Depois da reforma: a mesma cozinha com portas e gavetas brancas, puxadores de perfil em alumínio, aéreo com vidro escuro e nichos abertos.',
      leg:'Cozinha: as portas bege viraram brancas, com puxadores de perfil em alumínio, aéreo com vidro escuro e nichos novos.'
    },
    armario: {
      antes:'/img/reforma-antes.webp', depois:'/img/reforma-depois.webp',
      altAntes:'Antes da reforma: armário de quarto de madeira escura com portas almofadadas e prateleiras abertas.',
      altDepois:'Depois da reforma: armário branco com portas lisas, puxadores metálicos e nicho com duas prateleiras.',
      leg:'Armário de quarto: a madeira escura com portas almofadadas virou branco, com portas lisas, puxadores novos e um nicho com prateleiras.'
    }
  };
  document.querySelectorAll('[data-comparar]').forEach(function(fig){
    var area = fig.querySelector('.comp-area'), r = fig.querySelector('.comp-range');
    var imA = fig.querySelector('.comp-antes'), imD = fig.querySelector('.comp-depois'), leg = fig.querySelector('.comp-leg');
    var btns = [].slice.call(fig.querySelectorAll('.comp-btn')), exs = [].slice.call(fig.querySelectorAll('.comp-ex-btn'));
    var rotA = fig.querySelector('.comp-rot-antes'), rotD = fig.querySelector('.comp-rot-depois');
    function etiquetas(v){
      var w = area.clientWidth, folga = 12;
      if (!w) { rotA.classList.remove('oculto'); rotD.classList.remove('oculto'); return; }
      var espA = w * v / 100, espD = w * (100 - v) / 100;
      rotA.classList.toggle('oculto', espA < rotA.offsetLeft + rotA.offsetWidth + folga);
      rotD.classList.toggle('oculto', espD < (w - rotD.offsetLeft) + folga);
    }
    function set(v){
      v = Math.max(0, Math.min(100, +v)); r.value = v;
      area.style.setProperty('--pos', v + '%');
      etiquetas(v);
      var txt = v >= 99 ? 'Mostrando só como era' : v <= 1 ? 'Mostrando só como ficou' : (Math.round(v) + '% como era, ' + Math.round(100 - v) + '% como ficou');
      r.setAttribute('aria-valuetext', txt);
      btns.forEach(function(b){ b.setAttribute('aria-pressed', String(+b.getAttribute('data-ir') === v)); });
    }
    function exemplo(k){
      var e = EXEMPLOS[k];
      imA.src = e.antes; imA.alt = e.altAntes; imD.src = e.depois; imD.alt = e.altDepois; leg.textContent = e.leg;
      exs.forEach(function(b){ b.setAttribute('aria-pressed', String(b.getAttribute('data-ex') === k)); });
      set(50);
    }
    exs.forEach(function(b){ b.addEventListener('click', function(){ exemplo(b.getAttribute('data-ex')); }); });
    r.addEventListener('input', function(){ set(r.value); });
    btns.forEach(function(b){ b.addEventListener('click', function(){ set(b.getAttribute('data-ir')); }); });
    var ini = null;
    area.addEventListener('pointerdown', function(e){ ini = {x:e.clientX, y:e.clientY, ok:false}; });
    area.addEventListener('pointermove', function(e){
      if (!ini) return;
      if (!ini.ok){ if (Math.abs(e.clientX-ini.x) < 6) { if (Math.abs(e.clientY-ini.y) > 10) ini = null; return; } ini.ok = true; area.setPointerCapture && area.setPointerCapture(e.pointerId); }
      var b = area.getBoundingClientRect(); set((e.clientX - b.left) / b.width * 100);
    });
    function fim(){ ini = null; }
    area.addEventListener('pointerup', fim); area.addEventListener('pointercancel', fim);
    exemplo('cozinha');
    if (window.ResizeObserver) new ResizeObserver(function(){ etiquetas(+r.value); }).observe(area);
    else window.addEventListener('resize', function(){ etiquetas(+r.value); });
  });

  // ---- Botão flutuante do WhatsApp: aparece depois do topo (o cabeçalho já tem o botão) ----
  (function(){
    var fab = document.querySelector('.zap-flutuante'); if (!fab) return;
    function atualiza(){ fab.classList.toggle('escondido', window.scrollY < 400); }
    atualiza(); window.addEventListener('scroll', atualiza, {passive:true}); 
  })();

  // ---- Menu no celular ----
  var menuBtn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
  function closeMenu(){ menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); menuBtn.setAttribute('aria-label','Abrir menu'); }
  menuBtn.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && menu.classList.contains('open')){ closeMenu(); menuBtn.focus(); } });

  // ---- Páginas: marca no menu a página atual e leva links antigos (#reforma) para o endereço novo ----
  var PAGINA = document.body.getAttribute('data-pagina');
  var ANTIGOS = {inicio:'/', reforma:'/reforma-e-conserto/', ambientes:'/moveis-novos/', trabalhos:'/trabalhos/', orcamento:'/',
    cozinha:'/moveis-novos/#cozinha', sala:'/moveis-novos/#sala', quarto:'/moveis-novos/#quarto', banheiro:'/moveis-novos/#banheiro', outros:'/moveis-novos/#outros'};
  var h = (location.hash || '').slice(1);
  if (ANTIGOS[h] && ANTIGOS[h].split('#')[0] !== location.pathname) { location.replace(ANTIGOS[h]); return; }
  document.querySelectorAll('[data-nav]').forEach(function(a){
    if (a.getAttribute('data-nav') === PAGINA) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
  });
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  document.getElementById('topo').addEventListener('click', function(){ window.scrollTo(0,0); document.querySelector('.logo').focus(); });

})();
