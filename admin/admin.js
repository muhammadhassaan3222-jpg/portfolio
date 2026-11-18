(function(){
"use strict";
var KEY="ugc_site_override",HK="ugc_admin_hash",UK="ugc_admin_user",SK="ugc_admin_ok";
var $=function(s){return document.querySelector(s);};
var clone=function(o){return JSON.parse(JSON.stringify(o));};
var esc=function(t){return String(t==null?"":t).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});};
function hash(s){var h1=0xdeadbeef,h2=0x41c6ce57,i,c;for(i=0;i<s.length;i++){c=s.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677);}
  h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);
  return(4294967296*(2097151&h2)+(h1>>>0)).toString(36);}
var DEFH=hash("admin:Admin@123");
var server=false,authed=false,isDefault=false,state,dirty=false,openSet={},cur="dash";
var ICONS=["video","box","quote","phone","star","spark","heart","hook","user","bolt","trophy","mail","chat"];
var SECTIONS=[
 {id:"dash",label:"Dashboard"},
 {id:"home",label:"Home Page",desc:"Hero, stats, services preview, testimonials, brands, steps and final call-to-action",
  note:"The Featured Work grid on the Home page uses the projects marked 'Featured' in Portfolio. To change those thumbnails, open Portfolio & Featured Work.",
  keys:[["hero","Hero section (headline, text, buttons, profile image)"],["stats","Stats counters"],["services","Services preview cards"],["why","Why brands work with me"],["testimonials","Testimonials"],["brands","Brands marquee (names and logos)"],["steps","How it works"],["cta","Final call-to-action"]]},
 {id:"portfolio",label:"Portfolio & Featured Work",desc:"Add, remove and edit projects, thumbnails, categories, videos",keys:[["portfolio","Portfolio page and all projects"]]},
 {id:"about",label:"About Page",desc:"Story, profile photo, timeline, skills, workflow",keys:[["about","About page"]]},
 {id:"services",label:"Services Page",desc:"Add or remove services and set their prices",keys:[["servicePage","Services page"]]},
 {id:"awards",label:"Awards & Achievements",desc:"Add or remove achievements",keys:[["awardsPage","Awards & Achievements page"]]},
 {id:"contact",label:"Contact Page & Info",desc:"Email, WhatsApp, social links, form options",keys:[["contact","Contact email"],["social","Social media links"],["contactPage","Contact page text, WhatsApp and form"]]},
 {id:"site",label:"Brand, Menu & Footer",desc:"Name, title, logo text, menu links, footer text",keys:[["brand","Brand"],["nav","Main menu links"],["footerText","Footer text"]]},
 {id:"theme",label:"Colour Themes",desc:"Switch the colours of the whole website"},
 {id:"security",label:"Change Password",desc:"Change your admin username and password"},
 {id:"backup",label:"Backup & Publish",desc:"Download, restore or reset your website content"}
];
var LB={by:"Awarded by",cta:"Call to action",href:"Link (page name or full URL)",logoText:"Logo text",thumb:"Thumbnail image",video:"Video link (.mp4 file or YouTube/Vimeo embed link)",enabled:"Show on website",featured:"Featured (shows on Home page too)",showPercent:"Show percentage numbers",priceNote:"Price note (optional)",endpoint:"Form service URL (optional)",ft:"Featured",nav:"Menu"};
var PLB={"hero.image":"Hero / profile image","about.image":"About page profile photo","servicePage.items.image":"Service visual (image)","portfolio.projects.thumb":"Project thumbnail (also used on Home)"};
var HINTS={"contactPage.whatsapp.number":"Include country code, digits only, e.g. 923001234567. Leave empty to show 'Available on request'.","contactPage.form.endpoint":"Paste a form service link (e.g. from Formspree) to receive requests directly. Leave empty to open the visitor's email app instead.","about.skills.level":"Bar length from 0 to 100.","servicePage.items.price":"Example: $150. Shown as the starting price.","contact.email":"Shown in the footer and on the Contact page.","portfolio.projects.video":"Optional. Leave empty to show the thumbnail only.","stats.value":"The number the counter counts up to."};
var human=function(k){return LB[k]||k.replace(/([A-Z])/g," $1").replace(/^./,function(c){return c.toUpperCase();});};
var getp=function(p){return p.split(".").reduce(function(o,k){return o[k];},state);};
var setp=function(p,v){var a=p.split("."),l=a.pop();a.reduce(function(o,k){return o[k];},state)[l]=v;};
function defAt(fp){var o=window.SITE_DEFAULTS;fp.split(".").forEach(function(k){if(o==null)return;if(Array.isArray(o))o=o[0];o=o&&o[k];});return o;}
function blank(v,k){if(k==="href")return v;if(typeof v==="string")return"";if(typeof v==="boolean")return false;if(typeof v==="number")return 0;if(Array.isArray(v))return[];var o={};Object.keys(v).forEach(function(x){o[x]=blank(v[x],x);});return o;}
function newItem(t,fp){var o=blank(t);if("enabled"in o)o.enabled=true;if("id"in o)o.id="p"+Date.now().toString(36);if("icon"in o)o.icon=t.icon;
 ["title","name","label"].forEach(function(k){if(k in o&&o[k]==="")o[k]="New item";});if("price"in o)o.price="Add price";if("priceLabel"in o)o.priceLabel=t.priceLabel;
 if(fp==="portfolio.projects")o.category=(state.portfolio.categories||[""])[0];if(fp==="servicePage.items"){o.platforms=(t.platforms||[]).slice();o.label=t.label;}return o;}

