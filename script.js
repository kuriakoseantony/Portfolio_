/* ============================================================
   RENDER LOGIC — reads the arrays in data.js and builds the
   marquee, skill categories, project posts, cert cards, and
   education timeline. You shouldn't need to edit this file
   when adding content — just edit data.js.

   Security notes:
   - Every value from data.js is escaped before it goes into HTML.
   - Image paths and links are validated (see safePath / safeHttps).
   - No inline event handlers, no eval — works with a strict CSP.
   ============================================================ */
"use strict";

// If someone embeds this page in another site's <iframe>, break out of it.
// (The real protection is the frame-ancestors header; this covers hosts that can't set headers.)
if (window.top !== window.self) {
  try { window.top.location.href = window.self.location.href; }
  catch (e) { document.documentElement.hidden = true; }
}

// ---------- HELPERS ----------
function escapeHtml(str){
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
// Only plain relative file paths (letters, digits, _ - . /) with no ".." — blocks javascript:, data:, //host, etc.
function safePath(p){
  const s = String(p || "");
  return /^[A-Za-z0-9_][A-Za-z0-9_./-]*$/.test(s) && !s.includes("..") ? s : "";
}
// Only https:// links.
function safeHttps(u){
  try { const x = new URL(String(u), window.location.href); return x.protocol === "https:" ? x.href : ""; }
  catch (e) { return ""; }
}
// Icon class names: letters, digits, spaces, hyphens only.
function safeClass(c){
  const s = String(c || "");
  return /^[A-Za-z0-9 _-]+$/.test(s) ? s : "";
}
function slugify(s){ return "cat-" + String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-"); }

// <img> error events don't bubble, so attach after the element exists.
// alreadyLoading = true for images that start loading before this script runs (the hero photo),
// so a failure that happened earlier is still caught.
function onImageFail(img, handler, alreadyLoading){
  let done = false;
  const run = () => { if(!done){ done = true; handler(); } };
  img.addEventListener("error", run, { once: true });
  if(alreadyLoading && img.complete && img.naturalWidth === 0) run();
}

// ---------- HERO ----------
function setupHero(){
  const set = (id, n) => { const el = document.getElementById(id); if(el) el.textContent = String(n); };
  set("statProjects", projects.length);
  set("statCerts", certifications.length);
  set("statTech", skills.length);

  const img = document.getElementById("profileImg");
  const wrap = document.getElementById("avatarWrap");
  if(img && wrap) onImageFail(img, () => wrap.classList.add("no-photo"), true);
}

// ---------- SKILLS: floating marquee (decorative, aria-hidden) ----------
function renderMarquee(){
  const left = document.getElementById("marqueeLeft");
  const right = document.getElementById("marqueeRight");
  const pill = s => `<div class="icon-pill"><i class="${safeClass(s.icon)}"></i><span>${escapeHtml(s.name)}</span></div>`;
  const once = skills.map(pill).join("");
  // second copy makes the loop seamless; hidden again when animations are reduced
  const twice = skills.map(s => pill(s).replace('class="icon-pill"', 'class="icon-pill dup"')).join("");
  left.innerHTML = once + twice;
  right.innerHTML = once + twice;
}

// ---------- SKILLS: category buttons + chip groups ----------
function renderSkillCategories(){
  const btnRow = document.getElementById("catBtnRow");
  const groupsWrap = document.getElementById("skillGroups");
  const sectionCount = document.getElementById("skillsCount");
  if(sectionCount) sectionCount.textContent = `· ${CATEGORIES.length} categories`;

  CATEGORIES.forEach(cat => {
    const slug = slugify(cat);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cat-btn";
    btn.dataset.target = slug;
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", slug);
    btn.innerHTML = `${escapeHtml(cat)} <span class="arrow" aria-hidden="true">▾</span>`;
    btnRow.appendChild(btn);

    const chipsHtml = skills
      .filter(s => s.category === cat)
      .map(s => `<span class="chip"><i class="${safeClass(s.icon)}" aria-hidden="true"></i>${escapeHtml(s.name)}</span>`)
      .join("");

    const group = document.createElement("div");
    group.className = "skill-group";
    group.id = slug;
    group.innerHTML = `<h4>${escapeHtml(cat)}</h4><div class="chip-row">${chipsHtml}</div>`;
    groupsWrap.appendChild(group);
  });

  // accordion behaviour
  document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      const isOpen = target.classList.contains("open");
      document.querySelectorAll(".skill-group").forEach(g => g.classList.remove("open"));
      document.querySelectorAll(".cat-btn").forEach(b => { b.classList.remove("open"); b.setAttribute("aria-expanded", "false"); });
      if(!isOpen){
        target.classList.add("open");
        btn.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// ---------- PROJECTS ----------
function renderProjects(){
  const wrap = document.getElementById("projectsWrap");
  const count = document.getElementById("projectsCount");
  if(count) count.textContent = `· ${projects.length} posts`;

  wrap.innerHTML = projects.map((p, i) => {
    const imgSrc = safePath(p.image);
    const links = (p.links || [])
      .map(l => ({ label: l.label, url: safeHttps(l.url) }))
      .filter(l => l.url);
    return `
    <article class="post">
      <div class="post-avatar" aria-hidden="true">${escapeHtml(p.initials)}</div>
      <div class="post-body">
        <div class="post-headline">
          <b>Kuriakose Antony</b> <span class="dot" aria-hidden="true">·</span> <span class="date">${escapeHtml(p.date)}</span>
        </div>
        <div class="post-text"><b>${escapeHtml(p.name)}</b> — ${escapeHtml(p.desc)}</div>
        <div class="post-cover ${safeClass(p.cover)}" id="cover-${i}">
          ${imgSrc ? `<img src="${escapeHtml(imgSrc)}" alt="Screenshot of ${escapeHtml(p.name)}" loading="lazy" decoding="async">` : ""}
          <i class="${safeClass(p.icon)}" aria-hidden="true"></i>
          <span class="cover-label" aria-hidden="true">${escapeHtml(p.name.toUpperCase())}</span>
        </div>
        <div class="post-tags">
          ${(p.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
        </div>
        ${links.length ? `<div class="post-links">${links.map(l =>
          `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label)}</a>`).join("")}</div>` : ""}
        <div class="post-actions">
          ${(p.actions || []).map(a => `<span>${escapeHtml(a)}</span>`).join("")}
        </div>
      </div>
    </article>`;
  }).join("");

  // if a screenshot fails to load, drop it and show the gradient/icon cover instead
  wrap.querySelectorAll(".post-cover img").forEach(img => {
    onImageFail(img, () => {
      const cover = img.closest(".post-cover");
      img.remove();
      if(cover) cover.classList.add("fallback-visible");
    });
  });
}

// ---------- EDUCATION ----------
function renderEducation(){
  const wrap = document.getElementById("educationWrap");
  wrap.innerHTML = education.map((e, i) => `
    <div class="tl-item">
      <div class="tl-dot-col" aria-hidden="true">
        <div class="tl-dot"></div>
        ${i < education.length - 1 ? '<div class="tl-line"></div>' : ''}
      </div>
      <div class="tl-content">
        <h4>${escapeHtml(e.title)}</h4>
        <div class="org">${escapeHtml(e.org)}</div>
        <div class="date">${escapeHtml(e.date)}</div>
      </div>
    </div>
  `).join("");
}

// ---------- CERTIFICATIONS ----------
function renderCertifications(){
  const wrap = document.getElementById("certsWrap");
  wrap.innerHTML = certifications.map((c, i) => {
    const hasImg = !!safePath(c.image);
    return `
    <div class="cert-card${hasImg ? "" : " no-image"}" data-cert-index="${i}"${hasImg ? ' role="button" tabindex="0" aria-haspopup="dialog"' : ""}>
      <h4>${escapeHtml(c.title)}</h4>
      <div class="org">${escapeHtml(c.org)}</div>
      <p>${escapeHtml(c.desc)}</p>
      ${hasImg ? '<div class="view-hint"><span aria-hidden="true">🖼️</span> Tap to view certificate</div>' : ""}
    </div>`;
  }).join("");

  const open = card => {
    if(!card || card.classList.contains("no-image")) return;
    const cert = certifications[Number(card.dataset.certIndex)];
    if(cert) openCertModal(cert, card);
  };
  wrap.addEventListener("click", e => open(e.target.closest(".cert-card")));
  wrap.addEventListener("keydown", e => {
    if(e.key === "Enter" || e.key === " "){
      const card = e.target.closest(".cert-card");
      if(card && card === e.target){ e.preventDefault(); open(card); }
    }
  });
}

// ---------- CERTIFICATE MODAL ----------
let lastFocus = null;

function showModalMessage(msg){
  const img = document.getElementById("certModalImg");
  const empty = document.getElementById("certModalEmpty");
  img.classList.remove("show");
  empty.textContent = msg;
  empty.classList.add("show");
}

function openCertModal(cert, triggerEl){
  const modal = document.getElementById("certModal");
  const img = document.getElementById("certModalImg");
  const empty = document.getElementById("certModalEmpty");
  const src = safePath(cert.image);

  lastFocus = triggerEl || document.activeElement;
  document.getElementById("certModalTitle").textContent = cert.title;

  if(src){
    empty.classList.remove("show");
    img.alt = `Certificate: ${cert.title}`;
    img.src = src;
    img.classList.add("show");
  } else {
    img.removeAttribute("src");
    showModalMessage("No certificate image added yet.");
  }

  modal.classList.add("open");
  document.body.classList.add("modal-open");
  document.getElementById("certModalClose").focus();
}

function closeCertModal(){
  const modal = document.getElementById("certModal");
  if(!modal.classList.contains("open")) return;
  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
  document.getElementById("certModalImg").removeAttribute("src");
  if(lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
}

function setupCertModal(){
  document.getElementById("certModalClose").addEventListener("click", closeCertModal);
  document.getElementById("certModalBackdrop").addEventListener("click", closeCertModal);
  document.getElementById("certModalImg").addEventListener("error", () => {
    showModalMessage("This certificate image could not be loaded.");
  });
  document.addEventListener("keydown", e => {
    const open = document.getElementById("certModal").classList.contains("open");
    if(!open) return;
    if(e.key === "Escape") closeCertModal();
    // the close button is the only focusable control: keep focus inside the dialog
    if(e.key === "Tab"){ e.preventDefault(); document.getElementById("certModalClose").focus(); }
  });
}

// ---------- CONTACT FORM (mailto) ----------
const CONTACT_EMAIL = "kuriakoseantony16@gmail.com";

// Builds the mailto: link. Single-line fields have line breaks removed so nobody can
// smuggle extra mail headers (e.g. "Bcc:") into the subject, and every field is length-capped.
function buildMailto(name, email, subject, message){
  const oneLine = (v, max) => String(v || "").replace(/[\r\n]+/g, " ").trim().slice(0, max);
  const body = "Name: " + oneLine(name, 100)
    + "\nEmail: " + oneLine(email, 254)
    + "\n\n" + String(message || "").trim().slice(0, 2000);
  return "mailto:" + CONTACT_EMAIL
    + "?subject=" + encodeURIComponent(oneLine(subject, 150))
    + "&body=" + encodeURIComponent(body);
}

function setupContactForm(){
  const form = document.getElementById("contactForm");
  if(!form) return;
  form.addEventListener("submit", function(e){
    e.preventDefault();
    window.location.href = buildMailto(
      document.getElementById("fname").value,
      document.getElementById("femail").value,
      document.getElementById("fsubject").value,
      document.getElementById("fmessage").value
    );
  });
}

// ---------- SCROLLSPY: highlight active nav tab ----------
function setupScrollSpy(){
  const sections = document.querySelectorAll("section[id]");
  const tabs = document.querySelectorAll(".nav-tab");
  function onScroll(){
    const scrollPos = window.scrollY + 80;
    sections.forEach(sec => {
      if(scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight){
        tabs.forEach(t => { t.classList.remove("active"); t.removeAttribute("aria-current"); });
        const active = document.querySelector(`.nav-tab[data-sec="${sec.id}"]`);
        if(active){ active.classList.add("active"); active.setAttribute("aria-current", "true"); }
      }
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", () => {
  setupHero();
  renderMarquee();
  renderSkillCategories();
  renderProjects();
  renderEducation();
  renderCertifications();
  setupCertModal();
  setupContactForm();
  setupScrollSpy();
});
