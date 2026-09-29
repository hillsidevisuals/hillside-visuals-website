
// Reveal: set up first so nothing else can block it.
(function(){
  var els=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}
      });
    },{threshold:.12});
    els.forEach(function(el){io.observe(el);});
    // Safety net: if anything above throws later, still reveal after load.
    window.addEventListener('load',function(){
      setTimeout(function(){
        document.querySelectorAll('.rv:not(.on)').forEach(function(el){
          if(el.getBoundingClientRect().top < window.innerHeight*1.5) el.classList.add('on');
        });
      },2500);
    });
  }else{
    els.forEach(function(el){el.classList.add('on');});
  }
})();
// Booking form: guarded so pages without the form never break other scripts.
(function(){
  var f=document.getElementById('bookform');
  if(!f) return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    this.innerHTML='<p class="hv-display" style="color:#fff;font-size:2rem">Brief received.</p><p style="color:#B9BFC1;margin-top:14px;line-height:1.6">We&rsquo;ll be in touch shortly.</p>';
  });
})();

const hvPills=document.querySelectorAll('.hv-pill');if(hvPills.length){const hvItems=document.querySelectorAll('.hv-work__item'),hvEmpty=document.getElementById('workEmpty'),hvEmptyCat=document.getElementById('workEmptyCat');
const hvNames={photos:'photography',videos:'videography',flyers:'flyer',graphics:'graphic design',sites:'website',promotions:'promotion',events:'event',sports:'sports',portraits:'portrait',weddings:'wedding',dance:'dance',cinematic:'cinematic'};
function hvSetFilter(f){hvPills.forEach(function(p){p.classList.toggle('on',p.dataset.filter===f)});var n=0;hvItems.forEach(function(it){var show=(f==='all'||(it.dataset.sub||it.dataset.cat)===f);it.classList.toggle('hv-hide',!show);if(show)n++});hvEmpty.classList.toggle('show',n===0);if(n===0)hvEmptyCat.textContent=hvNames[f]||f;}
hvPills.forEach(function(p){p.addEventListener('click',function(){hvSetFilter(p.dataset.filter)})});
document.querySelectorAll('.hv-drop__menu a').forEach(function(a){a.addEventListener('click',function(){hvSetFilter(a.dataset.filter)})});};(function(){var btns=document.querySelectorAll('.hv-burger');btns.forEach(function(btn){btn.addEventListener('click',function(){var open=document.body.classList.toggle('hv-menu-open');btn.setAttribute('aria-expanded',open);});});document.querySelectorAll('.hv-mobilemenu a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('hv-menu-open');});});})();