/* ---------- field rendering ---------- */
function fields(o,path){return Object.keys(o).map(function(k){return fld(o[k],path.concat(k));}).join("");}
function fld(v,path){
 var k=path[path.length-1],p=path.join("."),fp=path.filter(function(x){return isNaN(x);}).join(".");
 var label=PLB[fp]||human(k),hint=HINTS[fp]?'<small class="hint">'+esc(HINTS[fp])+"</small>":"";
 if(k==="id")return"";
 if(typeof v==="boolean")return'<label class="chk"><input type="checkbox" data-p="'+p+'"'+(v?" checked":"")+"><span>"+esc(label)+"</span></label>";
 if(typeof v==="number")return'<div class="f"><label>'+esc(label)+'</label><input type="number" step="any" data-p="'+p+'" value="'+esc(v)+'">'+hint+"</div>";
 if(typeof v==="string"){
  if(/^(image|thumb|logo)$/.test(k))return img(v,p,label,k);
  if(k==="icon")return'<div class="f"><label>Icon</label><select data-p="'+p+'">'+ICONS.map(function(i){return"<option"+(i===v?" selected":"")+">"+i+"</option>";}).join("")+"</select></div>";
  if(fp==="portfolio.projects.category"){var cs=state.portfolio.categories.slice();if(cs.indexOf(v)<0)cs.push(v);return'<div class="f"><label>Category</label><select data-p="'+p+'">'+cs.map(function(c){return"<option"+(c===v?" selected":"")+">"+esc(c)+"</option>";}).join("")+"</select></div>";}
  var long=v.length>70||/^(text|description|intro|story|message|footerText)$/.test(k);
  return'<div class="f"><label>'+esc(label)+"</label>"+(long?'<textarea data-p="'+p+'">'+esc(v)+"</textarea>":'<input data-p="'+p+'" value="'+esc(v)+'">')+hint+"</div>";}
 if(Array.isArray(v))return arr(v,path,p,fp,label);
 if(v&&typeof v==="object")return'<fieldset class="grp"><legend>'+esc(label)+"</legend>"+fields(v,path)+"</fieldset>";
 return"";}
function img(v,p,label,k){return'<div class="f"><label>'+esc(label)+'</label><div class="imgrow"><div class="prev">'+(v?'<img src="'+esc(v)+'" alt="">':"<span>Placeholder in use</span>")+'</div><div class="ibtns"><label class="btn ghost">Upload / change<input type="file" accept="image/*" hidden data-img="'+p+'" data-k="'+k+'"></label>'+(v?'<button class="btn ghost danger" data-act="imgdel" data-p="'+p+'">Remove</button>':"")+"</div></div></div>";}
function arr(v,path,p,fp,label){
 var d=defAt(fp),isObj=v.length?(v[0]&&typeof v[0]==="object"):(Array.isArray(d)&&d.length&&typeof d[0]==="object");
 var h='<div class="f"><label>'+esc(label)+"</label>";
 if(!isObj){h+=v.map(function(s,i){var long=String(s).length>60;return'<div class="srow">'+(long?'<textarea data-p="'+p+"."+i+'">'+esc(s)+"</textarea>":'<input data-p="'+p+"."+i+'" value="'+esc(s)+'">')+'<button class="mini danger" data-act="sdel" data-p="'+p+'" data-i="'+i+'">&#10005;</button></div>';}).join("")+'<button class="mini" data-act="sadd" data-p="'+p+'">+ Add</button></div>';return h;}
 h+=v.map(function(it,i){var key=p+"."+i,sum=it.title||it.name||it.text||it.label||"Item";
  return'<details class="item" data-open="'+key+'"'+(openSet[key]?" open":"")+"><summary><span>"+(i+1)+". "+esc(String(sum).slice(0,48))+(it.enabled===false?" (hidden)":"")+'</span><span class="acts"><button data-act="up" data-p="'+p+'" data-i="'+i+'">&#8593;</button><button data-act="down" data-p="'+p+'" data-i="'+i+'">&#8595;</button><button class="danger" data-act="del" data-p="'+p+'" data-i="'+i+'">Delete</button></span></summary><div class="ibody">'+fields(it,path.concat(i))+"</div></details>";}).join("");
 return h+'<button class="mini" data-act="add" data-p="'+p+'" data-fp="'+fp+'">+ Add new</button></div>';}

