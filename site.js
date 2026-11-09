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
  porId('insta').innerHTML = posts.map(function(p){
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

  // ---- Consertos ----
  var chk = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>';
  var grupos = [
    ['Cozinha','<path d="M4 4h16v7H4zM4 11v9h16v-9M9 7.5h6M12 14v3"/>',['Armários','Portas de armário','Gavetas']],
    ['Quarto','<path d="M5 3h14v18H5zM12 3v18M10 11v2M14 11v2"/>',['Guarda-roupa planejado','Portas de guarda-roupa','Gavetas']],
    ['Banheiro','<path d="M3 10h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zM7 18l-1 3M17 18l1 3M6 10V5a2 2 0 0 1 4 0"/>',['Gabinete','Portas de gabinete','Gavetas']],
    ['Sala e outros','<path d="M3 6h18v10H3zM8 20h8M12 16v4"/>',['Home theater','Peças pequenas e grandes','Planejados em geral']]
  ];
  porId('conserto-grid').innerHTML = grupos.map(function(g){
    return '<div class="c-card"><span class="ic" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+g[1]+'</svg></span><h3>'+g[0]+'</h3><ul class="lista-check">'+g[2].map(function(i){return '<li>'+chk+'<span>'+i+'</span></li>';}).join('')+'</ul></div>';
  }).join('');

  // ---- Mapa ilustrativo navegável (no site final: mapa do Google incorporado) ----
  (function(){
    var W0=-480, H0=-340, W=1600, H=1160;
    var blocos='';
    for (var gx=W0; gx<W0+W; gx+=70){ for (var gy=H0; gy<H0+H; gy+=58){
      var w=40+((gx*7+gy*3)%22+22)%22, h=30+((gx*3+gy*5)%18+18)%18;
      blocos+='<rect x="'+(gx+8)+'" y="'+(gy+8)+'" width="'+w+'" height="'+h+'" rx="4"/>';
    }}
    var rua=function(d,w){return '<path d="'+d+'" stroke-width="'+w+'"/>';};
    var lbl=function(x,y,r,t,extra){return '<text transform="translate('+x+' '+y+') rotate('+r+')"'+(extra||'')+'>'+t+'</text>';};
    var svg =
    '<svg viewBox="120 84 640 440" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mapa ilustrativo da região da fábrica, na Rua Marechal Barbacena, entre a Avenida Vereador Abel Ferreira e a Avenida Regente Feijó, perto da Avenida Salim Farah Maluf, no Tatuapé.">'+
    '<rect x="'+W0+'" y="'+H0+'" width="'+W+'" height="'+H+'" fill="#EEF1EC"/>'+
    '<g fill="#E3E8E0">'+blocos+'</g>'+
    '<path d="M-470 520 C -380 470, -300 520, -320 600 L -430 640 Z" fill="#CFE3C8"/>'+
    '<path d="M60 160 C 90 130, 120 150, 130 175 L 110 200 C 90 190, 70 185, 60 160Z" fill="#CFE3C8"/>'+
    '<path d="M760 540 C 820 500, 900 520, 900 600 C 860 640, 780 630, 760 540Z" fill="#CFE3C8"/>'+
    '<g fill="none" stroke="#FFFFFF" stroke-linecap="round">'+
      rua('M-480 -280 L 1120 -250',34)+
      rua('M95 -340 C 120 120, 70 260, 95 820',30)+
    '</g>'+
    '<g fill="none" stroke="#F6D58C" stroke-linecap="round">'+
      rua('M-480 -280 L 1120 -250',24)+
      rua('M95 -340 C 120 120, 70 260, 95 820',22)+
    '</g>'+
    '<g fill="none" stroke="#FFFFFF" stroke-linecap="round">'+
      rua('M-480 40 L 1120 385',22)+
      rua('M-480 149 L 1120 494',16)+
      rua('M-100 187 L 1120 452',12)+
      rua('M290 -340 L 145 820',12)+
      rua('M535 -100 L 247 820',10)+
      rua('M330 -340 L 330 220',10)+
      rua('M520 -340 L 500 330',10)+
      rua('M140 120 L 1120 120',10)+
      rua('M-480 40 L 80 60',10)+
      rua('M-250 -340 L -200 820',10)+
      rua('M-480 620 L 1120 700',10)+
      rua('M760 -340 L 820 820',10)+
      rua('M960 -340 L 1000 820',10)+
      rua('M-480 -60 L 80 -40',8)+
      rua('M640 -340 L 660 120',8)+
    '</g>'+
    '<g font-family="Figtree, sans-serif" font-size="12.5" fill="#55606B" font-weight="600">'+
      lbl(108,70,84,'Av. Salim Farah Maluf')+
      lbl(-120,-275,1,'Radial Leste')+
      lbl(500,252,12.2,'Av. Vereador Abel Ferreira')+
      lbl(560,388,12.2,'Av. Regente Feijó')+
      lbl(212,300,-82.5,'Rua Água Rasa')+
      lbl(392,430,-72.5,'Rua Anália Franco')+
    '</g>'+
    '<g font-family="Familjen Grotesk, sans-serif" font-size="20" fill="#7A8591" font-weight="600" letter-spacing=".5">'+
      lbl(380,-140,0,'Tatuapé')+lbl(-330,260,0,'Mooca')+lbl(80,620,0,'Água Rasa')+lbl(860,250,0,'Vila Formosa')+lbl(700,40,0,'Jardim Anália Franco')+
    '</g>'+
    '<g font-family="Figtree, sans-serif" font-size="13" fill="#2F4A66" font-weight="700">'+lbl(250,266,12.2,'R. Marechal Barbacena')+'</g>'+
    '<g transform="translate(440 270)"><ellipse cx="0" cy="34" rx="12" ry="4" fill="#00000026"/>'+
      '<path d="M0 34 C -4 22, -20 12, -20 -2 A 20 20 0 0 1 20 -2 C 20 12, 4 22, 0 34Z" fill="#2F4A66"/><circle cx="0" cy="-2" r="7" fill="#F2B705"/></g>'+
    '<g transform="translate(320 196)"><rect width="240" height="56" rx="12" fill="#FFFFFF" stroke="#DDE2E7"/>'+
      '<text x="16" y="24" font-family="Familjen Grotesk, sans-serif" font-size="15" font-weight="700" fill="#1F2A35">Mobília &amp; Arte</text>'+
      '<text x="16" y="43" font-family="Figtree, sans-serif" font-size="12.5" fill="#55606B">Rua Marechal Barbacena, 121</text></g>'+
    '</svg>';
    var el = document.getElementById('mapa'); if (!el) return;
    el.setAttribute('tabindex','0');
    el.setAttribute('aria-label','Mapa ilustrativo. Arraste ou use os botões de direção para mover. Com o teclado, use as setas para mover e as teclas mais e menos para aproximar.');
    el.innerHTML = svg +
      '<span class="mapa-dica" aria-hidden="true">Arraste para explorar</span>'+
      '<div class="zoom"><button type="button" data-z="in" aria-label="Aproximar o mapa"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>'+
      '<button type="button" data-z="out" aria-label="Afastar o mapa"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg></button>'+
      '<button type="button" data-z="reset" aria-label="Centralizar na fábrica"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg></button></div>'+
      '<div class="setas" role="group" aria-label="Mover o mapa"><button type="button" data-p="c" aria-label="Mover o mapa para cima"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg></button><button type="button" data-p="e" aria-label="Mover o mapa para a esquerda"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></button><button type="button" data-p="d" aria-label="Mover o mapa para a direita"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button><button type="button" data-p="b" aria-label="Mover o mapa para baixo"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button></div>'+
      '<span class="mapa-tag">Mapa ilustrativo</span>';
    var s = el.querySelector('svg');
    var v = {x:120, y:84, w:640, h:440};
    var START = {x:120, y:84, w:640, h:440};
    function clamp(){
      v.w = Math.min(Math.max(v.w, 320), 1280); v.h = v.w * 440/640;
      v.x = Math.min(Math.max(v.x, W0), W0 + W - v.w);
      v.y = Math.min(Math.max(v.y, H0), H0 + H - v.h);
    }
    function apply(){ clamp(); s.setAttribute('viewBox', v.x+' '+v.y+' '+v.w+' '+v.h); }
    function zoom(f){ var cx=v.x+v.w/2, cy=v.y+v.h/2; v.w*=f; v.h*=f; v.x=cx-v.w/2; v.y=cy-v.h/2; apply(); }
    var drag=null;
    s.addEventListener('pointerdown', function(e){ drag={x:e.clientX,y:e.clientY,vx:v.x,vy:v.y,ok:false}; s.setPointerCapture(e.pointerId); });
    s.addEventListener('pointermove', function(e){
      if(!drag) return;
      if(!drag.ok){ if (Math.abs(e.clientX-drag.x)+Math.abs(e.clientY-drag.y) < 4) return; drag.ok=true; s.classList.add('arrastando'); }
      var r = s.getBoundingClientRect();
      var k = Math.max(v.w / r.width, v.h / r.height);
      v.x = drag.vx - (e.clientX - drag.x) * k; v.y = drag.vy - (e.clientY - drag.y) * k; apply();
    });
    function end(){ drag=null; s.classList.remove('arrastando'); }
    s.addEventListener('pointerup', end); s.addEventListener('pointercancel', end);
    el.querySelectorAll('[data-z]').forEach(function(b){ b.addEventListener('click', function(){
      var z=b.getAttribute('data-z'); if(z==='in') zoom(.75); else if(z==='out') zoom(1/.75); else { v={x:START.x,y:START.y,w:START.w,h:START.h}; apply(); }
    }); });
    el.querySelectorAll('[data-p]').forEach(function(b){ b.addEventListener('click', function(){
      var st = v.w * .2, d = b.getAttribute('data-p');
      if (d==='c') v.y-=st; else if (d==='b') v.y+=st; else if (d==='e') v.x-=st; else v.x+=st; apply();
    }); });
    el.addEventListener('keydown', function(e){
      if (e.target !== el) return;
      var step = v.w * .12, k = e.key;
      if (k==='ArrowLeft') v.x-=step; else if (k==='ArrowRight') v.x+=step; else if (k==='ArrowUp') v.y-=step; else if (k==='ArrowDown') v.y+=step;
      else if (k==='+'||k==='=') { zoom(.75); e.preventDefault(); return; } else if (k==='-') { zoom(1/.75); e.preventDefault(); return; }
      else return;
      e.preventDefault(); apply();
    });
  })();

  // ---- Google Maps de verdade: aparece onde o site estiver hospedado; na prévia, fica o mapa ilustrativo ----
  (function(){
    var el = document.getElementById('mapa'); if (!el) return;
    var bloqueado = false;
    document.addEventListener('securitypolicyviolation', function(e){
      if (/google\.com/.test(e.blockedURI || '')) { bloqueado = true; var f = document.getElementById('gmaps'); if (f) f.remove(); }
    });
    var f = document.createElement('iframe');
    f.id = 'gmaps';
    f.title = 'Mapa do Google com a localização da Mobília & Arte, na Rua Marechal Barbacena, 121';
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    f.src = 'https://www.google.com/maps?q=Rua+Marechal+Barbacena+121,+S%C3%A3o+Paulo&z=16&output=embed';
    f.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;z-index:var(--z-mapa);background:#EEF1EC';
    setTimeout(function(){ if (!bloqueado) el.appendChild(f); }, 0);
  })();

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
  var ANTIGOS = {inicio:'/', reforma:'/reforma-e-conserto/', ambientes:'/moveis-novos/', orcamento:'/',
    cozinha:'/moveis-novos/#cozinha', sala:'/moveis-novos/#sala', quarto:'/moveis-novos/#quarto', banheiro:'/moveis-novos/#banheiro', outros:'/moveis-novos/#outros'};
  var h = (location.hash || '').slice(1);
  if (ANTIGOS[h] && ANTIGOS[h].split('#')[0] !== location.pathname) { location.replace(ANTIGOS[h]); return; }
  document.querySelectorAll('[data-nav]').forEach(function(a){
    if (a.getAttribute('data-nav') === PAGINA) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
  });
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  document.getElementById('topo').addEventListener('click', function(){ window.scrollTo(0,0); document.querySelector('.logo').focus(); });

})();
