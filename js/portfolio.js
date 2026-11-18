(function(){
  var U=window.UGC,S=U.S,esc=U.esc,P=S.portfolio,rm=matchMedia("(prefers-reduced-motion: reduce)").matches;
  U.chrome("portfolio.html");document.title="Portfolio | "+S.brand.name+", "+S.brand.title;
  var $=function(s){return document.querySelector(s);};
  $("#pf-title").textContent=P.title;$("#pf-intro").textContent=P.intro;
  var projects=P.projects.filter(function(p){return p.enabled!==false;}),cur="All",grid=$("#pf-grid"),count=$("#pf-count");
  var cats=["All"].concat(P.categories);
  var tabs=$("#tabs");
  tabs.innerHTML='<span class="pill" id="pill"></span>'+cats.map(function(c){return '<button role="tab" data-c="'+esc(c)+'" aria-selected="'+(c===cur)+'">'+esc(c)+"</button>";}).join("");
  var btns=[].slice.call(tabs.querySelectorAll("button")),pill=$("#pill");
  function movePill(){var b=btns.filter(function(x){return x.dataset.c===cur;})[0];pill.style.width=b.offsetWidth+"px";pill.style.transform="translateX("+b.offsetLeft+"px)";}
  var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.12});
  function render(){
    var list=projects.filter(function(p){return cur==="All"||p.category===cur;});
    count.textContent=list.length+(list.length===1?" project":" projects");
    if(!list.length){grid.innerHTML='<p class="empty">No projects in this category yet. Check back soon.</p>';return;}
    grid.innerHTML=list.map(function(p,i){
      var idx=projects.indexOf(p);
      return '<button class="pcard rv" data-id="'+esc(p.id)+'" style="--d:'+(i%3)*90+'ms"><span class="thumb"><img loading="lazy" src="'+esc(p.thumb||U.ph(idx))+'" alt="'+esc(p.title)+'"><span class="pplay">'+U.icon("play")+'</span><span class="plat">'+esc(p.platform)+'</span>'+(p.featured?'<span class="feat">Featured</span>':"")+'</span><span class="pbody"><em>'+esc(p.category)+"</em><strong>"+esc(p.title)+"</strong><small>"+esc(p.brand)+"</small><span class=\"pdesc\">"+esc(p.description)+"</span></span></button>";
    }).join("");
    grid.querySelectorAll(".pcard").forEach(function(c){rm?c.classList.add("in"):io.observe(c);c.onclick=function(){openBox(c.dataset.id);};});
  }
  btns.forEach(function(b){b.onclick=function(){
    if(b.dataset.c===cur)return;cur=b.dataset.c;
    btns.forEach(function(x){x.setAttribute("aria-selected",x===b);});movePill();
    grid.classList.add("swap");setTimeout(function(){render();grid.classList.remove("swap");},rm?0:260);
  };});
  addEventListener("resize",movePill);
  /* lightbox */
  var box=$("#box"),last=null;
  function media(p,i){
    var v=p.video||"";
    if(/youtube\.com\/embed|player\.vimeo\.com/.test(v))return '<iframe src="'+esc(v)+'" title="'+esc(p.title)+'" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    if(/\.(mp4|webm|mov)(\?|$)/i.test(v))return '<video src="'+esc(v)+'" poster="'+esc(p.thumb||"")+'" controls playsinline autoplay></video>';
    return '<img src="'+esc(p.thumb||U.ph(i))+'" alt=""><span class="soon">Video preview will appear here</span>';
  }
  function openBox(id){
    var i=projects.map(function(p){return p.id;}).indexOf(id);if(i<0)return;var p=projects[i];last=document.activeElement;
    $("#box-media").innerHTML=media(p,i);
    $("#box-info").innerHTML="<em>"+esc(p.category)+"</em><h2>"+esc(p.title)+"</h2><p class=\"bb\">"+esc(p.brand)+" \u00b7 "+esc(p.platform)+"</p><p>"+esc(p.description)+"</p><div class=\"tags\">"+(p.tags||[]).map(function(t){return "<span>"+esc(t)+"</span>";}).join("")+'</div><a class="btn primary" href="'+esc(S.hero.cta2.href)+'">'+esc(S.hero.cta2.text)+"</a>";
    box.hidden=false;requestAnimationFrame(function(){box.classList.add("on");});document.body.style.overflow="hidden";$("#box-close").focus();
    history.replaceState(null,"","#"+id);
  }
  function closeBox(){box.classList.remove("on");document.body.style.overflow="";$("#box-media").innerHTML="";setTimeout(function(){box.hidden=true;},rm?0:300);history.replaceState(null,"",location.pathname);if(last)last.focus();}
  $("#box-close").onclick=closeBox;box.addEventListener("click",function(e){if(e.target===box)closeBox();});
  addEventListener("keydown",function(e){if(e.key==="Escape"&&!box.hidden)closeBox();});
  render();setTimeout(movePill,60);if(document.fonts)document.fonts.ready.then(movePill);
  if(location.hash.length>1)openBox(location.hash.slice(1));
  var d=document.querySelectorAll(".cta-mini");d.forEach(function(el){el.textContent=S.cta.button;el.href=S.cta.href;});
})();
