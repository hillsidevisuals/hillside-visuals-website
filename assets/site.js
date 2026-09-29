
document.getElementById('bookform').addEventListener('submit',function(e){
  e.preventDefault();
  this.innerHTML='<p class="hv-display" style="color:#fff;font-size:2rem">Brief received.</p><p style="color:#B9BFC1;margin-top:14px;line-height:1.6">We&rsquo;ll be in touch shortly.</p>';
});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

const hvPills=document.querySelectorAll('.hv-pill');if(hvPills.length){const hvItems=document.querySelectorAll('.hv-work__item'),hvEmpty=document.getElementById('workEmpty'),hvEmptyCat=document.getElementById('workEmptyCat');
const hvNames={photos:'photography',videos:'videography',flyers:'flyer',graphics:'graphic design',sites:'website',promotions:'promotion',events:'event'};
function hvSetFilter(f){hvPills.forEach(function(p){p.classList.toggle('on',p.dataset.filter===f)});var n=0;hvItems.forEach(function(it){var show=(f==='all'||it.dataset.cat===f);it.classList.toggle('hv-hide',!show);if(show)n++});hvEmpty.classList.toggle('show',n===0);if(n===0)hvEmptyCat.textContent=hvNames[f]||f;}
hvPills.forEach(function(p){p.addEventListener('click',function(){hvSetFilter(p.dataset.filter)})});
document.querySelectorAll('.hv-drop__menu a').forEach(function(a){a.addEventListener('click',function(){hvSetFilter(a.dataset.filter)})});}