(function () {
  var D = window.SITE_DEFAULTS, S = D;
  if (window.__OVR) S = Object.assign({}, D, window.__OVR);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var IC = {
    video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3z"/>',
    box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
    quote: '<path d="M7 17c-2 0-3-1.3-3-3.5C4 10 6 8 9 7M16 17c-2 0-3-1.3-3-3.5 0-3.5 2-5.5 5-6.5"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    hook: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.3 2.5 2 4.2 5 4.5"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r=".6"/>',
    facebook: '<path d="M14 21v-8h3l.5-3.5H14V7.7c0-1 .4-1.7 1.8-1.7h1.8V3.1C17.2 3 16.2 3 15.2 3 12.7 3 11 4.5 11 7.2v2.3H8V13h3v8z"/>',
    youtube: '<rect x="3" y="6" width="18" height="12" rx="4"/><path d="m10.5 9.5 4 2.5-4 2.5z"/>',
    play: '<path d="M8 5v14l11-7z" fill="currentColor"/>'
  };
  var icon = function (n) { return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (IC[n] || IC.star) + "</svg>"; };
  var hues = [[18, 215], [200, 20], [25, 250], [215, 12], [8, 195], [230, 30]];
  var ph = function (i) {
    var h = hues[i % hues.length];
    var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(' + h[0] + ',85%,52%)"/><stop offset="1" stop-color="hsl(' + h[1] + ',80%,30%)"/></linearGradient></defs><rect width="400" height="500" fill="url(#g)"/><circle cx="290" cy="130" r="120" fill="#fff" opacity=".08"/><rect x="120" y="170" width="160" height="200" rx="26" fill="#fff" opacity=".14"/></svg>';
    return "data:image/svg+xml," + encodeURIComponent(s);
  };
  var set = function (id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; };
  var link = function (a) { return esc(a.href || "#"); };

  document.title = S.brand.name + " | " + S.brand.title;
  set("nav-links", S.nav.map(function (n) { return '<a href="' + link(n) + '"' + (n.href === "index.html" ? ' aria-current="page"' : "") + ">" + esc(n.text) + "</a>"; }).join(""));
  set("nav-logo", esc(S.brand.logoText));
  $("#nav-cta").textContent = S.hero.cta2.text; $("#nav-cta").href = S.hero.cta2.href;

  var H = S.hero;
  set("hero-copy",
    '<p class="badge"><span class="dot"></span>' + esc(H.badge) + "</p>" +
    '<p class="who">' + esc(S.brand.name) + " · " + esc(S.brand.title) + "</p>" +
    "<h1>" + esc(H.headline) + "</h1><p class=\"lead\">" + esc(H.text) + "</p>" +
    '<div class="btns"><a class="btn primary" href="' + link(H.cta1) + '">' + esc(H.cta1.text) + '</a><a class="btn ghost" href="' + link(H.cta2) + '">' + esc(H.cta2.text) + "</a></div>");
  set("hero-visual",
    '<div class="phone"><img src="' + esc(H.image || ph(0)) + '" alt="' + esc(S.brand.name) + ', ' + esc(S.brand.title) + '"><div class="rec"><i></i>REC</div><div class="play">' + icon("play") + '</div></div>' +
    '<div class="chip c1">' + icon("hook") + "Hook in 3s</div><div class=\"chip c2\">" + icon("phone") + "Reels · TikTok</div>");

  set("stats-grid", S.stats.map(function (s) {
    return '<div class="stat"><b class="count" data-to="' + s.value + '" data-dec="' + (s.decimals || 0) + '" data-suf="' + esc(s.suffix || "") + '">0' + esc(s.suffix || "") + "</b><span>" + esc(s.label) + "</span></div>";
  }).join(""));

  set("services-grid", S.services.map(function (s) {
    return '<article class="card svc">' + icon(s.icon) + "<h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></article>";
  }).join(""));

  var allP = S.portfolio.projects || [], feat = allP.filter(function (p) { return p.featured && p.enabled !== false; });
  if (!feat.length) feat = allP.filter(function (p) { return p.enabled !== false; });
  set("work-grid", feat.slice(0, 6).map(function (p) {
    var i = allP.indexOf(p);
    return '<a class="proj" href="portfolio.html#' + esc(p.id) + '"><img loading="lazy" src="' + esc(p.thumb || ph(i)) + '" alt="' + esc(p.title) + '"><span class="pplay">' + icon("play") + '</span><span class="meta"><em>' + esc(p.category) + "</em><strong>" + esc(p.title) + "</strong></span></a>";
  }).join(""));

  set("why-grid", S.why.map(function (w) {
    return '<div class="why' + (w.big ? " big" : "") + '">' + icon(w.icon) + "<h3>" + esc(w.title) + "</h3><p>" + esc(w.text) + "</p></div>";
  }).join(""));

  set("t-track", S.testimonials.map(function (t) {
    return '<figure class="tcard"><blockquote>' + esc(t.text) + "</blockquote><figcaption><b>" + esc(t.name) + "</b><span>" + esc(t.role) + "</span></figcaption></figure>";
  }).join(""));
  set("t-dots", S.testimonials.map(function (_, i) { return '<button aria-label="Testimonial ' + (i + 1) + '"></button>'; }).join(""));

  var br = S.brands.map(function (b) { return '<li>' + (b.logo ? '<img src="' + esc(b.logo) + '" alt="' + esc(b.name) + '">' : esc(b.name)) + "</li>"; }).join("");
  set("marquee", '<ul>' + br + '</ul><ul aria-hidden="true">' + br + "</ul>");

  set("steps", S.steps.map(function (s, i) {
    return '<li><span class="n">' + (i + 1) + "</span><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></li>";
  }).join(""));

  set("cta-box", "<h2>" + esc(S.cta.title) + "</h2><p>" + esc(S.cta.text) + '</p><a class="btn primary big" href="' + link(S.cta) + '">' + esc(S.cta.button) + "</a>");

  set("footer-grid",
    '<div><a class="logo" href="index.html">' + esc(S.brand.logoText) + "</a><p>" + esc(S.footerText) + "</p></div>" +
    "<nav><h4>Explore</h4>" + S.nav.map(function (n) { return '<a href="' + link(n) + '">' + esc(n.text) + "</a>"; }).join("") + "</nav>" +
    "<div><h4>Contact</h4><a href=\"mailto:" + esc(S.contact.email) + '">' + esc(S.contact.email) + "</a>" + (S.contact.phone ? "<a href=\"tel:" + esc(S.contact.phone) + '">' + esc(S.contact.phone) + "</a>" : "") +
    '<div class="soc">' + ["tiktok", "instagram", "facebook", "youtube"].map(function (k) { return '<a href="' + esc(S.social[k] || "#") + '" aria-label="' + k + '" target="_blank" rel="noopener">' + icon(k) + "</a>"; }).join("") + "</div></div>");
  $("#copy").textContent = "© " + new Date().getFullYear() + " " + S.brand.name + ". All rights reserved.";

  /* scroll reveal */
  var rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); if (e.target.querySelector(".count")) e.target.querySelectorAll(".count").forEach(run); } });
  }, { threshold: 0.15 });
  document.querySelectorAll(".rv").forEach(function (el) { rm ? el.classList.add("in") : io.observe(el); });
  function run(el) {
    var to = +el.dataset.to, dec = +el.dataset.dec, suf = el.dataset.suf, t0 = performance.now(), d = 1600;
    if (rm) { el.textContent = to.toFixed(dec) + suf; return; }
    (function f(t) { var p = Math.min((t - t0) / d, 1), e = 1 - Math.pow(1 - p, 3); el.textContent = (to * e).toFixed(dec) + suf; if (p < 1) requestAnimationFrame(f); })(t0);
  }

  /* testimonials slider */
  var tr = $("#t-track"), dots = document.querySelectorAll("#t-dots button"), idx = 0, timer;
  function go(i) { idx = (i + dots.length) % dots.length; tr.style.transform = "translateX(-" + idx * 100 + "%)"; dots.forEach(function (d, k) { d.classList.toggle("on", k === idx); }); }
  function auto() { clearInterval(timer); if (!rm) timer = setInterval(function () { go(idx + 1); }, 6000); }
  dots.forEach(function (d, k) { d.onclick = function () { go(k); auto(); }; });
  $("#t-prev").onclick = function () { go(idx - 1); auto(); }; $("#t-next").onclick = function () { go(idx + 1); auto(); };
  var sx = 0; tr.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  tr.addEventListener("touchend", function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) { go(idx + (dx < 0 ? 1 : -1)); auto(); } });
  go(0); auto();

  /* mobile nav */
  var nav = $("#nav"), btn = $("#menu-btn");
  btn.onclick = function () { var o = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", o); };
  addEventListener("scroll", function () { nav.classList.toggle("solid", scrollY > 20); }, { passive: true });
})();
