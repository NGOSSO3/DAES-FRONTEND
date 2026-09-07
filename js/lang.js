/* =========================================================
   DAES - English / Swahili translator
   Any element with data-i18n="key" gets its text swapped.
   Elements with data-i18n-placeholder="key" get their
   placeholder swapped instead.
   ========================================================= */
const DAES_I18N = {
  en: {
    nav_home: "Home", nav_education: "Education", nav_weather: "Weather",
    nav_market: "Market", nav_ai: "Ask AI", nav_about: "About Us",
    nav_login: "Log in", nav_register: "Register", nav_dashboard: "My Account",
    hero_eyebrow: "Ilemela District, Mwanza",
    hero_title: "Grow more, guess less.",
    hero_body: "DAES brings farming education, live weather, and market prices for Ilemela's farmers into one place — in the language you speak.",
    hero_cta_primary: "Explore education", hero_cta_secondary: "Check weather",
    feat_eyebrow: "What DAES gives you",
    feat_1_title: "Local farming knowledge", feat_1_body: "Step-by-step guidance for the crops, livestock and fish farmed around Ilemela, from land preparation to market day.",
    feat_2_title: "Weather you can plan around", feat_2_body: "Daily and 5-day forecasts for Ilemela, so you know when to plant, spray or harvest.",
    feat_3_title: "Real market prices", feat_3_body: "Up-to-date crop and livestock prices from Mwanza markets, updated by our agriculture desk.",
    map_eyebrow: "Built for this district",
    map_title: "Rooted in Ilemela, Mwanza",
    map_body: "DAES was researched on the ground in Ilemela District. Every lesson, price and forecast is tuned to what actually grows and sells here.",
    about_link: "Read our story",
    stages_eyebrow: "From soil to market",
    stages_title: "How each lesson is structured",
    foot_rights: "Built by students for Ilemela's farmers.",
  },
  sw: {
    nav_home: "Nyumbani", nav_education: "Elimu", nav_weather: "Hali ya Hewa",
    nav_market: "Soko", nav_ai: "Uliza AI", nav_about: "Kuhusu Sisi",
    nav_login: "Ingia", nav_register: "Jisajili", nav_dashboard: "Akaunti Yangu",
    hero_eyebrow: "Wilaya ya Ilemela, Mwanza",
    hero_title: "Ongeza mavuno, punguza kubahatisha.",
    hero_body: "DAES inaunganisha elimu ya kilimo, hali ya hewa, na bei za soko kwa wakulima wa Ilemela mahali pamoja — kwa lugha unayoielewa.",
    hero_cta_primary: "Angalia elimu", hero_cta_secondary: "Angalia hali ya hewa",
    feat_eyebrow: "DAES inakupa nini",
    feat_1_title: "Maarifa ya kilimo cha eneo lako", feat_1_body: "Maelekezo ya hatua kwa hatua kwa mazao, mifugo na samaki wanaofugwa Ilemela, kuanzia maandalizi ya shamba hadi sokoni.",
    feat_2_title: "Hali ya hewa ya kupangia", feat_2_body: "Utabiri wa kila siku na wa siku 5 kwa Ilemela, ili ujue wakati sahihi wa kupanda, kunyunyizia dawa au kuvuna.",
    feat_3_title: "Bei halisi za soko", feat_3_body: "Bei za sasa za mazao na mifugo kutoka masoko ya Mwanza, zinazosasishwa na dawati letu la kilimo.",
    map_eyebrow: "Imejengwa kwa wilaya hii",
    map_title: "Imejikita Ilemela, Mwanza",
    map_body: "DAES ilifanyiwa utafiti moja kwa moja Wilaya ya Ilemela. Kila somo, bei na utabiri vimelenga kile kinacholimwa na kuuzwa hapa.",
    about_link: "Soma habari zetu",
    stages_eyebrow: "Kutoka udongoni hadi sokoni",
    stages_title: "Jinsi kila somo lilivyopangwa",
    foot_rights: "Imejengwa na wanafunzi kwa ajili ya wakulima wa Ilemela.",
  }
};

function daesApplyLang(lang){
  document.documentElement.setAttribute("lang", lang === "sw" ? "sw" : "en");
  localStorage.setItem("daes_lang", lang);
  const dict = DAES_I18N[lang] || DAES_I18N.en;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.setAttribute("placeholder", dict[key]);
  });
  document.querySelectorAll("[data-lang-btn]").forEach(btn => {
    btn.classList.toggle("is-active", btn.getAttribute("data-lang-btn") === lang);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("daes_lang") || "en";
  daesApplyLang(saved);
  document.querySelectorAll("[data-lang-btn]").forEach(btn => {
    btn.addEventListener("click", () => daesApplyLang(btn.getAttribute("data-lang-btn")));
  });
});
