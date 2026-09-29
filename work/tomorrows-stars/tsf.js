
(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('tsfNav');
  b.addEventListener('click',function(){
    var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);
  });
  n.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){n.classList.remove('open');b.setAttribute('aria-expanded','false');});
  });
})();

// scroll reveal
(function(){
  var els=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}});
    },{threshold:.12});
    els.forEach(function(el){io.observe(el);});
  }else{els.forEach(function(el){el.classList.add('on');});}
})();
// animated stat counters
(function(){
  var stats=document.querySelectorAll('.stat b[data-count]');
  if(!stats.length||!('IntersectionObserver' in window))return;
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return;io.unobserve(e.target);
      var el=e.target,end=parseFloat(el.dataset.count),pre=el.dataset.pre||'',suf=el.dataset.suf||'';
      var t0=null,dur=1400;
      function tick(t){if(!t0)t0=t;var p=Math.min((t-t0)/dur,1),v=end*(1-Math.pow(1-p,3));
        el.textContent=pre+Math.round(v).toLocaleString()+suf;if(p<1)requestAnimationFrame(tick);}
      requestAnimationFrame(tick);
    });
  },{threshold:.4});
  stats.forEach(function(s){io.observe(s);});
})();
// donate tier select
document.querySelectorAll('.tier').forEach(function(t){
  t.addEventListener('click',function(){
    document.querySelectorAll('.tier').forEach(function(x){x.classList.remove('sel');});
    t.classList.add('sel');
  });
});
