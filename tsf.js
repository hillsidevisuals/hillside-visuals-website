// ============ header scroll state ============
(function(){
  var h = document.getElementById('tsfHead');
  if(!h) return;
  function onScroll(){ h.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

// ============ mobile nav ============
(function(){
  var b = document.getElementById('burger'), n = document.getElementById('tsfNav');
  if(!b || !n) return;
  b.addEventListener('click', function(){
    var o = n.classList.toggle('open');
    b.setAttribute('aria-expanded', o ? 'true' : 'false');
  });
  n.querySelectorAll('.nl-drop > a.nl').forEach(function(a){
    a.addEventListener('click', function(e){
      if(window.innerWidth <= 1100){
        e.preventDefault();
        a.parentElement.classList.toggle('exp');
      }
    });
  });
  n.querySelectorAll('.nl-menu a, a.nl:not(.nl-drop > a)').forEach(function(a){
    a.addEventListener('click', function(){
      n.classList.remove('open');
      b.setAttribute('aria-expanded','false');
    });
  });
})();

// ============ header search ============
(function(){
  var b = document.getElementById('hsearchBtn'), p = document.getElementById('hsearchPanel');
  if(!b || !p) return;
  b.addEventListener('click', function(){
    var opening = p.hasAttribute('hidden');
    if(opening){
      p.removeAttribute('hidden');
      b.setAttribute('aria-expanded','true');
      var i = p.querySelector('input'); if(i) i.focus();
    } else {
      p.setAttribute('hidden','');
      b.setAttribute('aria-expanded','false');
    }
  });
  document.addEventListener('click', function(e){
    if(!p.hasAttribute('hidden') && !p.contains(e.target) && !b.contains(e.target)){
      p.setAttribute('hidden',''); b.setAttribute('aria-expanded','false');
    }
  });
  var f = document.getElementById('hsearchForm');
  if(f) f.addEventListener('submit', function(e){
    e.preventDefault();
    var note = p.querySelector('.demo-note');
    note.textContent = 'Demo recreation \u2014 search "' + (f.querySelector('input').value || '') + '" runs on the live site at tomorrowsstars.org.';
  });
})();

// ============ demo search guards ============
(function(){
  var f = document.getElementById('footSearch');
  if(f) f.addEventListener('submit', function(e){
    e.preventDefault();
    var note = f.parentElement.querySelector('.demo-note');
    if(note) note.textContent = 'Demo recreation \u2014 search runs on the live site at tomorrowsstars.org.';
  });
})();

// ============ scroll reveal ============
(function(){
  var els = document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold: .1, rootMargin: '0px 0px -40px 0px'});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('in'); });
  }
})();

// ============ animated stat counters ============
(function(){
  var stats = document.querySelectorAll('.stat__n[data-count]');
  if(!stats.length) return;
  function fmt(el, v){
    var pre = el.dataset.prefix || '', suf = el.dataset.suffix || '', ks = el.dataset.ksuffix || '';
    if(ks) return pre + Math.round(v/1000) + ks;
    return pre + Math.round(v).toLocaleString() + suf;
  }
  function animate(el){
    var end = parseFloat(el.dataset.count), t0 = null, dur = 1500;
    var final = fmt(el, end);
    function tick(t){
      if(!t0) t0 = t;
      var p = Math.min((t - t0)/dur, 1);
      el.textContent = fmt(el, end * (1 - Math.pow(1 - p, 3)));
      if(p < 1) requestAnimationFrame(tick);
      else el.textContent = final;
    }
    requestAnimationFrame(tick);
  }
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ io.unobserve(e.target); animate(e.target); } });
    }, {threshold: .4});
    stats.forEach(function(s){ io.observe(s); });
  } else {
    stats.forEach(animate);
  }
})();

// ============ go to top ============
(function(){
  var g = document.getElementById('goTop');
  if(!g) return;
  window.addEventListener('scroll', function(){ g.classList.toggle('show', window.scrollY > 600); }, {passive:true});
  g.addEventListener('click', function(){ window.scrollTo({top: 0, behavior: 'smooth'}); });
})();

// ============ donate demo form ============
(function(){
  var form = document.getElementById('giveForm');
  if(!form) return;
  var row = document.getElementById('amtRow');
  var custom = document.getElementById('customAmt');
  var total = document.getElementById('giveTotal');
  var feeLine = document.getElementById('giveFee');
  var cover = document.getElementById('coverFees');
  var dedicate = document.getElementById('dedicateRow');
  var honoree = document.getElementById('honoreeBox');
  var amt = 10;

  function money(v){ return '$' + v.toFixed(2); }
  function refresh(){
    total.textContent = money(amt);
    var fee = 0;
    if(cover && cover.checked) fee = amt * 0.022 + 0.30;
    feeLine.textContent = 'Your ' + money(amt) + ' donation plus ' + money(fee) + ' to help cover fees.';
  }
  row.addEventListener('click', function(e){
    var b = e.target.closest('.amt');
    if(!b) return;
    row.querySelectorAll('.amt').forEach(function(x){ x.classList.remove('sel'); });
    b.classList.add('sel');
    amt = parseFloat(b.dataset.amt) || 10;
    custom.value = '';
    refresh();
  });
  custom.addEventListener('input', function(){
    var v = parseFloat(custom.value);
    if(v > 0){
      amt = v;
      row.querySelectorAll('.amt').forEach(function(x){ x.classList.remove('sel'); });
      refresh();
    }
  });
  if(cover) cover.addEventListener('change', refresh);
  if(dedicate) dedicate.addEventListener('change', function(e){
    honoree.hidden = !(e.target.value === 'yes');
  });
  form.addEventListener('submit', function(e){
    e.preventDefault();
    alert('Demo recreation \u2014 this form does not transmit anything. Donations process on the live site at tomorrowsstars.org.');
  });
})();
