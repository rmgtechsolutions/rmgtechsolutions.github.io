const hdr=document.querySelector('header'),bar=document.querySelector('.progress');
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const par=[...document.querySelectorAll('[data-par]')];
let ticking=false;
addEventListener('scroll',()=>{
  if(ticking)return;ticking=true;
  requestAnimationFrame(()=>{
    const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;
    hdr.classList.toggle('scrolled',y>8);
    bar.style.transform=`scaleX(${max>0?y/max:0})`;
    if(!calm&&y<innerHeight*1.2)par.forEach(el=>el.style.transform=`translateY(${y*el.dataset.par}px)`);
    ticking=false;
  });
},{passive:true});

document.querySelectorAll('.reveal').forEach(el=>{
  const sibs=[...el.parentElement.children].filter(c=>c.classList.contains('reveal'));
  el.style.transitionDelay=`${Math.min(sibs.indexOf(el),5)*80}ms`;
});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

document.querySelectorAll('.tile').forEach(t=>t.addEventListener('pointermove',e=>{
  const r=t.getBoundingClientRect();
  t.style.setProperty('--mx',`${e.clientX-r.left}px`);
  t.style.setProperty('--my',`${e.clientY-r.top}px`);
}));

if(!calm&&matchMedia('(hover: hover)').matches)document.querySelectorAll('.btn-primary,.magnetic').forEach(b=>{
  b.addEventListener('pointermove',e=>{
    const r=b.getBoundingClientRect();
    b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.3}px)`;
  });
  b.addEventListener('pointerleave',()=>b.style.transform='');
});

const menu=document.querySelector('.menu-btn');
menu.addEventListener('click',()=>{
  const open=hdr.classList.toggle('open');
  menu.setAttribute('aria-expanded',open);
});
document.querySelectorAll('.drawer a').forEach(a=>a.addEventListener('click',()=>{hdr.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const f=document.getElementById('enquiry'),err=document.getElementById('err');
if(f){
  f.addEventListener('input',()=>err.style.display='none');
  f.addEventListener('submit',e=>{
    e.preventDefault();
    const d=new FormData(f),name=d.get('name').trim(),phone=d.get('phone').trim();
    if(!name||!phone){err.style.display='block';return}
    const text=`Hello RMG Tech Solutions, I'm ${name} (${phone}). I need: ${d.get('need')}. ${d.get('msg').trim()}`;
    window.open('https://wa.me/918929235937?text='+encodeURIComponent(text),'_blank','noopener');
  });
}

const idle=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('idle',!e.isIntersecting)));
document.querySelectorAll('.hero,.marquee').forEach(el=>idle.observe(el));

const cnt=document.querySelectorAll('.count[data-count]');
if(cnt.length){
  const co=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,end=+el.dataset.count;co.unobserve(el);
    if(calm){el.textContent=end;return}
    const t0=performance.now(),dur=1400;
    const step=t=>{const p=Math.min((t-t0)/dur,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step)};
    el.textContent='0';requestAnimationFrame(step);
  }),{threshold:.6});
  cnt.forEach(el=>co.observe(el));
}
