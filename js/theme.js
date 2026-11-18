/* Loads in <head>. Resolves saved admin content and applies the chosen colour theme before the page paints. */
(function(){
  var o=null;try{o=JSON.parse(localStorage.getItem("ugc_site_override")||"null");}catch(e){}
  o=o||window.SITE_OVERRIDE||null;window.__OVR=o;
  var T={
    "charcoal-orange":{name:"Charcoal Orange",bg:"#17181b",bg2:"#1f2125",tx:"#f4f1ee",mu:"#a9a7a4",a:"#ff6a1f",b:"#2f7bff",a2:"#ffb27a"},
    "midnight-blue":{name:"Midnight Blue",bg:"#0b1220",bg2:"#121c33",tx:"#eef3ff",mu:"#9fb0d0",a:"#3d8bff",b:"#22d3ee",a2:"#9cc8ff"},
    "slate-purple":{name:"Slate Purple",bg:"#1a1823",bg2:"#242133",tx:"#f3f0fa",mu:"#aaa4c0",a:"#a370ff",b:"#ff5fa2",a2:"#d3b8ff"},
    "emerald-dark":{name:"Emerald Dark",bg:"#0d1613",bg2:"#14221d",tx:"#ecf6f1",mu:"#9db5aa",a:"#2dd4a0",b:"#f2b84b",a2:"#9af0d4"}
  };
  var rgb=function(h){return parseInt(h.slice(1,3),16)+","+parseInt(h.slice(3,5),16)+","+parseInt(h.slice(5,7),16);};
  function apply(k){var t=T[k]||T["charcoal-orange"],s=document.documentElement.style;
    s.setProperty("--bg",t.bg);s.setProperty("--bg2",t.bg2);s.setProperty("--tx",t.tx);s.setProperty("--mu",t.mu);
    s.setProperty("--or",t.a);s.setProperty("--bl",t.b);s.setProperty("--or2",t.a2);
    s.setProperty("--orr",rgb(t.a));s.setProperty("--blr",rgb(t.b));s.setProperty("--bgr",rgb(t.bg));}
  window.UGC_THEMES=T;window.applyTheme=apply;apply(o&&o.theme);
})();