/* ---------- views ---------- */
function nav(){$("#side").innerHTML='<h1>Admin Panel</h1>'+SECTIONS.map(function(s,i){return(i===8?'<div class="sep"></div>':"")+'<button data-go="'+s.id+'" class="'+(s.id===cur?"on":"")+'">'+esc(s.label)+"</button>";}).join("")+'<div class="sep"></div><button id="logout">Log out</button>';}
function show(id){cur=id;nav();var s=SECTIONS.filter(function(x){return x.id===id;})[0];$("#ttl").textContent=s.label;var v=$("#view"),h="";
 if(id==="dash"){h=(server?"":'<div class="card"><h3>Local mode</h3><p class="note">This site is not on PHP hosting (or the panel was opened from your computer). Saves apply in this browser only. Use Backup &amp; Publish to put changes on your real website.</p></div>')+'<div class="tiles">'+SECTIONS.slice(1).map(function(x){return'<button class="tile" data-go="'+x.id+'"><b>'+esc(x.label)+"</b><span>"+esc(x.desc)+"</span></button>";}).join("")+"</div>";}
 else if(id==="theme"){h='<p class="note">Pick a theme, then press Save changes. It changes the colours on every page of the website.</p><div class="themes">'+Object.keys(window.UGC_THEMES).map(function(k){var t=window.UGC_THEMES[k];return'<button class="theme'+(state.theme===k?" on":"")+'" data-theme="'+k+'"><div class="sw"><i style="background:'+t.bg+'"></i><i style="background:'+t.bg2+'"></i><i style="background:'+t.a+'"></i><i style="background:'+t.b+'"></i></div><b>'+t.name+"</b>"+(state.theme===k?"<small>Selected</small>":"")+"</button>";}).join("")+"</div>";}
 else if(id==="security"){h='<form id="pwf" class="card pw"><h3>Change username &amp; password</h3><div class="f"><label>Current password</label><input id="pc" type="password" autocomplete="current-password" required></div><div class="f"><label>New username</label><input id="pu" value="'+esc(localStorage.getItem(UK)||"admin")+'" required></div><div class="f"><label>New password (at least 8 characters)</label><input id="pn" type="password" autocomplete="new-password" required></div><div class="f"><label>Repeat new password</label><input id="pr" type="password" autocomplete="new-password" required></div><button class="btn primary">Update password</button></form>';}
 else if(id==="backup"){h='<div class="card"><h3>Download a backup</h3><p class="note">Downloads <b>site-data.js</b>, a copy of all your content and images. '+(server?"Your live site already updates when you press Save.":"To put your changes on your real website: download this file and upload it into the <b>js</b> folder on your hosting, replacing the old site-data.js.")+'</p><button class="btn primary" id="dl">Download site-data.js</button></div><div class="card"><h3>Restore from a backup</h3><input type="file" id="rs" accept=".js,.json"><p class="hint">Choose a site-data.js you downloaded earlier. Then press Save changes.</p></div><div class="card"><h3>Reset to original content</h3><p class="note">Removes all your edits and returns the website to its starting placeholders.</p><button class="btn ghost danger" id="rst">Reset everything</button></div>';}
 else{h=(s.note?'<p class="note">'+esc(s.note)+"</p>":"");s.keys.forEach(function(k){var v=state[k[0]];h+='<section class="card"><h3>'+esc(k[1])+"</h3>"+(typeof v==="string"?'<div class="f"><input data-p="'+k[0]+'" value="'+esc(v)+'"></div>':(Array.isArray(v)?arr(v,[k[0]],k[0],k[0],"Items"):fields(v,[k[0]])))+"</section>";});}
 v.innerHTML=h;}
