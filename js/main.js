/* =========================================================
   DAES - core site behaviour: theme toggle, nav, hero slider
   ========================================================= */

/* ---- Theme (dark/light) ---- */
function daesApplyTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("daes_theme", theme);
  const btn = document.querySelector("[data-theme-toggle]");
  if (btn) btn.textContent = theme === "dark" ? "☀ Light" : "🌙 Dark";
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("daes_theme") || "light";
  daesApplyTheme(savedTheme);
  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle){
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      daesApplyTheme(current);
    });
  }

  /* ---- Mark active nav link ---- */
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });

  /* ---- Login-state aware nav ---- */
  const token = localStorage.getItem("daes_token");
  const guestOnly = document.querySelectorAll("[data-guest-only]");
  const authOnly = document.querySelectorAll("[data-auth-only]");
  guestOnly.forEach(el => el.style.display = token ? "none" : "");
  authOnly.forEach(el => el.style.display = token ? "" : "none");

  const logoutBtn = document.querySelector("[data-logout]");
  if (logoutBtn){
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("daes_token");
      localStorage.removeItem("daes_user");
      window.location.href = "index.html";
    });
  }

  /* ---- Hero slider ---- */
  const slider = document.querySelector("[data-slider]");
  if (slider){
    const slides = Array.from(slider.querySelectorAll(".slide"));
    const dotsWrap = slider.querySelector("[data-slider-dots]");
    let idx = 0;
    slides.forEach((s, i) => {
      if (dotsWrap){
        const dot = document.createElement("button");
        if (i === 0) dot.classList.add("is-active");
        dot.addEventListener("click", () => show(i));
        dotsWrap.appendChild(dot);
      }
    });
    function show(i){
      slides[idx].classList.remove("is-active");
      if (dotsWrap) dotsWrap.children[idx].classList.remove("is-active");
      idx = (i + slides.length) % slides.length;
      slides[idx].classList.add("is-active");
      if (dotsWrap) dotsWrap.children[idx].classList.add("is-active");
    }
    show(0);
    setInterval(() => show(idx + 1), 5000);
  }
});
