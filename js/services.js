(function(){
  var U=window.UGC,S=U.S,esc=U.esc,P=S.servicePage,rm=matchMedia("(prefers-reduced-motion: reduce)").matches;
  U.chrome("services.html");document.title="Services | "+S.brand.name+", "+S.brand.title;
  document.getElementById("sv-title").textContent=P.title;document.getElementById("sv-intro").textContent=P.intro;
  var items=(P.items||(P.service?[P.service]:[])).filter(function(v){return v.enabled!==false;});
  var chk='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
  document.getElementById("sv-card").innerHTML=items.map(function(v,i){return '<article class="svcard rv">'+
    '<div class="svbody"><span class="svicon">'+U.icon(v.icon)+'</span><p class="who">'+esc(v.label)+"</p><h2>"+esc(v.title)+"</h2><p class=\"svdesc\">"+esc(v.description)+"</p>"+
    '<ul class="checks">'+(v.features||[]).map(function(f){return "<li>"+chk+esc(f)+"</li>";}).join("")+"</ul>"+
    '<div class="plats">'+(v.platforms||[]).map(function(p){return "<span>"+esc(p)+"</span>";}).join("")+"</div>"+
    '<div class="pricebar"><div><small>'+esc(v.priceLabel)+"</small><b>"+esc(v.price)+"</b>"+(v.priceNote?"<em>"+esc(v.priceNote)+"</em>":"")+'</div><a class="btn primary big" href="'+esc(v.cta.href)+'">'+esc(v.cta.text)+"</a></div></div>"+
    '<div class="svvis"><div class="phone"><img src="'+esc(v.image||U.ph(i))+'" alt="'+esc(v.title)+'"><div class="rec"><i></i>REC</div><div class="play">'+U.icon("play")+"</div></div></div></article>";}).join("");
  document.getElementById("cta-box").innerHTML="<h2>"+esc(P.cta.title)+"</h2><p>"+esc(P.cta.text)+'</p><a class="btn primary big" href="'+esc(P.cta.href)+'">'+esc(P.cta.button)+"</a>";
  var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll(".rv").forEach(function(el){rm?el.classList.add("in"):io.observe(el);});
})();