function rerender(){var y=window.scrollY;show(cur);window.scrollTo(0,y);}
function mark(d){dirty=d;$("#save").disabled=!d;var s=$("#dstat");s.textContent=d?"Unsaved changes":"All changes saved";s.className="dstat"+(d?" dirty":"");}
function toast(m,bad){var t=$("#toast");t.textContent=m;t.className="toast on"+(bad?" bad":"");clearTimeout(toast.t);toast.t=setTimeout(function(){t.className="toast";},4200);}
function warn(){var w=$("#warn");w.hidden=!isDefault;w.innerHTML=isDefault?"<b>Security warning:</b> you are still using the default login (admin / Admin@123). Open <b>Change Password</b> and change it before your website goes live.":"";}

/* ---------- images ---------- */
function readImg(file,k,cb){if(!/^image\//.test(file.type))return toast("Please choose an image file.",1);
 if(file.type==="image/svg+xml"||file.type==="image/gif"){var fr=new FileReader();fr.onload=function(){cb(fr.result);};fr.readAsDataURL(file);return;}
 var im=new Image(),u=URL.createObjectURL(file),max=k==="logo"?500:1100;
 im.onload=function(){var s=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);
  var x=c.getContext("2d"),png=k==="logo"||file.type==="image/png";if(!png){x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);}x.drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);cb(c.toDataURL(png?"image/png":"image/jpeg",.82));};
 im.onerror=function(){toast("Could not read that image.",1);};im.src=u;}

/* ---------- events ---------- */
var view=$("#view");
view.addEventListener("input",function(e){var t=e.target,p=t.dataset.p;if(!p||t.type==="checkbox"||t.tagName==="SELECT")return;setp(p,t.type==="number"?(t.value===""?0:Number(t.value)):t.value);mark(true);});
view.addEventListener("change",function(e){var t=e.target;
 if(t.dataset.img){var f=t.files[0];if(!f)return;readImg(f,t.dataset.k,function(d){setp(t.dataset.img,d);mark(true);rerender();toast("Image added. Press Save changes to publish it.");});return;}
 var p=t.dataset.p;if(!p)return;if(t.type==="checkbox")setp(p,t.checked);else if(t.tagName==="SELECT")setp(p,t.value);else return;mark(true);});
view.addEventListener("toggle",function(e){var d=e.target;if(d.dataset&&d.dataset.open){if(d.open)openSet[d.dataset.open]=1;else delete openSet[d.dataset.open];}},true);
document.addEventListener("click",function(e){var b=e.target.closest("[data-act],[data-go],[data-theme],#logout,#dl,#rst");if(!b)return;
 if(b.dataset.go){show(b.dataset.go);window.scrollTo(0,0);return;}
 if(b.dataset.theme){state.theme=b.dataset.theme;window.applyTheme(state.theme);mark(true);rerender();return;}
 if(b.id==="logout"){logout();return;}
 if(b.id==="dl"){download();return;}
 if(b.id==="rst"){if(confirm("Remove ALL your edits and return to the original placeholders?")){state=build(true);mark(true);rerender();window.applyTheme(state.theme);toast("Reset. Press Save changes to apply it.");}return;}
 e.preventDefault();var a=b.dataset.act,p=b.dataset.p,i=+b.dataset.i,list;
 if(a==="imgdel"){setp(p,"");}
 else if(a==="sadd"){getp(p).push("");}
 else if(a==="sdel"){getp(p).splice(i,1);}
 else if(a==="add"){var fp=b.dataset.fp;list=getp(p);var t=list[0]||defAt(fp)[0];var n=newItem(t,fp);list.push(n);openSet={};openSet[p+"."+(list.length-1)]=1;}
 else if(a==="del"){if(!confirm("Delete this item?"))return;getp(p).splice(i,1);openSet={};}
 else if(a==="up"||a==="down"){list=getp(p);var j=a==="up"?i-1:i+1;if(j<0||j>=list.length)return;var x=list[i];list[i]=list[j];list[j]=x;openSet={};}
 mark(true);rerender();});
