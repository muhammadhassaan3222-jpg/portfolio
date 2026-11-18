(function(){
  var S=window.SITE_DEFAULTS;
  if(window.__OVR)S=Object.assign({},S,window.__OVR);
  var esc=function(t){return String(t==null?"":t).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});};
  var IC={quote:'<path d="M7 17c-2 0-3-1.3-3-3.5C4 10 6 8 9 7M16 17c-2 0-3-1.3-3-3.5 0-3.5 2-5.5 5-6.5"/>',hook:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7.5 8 6 8-6"/>',chat:'<path d="M4 5h16v11H9l-5 4z"/>',trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4.5c0 3 1.5 4.5 3.7 4.8M16 6h3.5c0 3-1.5 4.5-3.7 4.8M12 13v4M8.5 20h7M10 17h4"/>',box:'<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',video:'<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3z"/>',spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',phone:'<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',play:'<path d="M8 5v14l11-7z" fill="currentColor"/>',close:'<path d="M6 6l12 12M18 6 6 18"/>',
    tiktok:'<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.3 2.5 2 4.2 5 4.5"/>',
    instagram:'<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r=".6"/>',
    facebook:'<path d="M14 21v-8h3l.5-3.5H14V7.7c0-1 .4-1.7 1.8-1.7h1.8V3.1C17.2 3 16.2 3 15.2 3 12.7 3 11 4.5 11 7.2v2.3H8V13h3v8z"/>',
    youtube:'<rect x="3" y="6" width="18" height="12" rx="4"/><path d="m10.5 9.5 4 2.5-4 2.5z"/>'};
  var icon=function(n){return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(IC[n]||"")+"</svg>";};
  var hues=[[18,215],[200,20],[25,250],[215,12],[8,195],[230,30]];
  var ph=function(i){var h=hues[i%6];return "data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl('+h[0]+',85%,52%)"/><stop offset="1" stop-color="hsl('+h[1]+',80%,30%)"/></linearGradient></defs><rect width="400" height="500" fill="url(#g)"/><circle cx="290" cy="130" r="120" fill="#fff" opacity=".08"/><rect x="120" y="170" width="160" height="200" rx="26" fill="#fff" opacity=".14"/></svg>');};
  var set=function(id,h){var e=document.getElementById(id);if(e)e.innerHTML=h;};
  var link=function(a){return esc(a.href||"#");};
  function chrome(cur){
    set("nav-links",S.nav.map(function(n){return '<a href="'+link(n)+'"'+(n.href===cur?' aria-current="page"':"")+">"+esc(n.text)+"</a>";}).join(""));
    set("nav-logo",esc(S.brand.logoText));
    var c=document.getElementById("nav-cta");c.textContent=S.hero.cta2.text;c.href=S.hero.cta2.href;
    set("footer-grid",'<div><a class="logo" href="index.html">'+esc(S.brand.logoText)+"</a><p>"+esc(S.footerText)+"</p></div><nav><h4>Explore</h4>"+S.nav.map(function(n){return '<a href="'+link(n)+'">'+esc(n.text)+"</a>";}).join("")+'</nav><div><h4>Contact</h4><a href="mailto:'+esc(S.contact.email)+'">'+esc(S.contact.email)+"</a>"+(S.contact.phone?'<a href="tel:'+esc(S.contact.phone)+'">'+esc(S.contact.phone)+"</a>":"")+'<div class="soc">'+["tiktok","instagram","facebook","youtube"].map(function(k){return '<a href="'+esc(S.social[k]||"#")+'" aria-label="'+k+'" target="_blank" rel="noopener">'+icon(k)+"</a>";}).join("")+"</div></div>");
    document.getElementById("copy").textContent="\u00a9 "+new Date().getFullYear()+" "+S.brand.name+". All rights reserved.";
    var nav=document.getElementById("nav"),b=document.getElementById("menu-btn");
    b.onclick=function(){var o=nav.classList.toggle("open");b.setAttribute("aria-expanded",o);};
    addEventListener("scroll",function(){nav.classList.toggle("solid",scrollY>20);},{passive:true});nav.classList.toggle("solid",scrollY>20);
  }
  window.UGC={S:S,esc:esc,icon:icon,ph:ph,chrome:chrome};
})();
