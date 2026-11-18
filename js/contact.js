(function(){
  var U=window.UGC,S=U.S,esc=U.esc,P=S.contactPage,F=P.form,rm=matchMedia("(prefers-reduced-motion: reduce)").matches;
  U.chrome("contact.html");document.title="Contact | "+S.brand.name+", "+S.brand.title;
  var $=function(i){return document.getElementById(i);};
  $("ct-title").textContent=P.title;$("ct-intro").textContent=P.intro;
  var W=P.whatsapp,wa=W.number?"https://wa.me/"+String(W.number).replace(/\D/g,""):"mailto:"+S.contact.email+"?subject="+encodeURIComponent("WhatsApp contact request");
  $("ct-info").innerHTML='<a class="icard" href="mailto:'+esc(S.contact.email)+'"><span class="ib">'+U.icon("mail")+'</span><span><small>'+esc(P.emailLabel)+"</small><b>"+esc(S.contact.email)+'</b></span></a>'+
    '<div class="icard"><span class="ib">'+U.icon("chat")+'</span><span><small>'+esc(W.label)+"</small><b>"+esc(W.number||W.text)+'</b></span><a class="btn ghost sm" href="'+esc(wa)+'"'+(W.number?' target="_blank" rel="noopener"':"")+">"+esc(W.button)+"</a></div>";
  var soc=[["instagram","Instagram"],["youtube","YouTube"]];
  $("ct-social").innerHTML="<small>"+esc(P.socialLabel)+"</small><div>"+soc.map(function(k){var u=S.social[k[0]]||"#",real=/^https?:\/\//.test(u);return '<a href="'+esc(u)+'" aria-label="'+k[1]+'"'+(real?' target="_blank" rel="noopener"':"")+">"+U.icon(k[0])+"</a>";}).join("")+"</div>";
  var L=F.labels,Ph=F.placeholders;
  var opt=function(a){return a.map(function(o){return '<option value="'+esc(o)+'">'+esc(o)+"</option>";}).join("");};
  $("form").innerHTML="<h2>"+esc(F.title)+"</h2>"+
    '<div class="fld"><label for="f-name">'+esc(L.name)+'</label><input id="f-name" name="name" autocomplete="name" placeholder="'+esc(Ph.name)+'" required><p class="err" id="e-name" aria-live="polite"></p></div>'+
    '<div class="fld"><label for="f-email">'+esc(L.email)+'</label><input id="f-email" name="email" type="email" inputmode="email" autocomplete="email" placeholder="'+esc(Ph.email)+'" required><p class="err" id="e-email" aria-live="polite"></p></div>'+
    '<div class="row2"><div class="fld"><label for="f-type">'+esc(L.type)+'</label><select id="f-type" name="projectType" required><option value="">'+esc(F.typeChoose)+"</option>"+opt(F.types)+'</select><p class="err" id="e-type" aria-live="polite"></p></div>'+
    '<div class="fld"><label for="f-budget">'+esc(L.budget)+'</label><select id="f-budget" name="budget"><option value="">'+esc(F.budgetChoose)+"</option>"+opt(F.budgets)+"</select></div></div>"+
    '<div class="fld"><label for="f-msg">'+esc(L.message)+'</label><textarea id="f-msg" name="message" rows="5" placeholder="'+esc(Ph.message)+'" required></textarea><p class="err" id="e-msg" aria-live="polite"></p></div>'+
    '<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">'+
    '<button class="btn primary big" type="submit">'+esc(F.submit)+'</button><p id="f-status" class="status" role="status" aria-live="polite"></p>';
  var form=$("form"),map={name:["f-name","e-name"],email:["f-email","e-email"],type:["f-type","e-type"],message:["f-msg","e-msg"]};
  function check(k){var el=$(map[k][0]),v=el.value.trim(),ok=k==="email"?/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v):!!v;el.classList.toggle("bad",!ok);el.setAttribute("aria-invalid",!ok);$(map[k][1]).textContent=ok?"":F.errors[k];return ok;}
  Object.keys(map).forEach(function(k){var el=$(map[k][0]);el.addEventListener("blur",function(){if(el.value||el.classList.contains("bad"))check(k);});el.addEventListener("input",function(){if(el.classList.contains("bad"))check(k);});});
  form.addEventListener("submit",function(e){
    e.preventDefault();var st=$("f-status");st.className="status";
    var ok=Object.keys(map).map(check).every(Boolean);if(!ok){var f=form.querySelector(".bad");if(f)f.focus();st.textContent="";return;}
    var d={name:$("f-name").value.trim(),email:$("f-email").value.trim(),projectType:$("f-type").value,budget:$("f-budget").value,message:$("f-msg").value.trim()};
    if(form.website.value)return;
    if(F.endpoint){
      var btn=form.querySelector("button");btn.disabled=true;
      fetch(F.endpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(d)}).then(function(r){
        if(!r.ok)throw 0;st.textContent=F.success;st.classList.add("ok");form.reset();
      }).catch(function(){st.textContent="Something went wrong. Please email me directly at "+S.contact.email+".";st.classList.add("fail");}).then(function(){btn.disabled=false;});
    }else{
      var body="Name: "+d.name+"\nEmail: "+d.email+"\nProject type: "+d.projectType+"\nBudget: "+(d.budget||"Not specified")+"\n\n"+d.message;
      location.href="mailto:"+S.contact.email+"?subject="+encodeURIComponent("AI UGC project request: "+d.projectType)+"&body="+encodeURIComponent(body);
      st.textContent=F.mailtoNote;st.classList.add("ok");
    }
  });
  $("cta-box").innerHTML="<h2>"+esc(P.cta.title)+"</h2><p>"+esc(P.cta.text)+'</p><a class="btn primary big" href="#form" id="go">'+esc(P.cta.button)+"</a>";
  $("go").onclick=function(e){e.preventDefault();$("form").scrollIntoView({behavior:rm?"auto":"smooth",block:"center"});setTimeout(function(){$("f-name").focus({preventScroll:true});},rm?0:500);};
  var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll(".rv").forEach(function(el){rm?el.classList.add("in"):io.observe(el);});
})();