document.addEventListener("submit",function(e){
 if(e.target.id==="pwf"){e.preventDefault();changePw();}
});
document.addEventListener("change",function(e){if(e.target.id==="rs"){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(){try{var t=r.result.replace(/^[^{[n]*?(?=[{n])/,"").replace(/;\s*$/,"");var o=t.trim()==="null"?{}:JSON.parse(t);state=Object.assign(build(true),o);mark(true);window.applyTheme(state.theme);rerender();toast("Backup loaded. Press Save changes to apply it.");}catch(x){toast("That file could not be read.",1);}};r.readAsText(f);}});

/* ---------- save / data ---------- */
function build(fresh){var D=clone(window.SITE_DEFAULTS),o=fresh?{}:clone(window.__OVR||{}),s=Object.assign(D,o);var sp=s.servicePage;if(sp&&sp.service&&!sp.items){sp.items=[sp.service];delete sp.service;}
 (s.portfolio.projects||[]).forEach(function(p){if(p.enabled===undefined)p.enabled=true;});if(!s.theme)s.theme="charcoal-orange";delete s.projects;return s;}
async function api(a,body){var r=await fetch("api.php?a="+a,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"same-origin",body:JSON.stringify(body||{})});var j={};try{j=await r.json();}catch(e){}j.status=r.status;return j;}
async function save(){var data=clone(state);$("#save").disabled=true;
 if(server){var j=await api("save",{content:data});
  if(j.ok){try{localStorage.removeItem(KEY);}catch(e){}window.__OVR=data;mark(false);toast("Saved. Your live website is updated.");}
  else if(j.status===401){toast("Your session expired. Please log in again.",1);authed=false;showLogin();}
  else{toast("Could not save on the server. Check that the js folder is writable.",1);mark(true);}}
 else{try{localStorage.setItem(KEY,JSON.stringify(data));window.__OVR=data;mark(false);toast("Saved in this browser. To publish for visitors, use Backup & Publish.");}
  catch(e){toast("Too much image data for browser storage. Use PHP hosting or smaller images.",1);mark(true);}}}
function download(){var b=new Blob(["window.SITE_OVERRIDE="+JSON.stringify(state)+";\n"],{type:"text/javascript"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="site-data.js";a.click();setTimeout(function(){URL.revokeObjectURL(a.href);},2000);}
async function changePw(){var c=$("#pc").value,u=$("#pu").value.trim(),n=$("#pn").value,r=$("#pr").value;
 if(n.length<8)return toast("New password must be at least 8 characters.",1);if(n!==r)return toast("The two new passwords do not match.",1);if(u.length<3)return toast("Username must be at least 3 characters.",1);
 if(server){var j=await api("password",{current:c,user:u,pass:n});if(!j.ok)return toast(j.error==="current"?"Current password is wrong.":"Could not change password.",1);}
 else{if(hash((localStorage.getItem(UK)||"admin")+":"+c)!==(localStorage.getItem(HK)||DEFH))return toast("Current password is wrong.",1);localStorage.setItem(HK,hash(u+":"+n));localStorage.setItem(UK,u);}
 isDefault=false;warn();$("#pwf").reset();toast("Password updated. Use it next time you log in.");}

/* ---------- login ---------- */
function showLogin(){$("#app").hidden=true;$("#login").hidden=false;$("#lu").focus();}
function enter(){state=build();$("#login").hidden=true;$("#app").hidden=false;window.applyTheme(state.theme);warn();mark(false);show("dash");}
async function logout(){if(dirty&&!confirm("You have unsaved changes. Log out anyway?"))return;if(server)await api("logout");sessionStorage.removeItem(SK);authed=false;showLogin();}
$("#lform").addEventListener("submit",async function(e){e.preventDefault();var u=$("#lu").value.trim(),p=$("#lp").value,ok=false;$("#lerr").textContent="";
 if(server){var j=await api("login",{user:u,pass:p});ok=!!j.ok;isDefault=!!j.default;}
 else{ok=hash(u+":"+p)===(localStorage.getItem(HK)||DEFH)&&u===(localStorage.getItem(UK)||"admin");isDefault=(localStorage.getItem(HK)||DEFH)===DEFH;if(ok)sessionStorage.setItem(SK,"1");}
 if(!ok){$("#lerr").textContent="Wrong username or password.";return;}$("#lp").value="";enter();});
$("#save").addEventListener("click",save);
document.addEventListener("keydown",function(e){if((e.ctrlKey||e.metaKey)&&e.key==="s"&&authed){e.preventDefault();if(dirty)save();}});
addEventListener("beforeunload",function(e){if(dirty){e.preventDefault();e.returnValue="";}});
(async function(){try{var j=await api("ping");server=j.ok===true;if(server){authed=!!j.auth;isDefault=!!j.default;}}catch(e){server=false;}
 if(!server){authed=sessionStorage.getItem(SK)==="1";isDefault=(localStorage.getItem(HK)||DEFH)===DEFH;}
 authed?enter():showLogin();})();
})();
