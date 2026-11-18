(function(){
  var U=window.UGC,S=U.S,esc=U.esc,P=S.awardsPage,rm=matchMedia("(prefers-reduced-motion: reduce)").matches;
  U.chrome("awards.html");document.title="Awards & Achievements | "+S.brand.name+", "+S.brand.title;
  document.getElementById("aw-title").textContent=P.title;document.getElementById("aw-intro").textContent=P.intro;
  var list=P.items.filter(function(a){return a.enabled!==false;});
  document.getElementById("aw-list").innerHTML=list.length?list.map(function(a){
    var vis=a.image?'<img src="'+esc(a.image)+'" alt="">':U.icon(a.icon||"trophy");
    return '<li class="ms rv"><span class="mdot"></span><article class="mcard acard'+(a.featured?" featured":"")+'"><div class="abadge">'+vis+'</div><div><div class="ameta"><span class="yr">'+esc(a.year)+"</span>"+(a.featured?'<span class="ft">Featured</span>':"")+"</div><h3>"+esc(a.title)+'</h3><p class="by">'+esc(a.by)+"</p><p>"+esc(a.description)+"</p></div></article></li>";
  }).join(""):'<li class="empty">'+esc(P.emptyText)+"</li>";
  var c=P.cta;
  document.getElementById("cta-box").innerHTML="<h2>"+esc(c.title)+"</h2><p>"+esc(c.text)+'</p><div class="btns" style="justify-content:center"><a class="btn primary big" href="'+esc(c.primary.href)+'">'+esc(c.primary.text)+'</a><a class="btn ghost big" href="'+esc(c.secondary.href)+'">'+esc(c.secondary.text)+"</a></div>";
  var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.2});
  document.querySelectorAll(".rv").forEach(function(el){rm?el.classList.add("in"):io.observe(el);});
})();
