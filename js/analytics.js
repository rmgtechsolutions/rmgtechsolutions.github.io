/* Google Analytics 4 — RMG Tech Solutions (Measurement ID is public, not a secret) */
(function(){
  var ID='G-5DJ2XLYZWV';
  if(location.hostname!=='rmgtechsolutions.in'&&location.hostname!=='www.rmgtechsolutions.in')return;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){dataLayer.push(arguments);};
  gtag('js',new Date());
  gtag('config',ID);
  var s=document.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id='+ID;
  document.head.appendChild(s);

  /* Count taps on Call, WhatsApp and Email */
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a)return;
    var h=a.getAttribute('href'),m=h.indexOf('tel:')===0?'call':h.indexOf('wa.me')>-1?'whatsapp':h.indexOf('mailto:')===0?'email':'';
    if(!m)return;
    gtag('event','contact_click',{method:m,place:a.closest('.callbar')?'mobile_bar':a.closest('footer')?'footer':'page'});
  },true);
})();
