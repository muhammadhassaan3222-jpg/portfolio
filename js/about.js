(function(){
  var U=window.UGC,S=U.S,esc=U.esc,A=S.about,rm=matchMedia("(prefers-reduced-motion: reduce)").matches;
  U.chrome("about.html");document.title="About | "+S.brand.name+", AI UGC Ads Creator";
  var set=function(id,h){document.getElementById(id).innerHTML=h;},txt=function(id,t){document.getElementById(id).textContent=t;};
  set("ab-copy","<p class=\"who\">"+esc(S.brand.name)+" \u00b7 "+esc(S.brand.title)+"</p><h1>"+esc(A.title)+"</h1><p class=\"lead\">"+esc(A.intro)+"</p>"+A.story.map(function(t,i){return '<p class="story'+(i?"":" first")+'">'+esc(t)+"</p>";}).join(""));
  set("ab-img",'<div class="portrait"><img src="'+esc(A.image||U.ph(2))+'" alt="'+esc(S.brand.name)+', '+esc(S.brand.title)+'"></div>');
  txt("tl-title",A.timelineTitle);txt("diff-title",A.diffTitle);txt("sk-title",A.skillsTitle);txt("wf-title",A.workflowTitle);
  set("timeline",A.timeline.map(function(m,i){return '<li class="ms rv" style="--d:'+(i%2?0:0)+'ms"><span class="mdot"></span><div class="mcard"><small>'+esc(m.date)+"</small><h3>"+esc(m.title)+"</h3><p>"+esc(m.text)+"</p></div></li>";}).join(""));
  set("diff",A.diff.map(function(d){return '<article class="card svc">'+U.icon(d.icon)+"<h3>"+esc(d.title)+"</h3><p>"+esc(d.text)+"</p></article>";}).join(""));
  set("skills",A.skills.map(function(s,i){var v=Math.max(0,Math.min(100,+s.level||0));return '<div class="skill"><div class="srow"><span>'+esc(s.name)+"</span>"+(A.showPercent?"<b>"+v+"%</b>":"")+'</div><div class="bar" role="img" aria-label="'+esc(s.name)+'"><i data-w="'+v+'" style="--d:'+i*120+'ms"></i></div></div>';}).join(""));
  set("wf",A.workflow.map(function(s,i){return '<li><span class="n">'+(i+1)+"</span><h3>"+esc(s.title)+"</h3><p>"+esc(s.text)+"</p></li>";}).join(""));
  set("cta-box","<h2>"+esc(A.cta.title)+"</h2><p>"+esc(A.cta.text)+'</p><a class="btn primary big" href="'+esc(A.cta.href)+'">'+esc(A.cta.button)+"</a>");
  var io=new IntersectionObserver(function(en){en.forEach(function(e){if(!e.isIntersecting)return;var t=e.target;t.classList.add("in");io.unobserve(t);t.querySelectorAll(".bar i").forEach(function(b){b.style.width=b.dataset.w+"%";});});},{threshold:.15});
  document.querySelectorAll(".rv").forEach(function(el){if(rm){el.classList.add("in");el.querySelectorAll(".bar i").forEach(function(b){b.style.width=b.dataset.w+"%";});}else io.observe(el);});
})();
