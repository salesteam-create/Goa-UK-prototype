/* Delmarva Buildings prototype — interactions modelled on the Wonder (Nook) theme */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const money = (n) => "$" + Math.round(n).toLocaleString("en-US");

  /* ---------- Hi-res image upgrade ----------
     Every <img> ships with a local copy. If data-hi points at Delmarva's original
     file and it loads, we swap it in. data-wm="1" = original has a branded strip
     at the bottom that we crop away with CSS. */
  $$("img[data-hi]").forEach((img) => {
    const hi = new Image();
    hi.onload = () => {
      if (hi.naturalWidth > (img.naturalWidth || 0)) {
        img.src = img.dataset.hi;
        if (img.dataset.wm) img.classList.add("wm");
      }
    };
    hi.referrerPolicy = "no-referrer";
    hi.src = img.dataset.hi;
  });

  /* ---------- Header: sticky state + compact on scroll ---------- */
  const header = $(".header");
  const totop = $(".totop");
  const onScroll = () => {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle("is-scrolled", y > 10);
      header.classList.toggle("is-compact", y > 420);
    }
    if (totop) totop.classList.toggle("is-on", y > 900);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  totop && totop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Mega menu (hover + keyboard) ---------- */
  const scrim = $(".scrim");
  $$(".nav li[data-mega]").forEach((li) => {
    let t;
    const open = () => { clearTimeout(t); $$(".nav li.is-open").forEach((o) => o !== li && o.classList.remove("is-open")); li.classList.add("is-open"); scrim && scrim.classList.add("is-on"); };
    const close = () => { t = setTimeout(() => { li.classList.remove("is-open"); if (!$(".nav li.is-open")) scrim && scrim.classList.remove("is-on"); }, 120); };
    li.addEventListener("mouseenter", open);
    li.addEventListener("mouseleave", close);
    li.addEventListener("focusin", open);
    li.addEventListener("focusout", (e) => { if (!li.contains(e.relatedTarget)) close(); });
  });

  /* ---------- Drawers ---------- */
  const openDrawer = (id) => { const d = document.getElementById(id); if (!d) return; d.classList.add("is-open"); scrim && scrim.classList.add("is-on"); const f = d.querySelector("input,button,a"); f && setTimeout(() => f.focus(), 250); };
  const closeAll = () => { $$(".drawer.is-open").forEach((d) => d.classList.remove("is-open")); $$(".modal.is-open").forEach((m) => m.classList.remove("is-open")); $$(".nav li.is-open").forEach((l) => l.classList.remove("is-open")); scrim && scrim.classList.remove("is-on"); };
  $$("[data-drawer]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); openDrawer(b.dataset.drawer); }));
  $$("[data-close]").forEach((b) => b.addEventListener("click", closeAll));
  scrim && scrim.addEventListener("click", closeAll);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });

  /* ---------- Service area check (zip) ----------
     Prototype logic: first 3 digits of the zip against the 7 states Delmarva lists. */
  const AREAS = [
    { st: "Delaware", re: /^19[7-9]/, days: "4 to 6 weeks", freight: 0 },
    { st: "Maryland", re: /^2[01]/, days: "5 to 7 weeks", freight: 0 },
    { st: "Virginia", re: /^2[2-4]/, days: "6 to 8 weeks", freight: 650 },
    { st: "Pennsylvania", re: /^1[5-9]/, days: "6 to 8 weeks", freight: 650 },
    { st: "New Jersey", re: /^0[78]/, days: "6 to 8 weeks", freight: 650 },
    { st: "Ohio", re: /^4[3-5]/, days: "5 to 7 weeks (Urbana office)", freight: 0 },
    { st: "Indiana", re: /^4[67]/, days: "7 to 9 weeks", freight: 950 },
  ];
  const lookup = (zip) => {
    if (!/^\d{5}$/.test(zip)) return { err: "Enter a 5-digit US zip code." };
    const a = AREAS.find((x) => x.re.test(zip));
    return a ? { ok: true, ...a } : { ok: false };
  };
  const saveZip = (zip) => { try { localStorage.setItem("dmv_zip", zip); } catch (e) {} };
  const loadZip = () => { try { return localStorage.getItem("dmv_zip") || ""; } catch (e) { return ""; } };
  const paintZipChip = (zip) => { $$("[data-zip-label]").forEach((el) => (el.textContent = zip || "Enter zip")); };
  paintZipChip(loadZip());

  $$("form[data-zipform]").forEach((form) => {
    const input = form.querySelector("input");
    const out = form.parentElement.querySelector(".zip-result, .zipbox__out");
    if (loadZip()) input.value = loadZip();
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const r = lookup(input.value.trim());
      out.classList.add("is-on");
      out.classList.remove("ok", "no");
      if (r.err) { out.innerHTML = r.err; return; }
      saveZip(input.value.trim());
      paintZipChip(input.value.trim());
      if (r.ok) {
        out.classList.add("ok");
        out.innerHTML = `<strong>Good news: we build in ${r.st}.</strong><ul><li>Typical install window: ${r.days}</li><li>Delivery: ${r.freight ? money(r.freight) + " freight (estimate)" : "included"}</li><li>Free site visit before you commit</li></ul>`;
        document.dispatchEvent(new CustomEvent("zip:ok", { detail: r }));
      } else {
        out.classList.add("no");
        out.innerHTML = `<strong>We don't build in that area yet.</strong> You can still order a materials-only kit shipped to you, or <a class="link-u" href="#">ask about your location</a>.`;
        document.dispatchEvent(new CustomEvent("zip:no"));
      }
    });
  });

  /* ---------- Hero slider ---------- */
  $$("[data-slider]").forEach((root) => {
    const track = root.querySelector(".hero__track");
    const slides = $$(".hero__slide", track);
    const dots = root.parentElement.querySelector(".dots");
    let i = 0, timer;
    if (dots) slides.forEach((_, k) => { const b = document.createElement("button"); b.setAttribute("aria-label", "Slide " + (k + 1)); b.addEventListener("click", () => go(k, true)); dots.appendChild(b); });
    const go = (k, user) => {
      i = (k + slides.length) % slides.length;
      track.style.transform = `translateX(${-100 * i}%)`;
      slides.forEach((s, n) => s.setAttribute("aria-hidden", n !== i));
      dots && $$("button", dots).forEach((d, n) => d.classList.toggle("is-on", n === i));
      if (user) restart();
    };
    const restart = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 7000); };
    root.querySelector(".hero__arrow--next")?.addEventListener("click", () => go(i + 1, true));
    root.querySelector(".hero__arrow--prev")?.addEventListener("click", () => go(i - 1, true));
    root.addEventListener("mouseenter", () => clearInterval(timer));
    root.addEventListener("mouseleave", restart);
    go(0); restart();
  });

  /* ---------- Product rails with tabs + progress bar ---------- */
  $$("[data-rail]").forEach((rail) => {
    const track = rail.querySelector(".rail__track");
    const bar = rail.querySelector(".rail__bar i");
    const next = rail.querySelector(".rail__next");
    const prev = rail.querySelector(".rail__prev");
    const upd = () => {
      const max = track.scrollWidth - track.clientWidth;
      const vis = track.clientWidth / track.scrollWidth;
      if (bar) { bar.style.width = vis * 100 + "%"; bar.style.left = (max ? (track.scrollLeft / max) * (1 - vis) : 0) * 100 + "%"; }
      if (prev) prev.style.display = track.scrollLeft > 10 ? "grid" : "none";
      if (next) next.style.display = track.scrollLeft < max - 10 ? "grid" : "none";
    };
    const step = () => track.clientWidth * 0.75;
    next && next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
    prev && prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    track.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    setTimeout(upd, 50);
  });
  $$("[data-tabs]").forEach((tabs) => {
    const target = document.getElementById(tabs.dataset.tabs);
    $$("button", tabs).forEach((b) => b.addEventListener("click", () => {
      $$("button", tabs).forEach((x) => x.classList.toggle("is-on", x === b));
      $$("[data-cat]", target).forEach((c) => { c.style.display = b.dataset.tab === "all" || c.dataset.cat.includes(b.dataset.tab) ? "" : "none"; });
      const t = target.querySelector(".rail__track"); t.scrollLeft = 0; t.dispatchEvent(new Event("scroll"));
    }));
  });

  /* ---------- Countdown ---------- */
  $$("[data-countdown]").forEach((el) => {
    const end = new Date(el.dataset.countdown).getTime();
    const cells = $$("b", el);
    const tick = () => {
      let s = Math.max(0, Math.floor((end - Date.now()) / 1000));
      const v = [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
      cells.forEach((c, k) => (c.textContent = String(v[k]).padStart(2, "0")));
    };
    tick(); setInterval(tick, 1000);
  });

  /* ---------- Reels (center emphasis + video modal) ---------- */
  $$(".reels").forEach((root) => {
    const track = root.querySelector(".reels__track");
    const reels = $$(".reel", track);
    const card = root.querySelector(".reel-card");
    const center = () => {
      const mid = track.getBoundingClientRect().left + track.clientWidth / 2;
      let best = null, bd = 1e9;
      reels.forEach((r) => { const b = r.getBoundingClientRect(); const d = Math.abs(b.left + b.width / 2 - mid); if (d < bd) { bd = d; best = r; } });
      reels.forEach((r) => r.classList.toggle("is-center", r === best));
      if (card && best) { card.querySelector("[data-rc-title]").textContent = best.dataset.title; card.querySelector("[data-rc-meta]").textContent = best.dataset.meta; card.querySelector("img").src = best.querySelector("img").src; }
    };
    track.addEventListener("scroll", () => requestAnimationFrame(center), { passive: true });
    root.querySelector(".rail__next")?.addEventListener("click", () => track.scrollBy({ left: 222, behavior: "smooth" }));
    root.querySelector(".rail__prev")?.addEventListener("click", () => track.scrollBy({ left: -222, behavior: "smooth" }));
    setTimeout(() => { track.scrollLeft = (track.scrollWidth - track.clientWidth) / 2; center(); }, 60);
    reels.forEach((r) => r.addEventListener("click", () => {
      const m = $("#video-modal"); if (!m) return;
      m.querySelector(".modal__box").innerHTML = `<button class="modal__close iconbtn" data-close aria-label="Close">✕</button><div style="position:relative;padding-top:56.25%"><iframe src="https://www.youtube-nocookie.com/embed/${r.dataset.yt}?autoplay=1&rel=0" title="${r.dataset.title}" allow="autoplay; encrypted-media" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div>`;
      m.querySelector("[data-close]").addEventListener("click", closeAll);
      m.classList.add("is-open"); scrim && scrim.classList.add("is-on");
    }));
  });

  /* ---------- Hotspots (tap on touch) ---------- */
  $$(".spot").forEach((s) => s.querySelector(".spot__dot").addEventListener("click", (e) => { e.preventDefault(); const o = s.classList.contains("is-open"); $$(".spot.is-open").forEach((x) => x.classList.remove("is-open")); if (!o) s.classList.add("is-open"); }));

  /* ---------- Statement floaters (subtle parallax) ---------- */
  const st = $(".statement");
  if (st) {
    const fl = $$(".statement__float", st);
    window.addEventListener("scroll", () => {
      const r = st.getBoundingClientRect(); const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      fl.forEach((f, k) => (f.style.transform = `translateY(${p * (k % 2 ? -80 : 80)}px) rotate(${k % 2 ? 4 : -5}deg)`));
    }, { passive: true });
  }

  /* ---------- Quote slider (press) ---------- */
  $$("[data-quotes]").forEach((root) => {
    const qs = $$("blockquote", root); const dots = root.querySelector(".dots"); let i = 0;
    qs.forEach((_, k) => { const b = document.createElement("button"); b.setAttribute("aria-label", "Review " + (k + 1)); b.onclick = () => go(k); dots.appendChild(b); });
    const go = (k) => { i = (k + qs.length) % qs.length; qs.forEach((q, n) => (q.hidden = n !== i)); $$("button", dots).forEach((d, n) => d.classList.toggle("is-on", n === i)); };
    root.querySelector("[data-q-next]").onclick = () => go(i + 1);
    root.querySelector("[data-q-prev]").onclick = () => go(i - 1);
    go(0); setInterval(() => go(i + 1), 8000);
  });

  /* ---------- Building finder quiz ---------- */
  const quiz = $("#quiz");
  if (quiz) {
    const steps = $$(".quiz-step", quiz); const prog = quiz.querySelector(".quiz-progress i"); const ans = {};
    const show = (k) => { steps.forEach((s, n) => (s.hidden = n !== k)); prog.style.width = ((k + 1) / steps.length) * 100 + "%"; };
    $$("[data-quiz-open]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); show(0); quiz.classList.add("is-open"); scrim && scrim.classList.add("is-on"); }));
    steps.forEach((s, k) => $$("[data-a]", s).forEach((b) => b.addEventListener("click", () => {
      ans[s.dataset.q] = b.dataset.a;
      if (k < steps.length - 2) return show(k + 1);
      const rec = ans.use === "home" ? { t: "The Tuckahoe barndo", p: "from $199,000", h: "#barndos" }
        : ans.use === "farm" ? { t: "40' x 60' x 14' Farm Building", p: "from $58,400 built", h: "product.html" }
        : ans.size === "big" ? { t: "40' x 64' x 14' Workshop", p: "from $61,900 built", h: "product.html" }
        : ans.size === "small" ? { t: "24' x 24' x 10' Garage", p: "from $24,900 built", h: "product.html" }
        : { t: "30' x 40' x 12' Garage & Workshop", p: "from $38,900 built", h: "product.html" };
      const last = steps[steps.length - 1];
      last.querySelector("[data-rec-title]").textContent = rec.t;
      last.querySelector("[data-rec-price]").textContent = rec.p + (ans.path === "kit" ? " (kit price shown on the page)" : "");
      last.querySelector("[data-rec-link]").href = rec.h;
      show(steps.length - 1);
    })));
  }

  /* ---------- Before / after ---------- */
  $$(".ba").forEach((ba) => {
    const r = ba.querySelector("input"); const top = ba.querySelector(".ba__top"); const h = ba.querySelector(".ba__handle");
    const set = () => { top.style.clipPath = `inset(0 ${100 - r.value}% 0 0)`; h.style.left = r.value + "%"; };
    r.addEventListener("input", set); set();
  });

  /* ---------- Copy promo code ---------- */
  $$("[data-copy]").forEach((b) => b.addEventListener("click", () => { navigator.clipboard?.writeText(b.dataset.copy); const t = b.textContent; b.textContent = "Copied"; setTimeout(() => (b.textContent = t), 1400); }));

  /* ---------- Product builder (running price) ---------- */
  const pdp = $("[data-builder]");
  if (pdp) {
    const state = { size: "30x40x12", pkg: "standard", path: "built", color: "Burnished Slate", addons: new Set() };
    const SIZES = {
      "24x24x10": { built: 24900, kit: 11900, label: "24' x 24' x 10'" },
      "30x40x12": { built: 38900, kit: 18900, label: "30' x 40' x 12'" },
      "40x60x14": { built: 58400, kit: 29900, label: "40' x 60' x 14'" },
    };
    const PREMIUM = { built: 0.16, kit: 0.12 };
    const fmt = (n) => money(n);
    const els = {
      now: $("[data-price-now]"), was: $("[data-price-was]"), mo: $("[data-monthly]"),
      sumBase: $("[data-sum-base]"), sumPkg: $("[data-sum-pkg]"), sumAdd: $("[data-sum-add]"), sumOffer: $("[data-sum-offer]"), sumTotal: $("[data-sum-total]"), sumFreight: $("[data-sum-freight]"),
      cta: $("[data-cta]"), ctaSticky: $("[data-cta-sticky]"), stickyPrice: $("[data-sticky-price]"), title: $$("[data-title-size]"),
      sizeLabel: $("[data-size-label]"), pkgLabel: $("[data-pkg-label]"), colorLabel: $("[data-color-label]"), pathNote: $("[data-path-note]"),
    };
    let freight = 0;
    document.addEventListener("zip:ok", (e) => { freight = state.path === "kit" ? e.detail.freight || 450 : 0; calc(); });
    const calc = () => {
      const s = SIZES[state.size];
      const base = s[state.path];
      const pkg = state.pkg === "premium" ? Math.round(base * PREMIUM[state.path] / 100) * 100 : 0;
      const add = [...state.addons].reduce((a, el) => a + Number(el.dataset.price) * (state.path === "kit" ? 0.6 : 1), 0);
      const sub = base + pkg + add;
      const offer = state.path === "built" && sub >= 35000 ? 1000 : 0;
      const total = sub - offer + (state.path === "kit" ? freight : 0);
      els.now.textContent = fmt(total);
      els.was.textContent = offer ? fmt(total + offer) : "";
      els.mo.innerHTML = `or about <b>${fmt(total * 0.0101)}/mo</b> with financing. <a href="#financing">Check your rate</a> (soft credit pull)`;
      els.sumBase.textContent = fmt(base);
      els.sumPkg.textContent = pkg ? "+" + fmt(pkg) : "Included";
      els.sumAdd.textContent = add ? "+" + fmt(add) : "None";
      els.sumOffer.textContent = offer ? "−" + fmt(offer) : "Builds over $35K only";
      els.sumFreight.textContent = state.path === "kit" ? (freight ? fmt(freight) : "Enter zip") : "Included";
      els.sumTotal.textContent = fmt(total);
      els.title.forEach((t) => (t.textContent = s.label));
      els.sizeLabel.textContent = s.label;
      els.pkgLabel.textContent = state.pkg === "premium" ? "The Premium" : "The Standard";
      els.colorLabel.textContent = state.color;
      const ctaText = state.path === "built" ? "Reserve my build slot · $500 refundable" : "Add kit to cart · " + fmt(total);
      els.cta.textContent = ctaText; els.ctaSticky.textContent = state.path === "built" ? "Reserve · $500 refundable" : "Add kit to cart";
      els.stickyPrice.textContent = fmt(total);
      els.pathNote.textContent = state.path === "built"
        ? "Delmarva crews build it on your site. Price includes engineered drawings, materials, labor and cleanup. Site prep and permits quoted after your free site visit."
        : "Materials-only kit with engineered drawings, cut list and build manual. Pick up in Wyoming, DE or have it delivered. Warranties that cover workmanship apply to Delmarva-built projects only.";
    };
    $$("[data-opt]").forEach((g) => $$("button", g).forEach((b) => b.addEventListener("click", () => {
      $$("button", g).forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-pressed", x === b); });
      state[g.dataset.opt] = b.dataset.v;
      if (g.dataset.opt === "path" && freight && state.path === "built") freight = 0;
      if (g.dataset.opt === "size") { const img = $(`.gallery__main img`); if (img && b.dataset.img) { img.src = b.dataset.img; img.removeAttribute("data-hi"); img.classList.remove("wm"); } }
      calc();
    })));
    $$("[data-addon]").forEach((cb) => cb.addEventListener("change", () => { cb.checked ? state.addons.add(cb) : state.addons.delete(cb); calc(); }));
    calc();

    /* Sticky add to cart appears once the main CTA scrolls out */
    const sticky = $(".sticky-atc");
    if (sticky && "IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => sticky.classList.toggle("is-on", !e.isIntersecting && e.boundingClientRect.top < 0)).observe(els.cta);
    }
    $$("[data-cta], [data-cta-sticky]").forEach((b) => b.addEventListener("click", () => openDrawer("reserve-drawer")));
  }
})();
