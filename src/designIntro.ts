// @ts-nocheck
// Intro "diseño en vivo" estilo Canva: cursores con nombre (Vicente, Datos, Código, Diseño)
// dibujan recuadros de selección y el contenido del inicio aparece dentro de cada uno.
// Se ve en cada visita (~2,5 s), se salta con clic o Esc, y no corre con movimiento reducido.

export function runDesignIntro() {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  function start() {
    var header = document.querySelector("header");
    var h1 = header && header.querySelector("h1");
    if (!h1) return false;


    var EASE = "cubic-bezier(.23,1,.32,1)";
    var USERS = {
      vicente: { name: "Vicente", color: "#ff6b00" },
      datos: { name: "Datos", color: "#22d3ee" },
      codigo: { name: "Código", color: "#facc15" },
      diseno: { name: "Diseño", color: "#a78bfa" },
    };

    var css = document.createElement("style");
    css.textContent =
      ".cv-layer{position:fixed;inset:0;z-index:9999;pointer-events:none;font-family:Inter,system-ui,sans-serif}" +
      ".cv-grid{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.09) 1px,transparent 1px);background-size:22px 22px;opacity:0;transition:opacity .5s ease}" +
      ".cv-bar{position:absolute;top:76px;left:50%;transform:translate(-50%,-14px);opacity:0;display:flex;align-items:center;gap:10px;padding:6px 12px 6px 8px;border-radius:999px;background:rgba(15,18,28,.92);border:1px solid rgba(255,255,255,.12);box-shadow:0 8px 30px rgba(0,0,0,.4);transition:transform .5s " + EASE + ",opacity .5s ease;white-space:nowrap}" +
      ".cv-bar .dots{display:flex}.cv-bar .dot{width:22px;height:22px;border-radius:50%;border:2px solid #0f121c;margin-left:-6px;display:grid;place-items:center;font-size:10px;font-weight:700;color:#0f121c}.cv-bar .dot:first-child{margin-left:0}" +
      ".cv-bar span.t{color:#e5e7eb;font-size:12px;font-weight:600}.cv-bar .live{width:7px;height:7px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px #22c55e}" +
      ".cv-cur{position:absolute;left:0;top:0;transition:transform .55s " + EASE + ";will-change:transform}" +
      ".cv-cur svg{display:block;filter:drop-shadow(0 2px 4px rgba(0,0,0,.5))}" +
      ".cv-cur .tag{position:absolute;left:16px;top:18px;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:700;color:#0f121c;white-space:nowrap}" +
      ".cv-box{position:absolute;border:2px solid;border-radius:3px;clip-path:inset(0 100% 100% 0);transition:clip-path .32s " + EASE + ",opacity .4s ease}" +
      ".cv-box.on{clip-path:inset(-14px -14px -14px -14px)}" +
      ".cv-box i{position:absolute;width:8px;height:8px;background:#fff;border:2px solid;border-radius:2px}" +
      ".cv-hide{opacity:0!important;transform:scale(.96)}" +
      ".cv-reveal{transition:opacity .35s ease,transform .45s " + EASE + "!important}" +
      ".cv-box .lbl{position:absolute;left:-2px;top:-21px;padding:1px 7px;border-radius:4px 4px 4px 0;font-size:10px;font-weight:700;color:#0f121c;white-space:nowrap}";
    document.head.appendChild(css);

    var layer = document.createElement("div");
    layer.className = "cv-layer";
    layer.setAttribute("aria-hidden", "true");
    var grid = document.createElement("div");
    grid.className = "cv-grid";
    layer.appendChild(grid);

    var bar = document.createElement("div");
    bar.className = "cv-bar";
    var dots = '<div class="dots">';
    Object.keys(USERS).forEach(function (k) {
      dots += '<div class="dot" style="background:' + USERS[k].color + '">' + USERS[k].name[0] + "</div>";
    });
    bar.innerHTML = dots + '</div><div class="live"></div><span class="t">4 personas diseñando…</span>';
    layer.appendChild(bar);
    document.body.appendChild(layer);

    var W = window.innerWidth, H = window.innerHeight;
    var cursors = {};
    var starts = { vicente: [-40, H * 0.35], datos: [W + 40, H * 0.9], codigo: [W * 0.3, H + 40], diseno: [W + 40, H * 0.15] };
    Object.keys(USERS).forEach(function (k) {
      var u = USERS[k];
      var c = document.createElement("div");
      c.className = "cv-cur";
      c.innerHTML =
        '<svg width="18" height="20" viewBox="0 0 18 20"><path d="M1 1l15 7.5-6.5 1.8L6.8 18z" fill="' + u.color + '" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>' +
        '<div class="tag" style="background:' + u.color + '">' + u.name + "</div>";
      c.style.transform = "translate(" + starts[k][0] + "px," + starts[k][1] + "px)";
      layer.appendChild(c);
      cursors[k] = c;
    });

    function move(k, x, y, ms) {
      cursors[k].style.transitionDuration = (ms || 550) + "ms";
      cursors[k].style.transform = "translate(" + x + "px," + y + "px)";
    }
    function visible(r) {
      return r.width > 0 && r.top < H - 20 && r.bottom > 0;
    }
    var timers = [];
    function at(ms, fn) {
      timers.push(setTimeout(fn, ms));
    }

    // Selección tipo Canva: el cursor va a la esquina, arrastra el recuadro y lo suelta.
    function select(k, el, t0, label, pad, reveal) {
      if (!el) return;
      pad = pad || 8;
      var u = USERS[k];
      at(t0, function () {
        var r = el.getBoundingClientRect();
        if (!visible(r)) { (reveal || [el]).forEach(show); return; }
        var x = Math.max(4, r.left - pad), y = Math.max(4, r.top - pad);
        var w = Math.min(W - x - 4, r.width + pad * 2), h = r.height + pad * 2;
        move(k, x - 2, y - 2, 340);
        var box = document.createElement("div");
        box.className = "cv-box";
        box.style.cssText += "left:" + x + "px;top:" + y + "px;width:" + w + "px;height:" + h + "px;border-color:" + u.color;
        var handles = "";
        [["-5px", "-5px", "", ""], ["", "-5px", "-5px", ""], ["-5px", "", "", "-5px"], ["", "", "-5px", "-5px"]].forEach(function (p) {
          handles += '<i style="border-color:' + u.color + ";left:" + (p[0] || "auto") + ";top:" + (p[1] || "auto") + ";right:" + (p[2] || "auto") + ";bottom:" + (p[3] || "auto") + '"></i>';
        });
        box.innerHTML = handles + '<div class="lbl" style="background:' + u.color + '">' + u.name + " · " + label + "</div>";
        layer.insertBefore(box, bar);
        setTimeout(function () {
          box.classList.add("on");
          move(k, x + w - 6, y + h - 6, 320);
        }, 340);
        setTimeout(function () {
          (reveal || [el]).forEach(show);
        }, 620);
        setTimeout(function () {
          box.style.opacity = "0";
        }, 1150);
      });
    }

    var subtitle = h1.nextElementSibling;
    var para = header.querySelector("p");
    var cta = header.querySelector('a[href="#contacto"]');
    var buttons = cta && cta.parentElement;
    var avatar = header.querySelector("img");

    var label = h1.previousElementSibling;
    var column = avatar && avatar.parentElement;
    var hidden = [label, h1, subtitle, para, buttons, column].filter(Boolean);
    hidden.forEach(function (e) { e.classList.add("cv-reveal", "cv-hide"); });
    function show(e) { if (e) e.classList.remove("cv-hide"); }

    // 0 s: lienzo y barra de presencia
    at(30, function () {
      grid.style.opacity = "1";
      bar.style.opacity = "1";
      bar.style.transform = "translate(-50%,0)";
    });
    select("diseno", avatar, 40, "Imagen", 4, [column]);
    select("vicente", h1, 120, "Título", 10, [label, h1]);
    select("codigo", subtitle, 600, "Subtítulo", 8);
    select("datos", para, 1050, "Texto", 10);
    select("vicente", buttons, 1450, "Botones", 8);

    function finish() {
      timers.forEach(clearTimeout);
      hidden.forEach(show);
      setTimeout(function () { hidden.forEach(function (e) { e.classList.remove("cv-reveal"); }); }, 700);
      Object.keys(cursors).forEach(function (k, i) {
        var dx = i % 2 ? W + 60 : -60;
        move(k, dx, H * (0.2 + i * 0.2), 600);
      });
      grid.style.opacity = "0";
      bar.style.opacity = "0";
      bar.style.transform = "translate(-50%,-14px)";
      layer.querySelectorAll(".cv-box").forEach(function (b) { b.style.opacity = "0"; });
      setTimeout(function () {
        layer.remove();
        css.remove();
      }, 650);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", finish);
    }
    function onKey(e) {
      if (e.key === "Escape") finish();
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", finish);
    at(2350, finish);
    return true;
  }

  function wait() {
    if (start()) return;
    var mo = new MutationObserver(function () {
      if (start()) mo.disconnect();
    });
    mo.observe(document.documentElement || document, { childList: true, subtree: true });
  }
  if (document.documentElement) wait();
  else {
    var t = setInterval(function () {
      if (document.documentElement) { clearInterval(t); wait(); }
    }, 5);
  }
}
