const navbar = document.querySelector(".navbar");
const toggleDarkButton = document.querySelector("#toggle-dark");

let translations = {};

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && typeof value === "string") {
    element.textContent = value;
  }
}

function setHTML(selector, value) {
  const element = document.querySelector(selector);
  if (element && typeof value === "string") {
    element.innerHTML = value;
  }
}

function setList(selector, items) {
  const list = document.querySelector(selector);
  if (!list || !Array.isArray(items)) return;

  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = item;
    list.appendChild(li);
  });
}

function bindDarkModeToggle() {
  if (!toggleDarkButton) return;

  toggleDarkButton.addEventListener("click", () => {
    const body = document.body;
    const isDark = body.getAttribute("data-bs-theme") === "dark";
    const hasDarkElements = document.querySelectorAll(
      ".has-dark, section, .date, .card-body"
    );

    hasDarkElements.forEach((element) => element.classList.toggle("dark"));

    if (navbar) {
      ["navbar-dark", "bg-dark", "navbar-light", "bg-light"].forEach((className) =>
        navbar.classList.toggle(className)
      );
    }

    toggleDarkButton.textContent = isDark ? "⏾" : "☀";
    body.setAttribute("data-bs-theme", isDark ? "light" : "dark");
  });
}

// Fetch translations
async function fetchTranslations() {
  try {
    const response = await fetch("/assets/translation/translation.json");
    translations = await response.json();
    setLang("en"); // Set default language
  } catch (error) {
    console.error("Error fetching translations:", error);
  }
}

// Set language
function setLang(lang) {
  if (!translations[lang]) return;

  const t = translations[lang];

  // Update text content
  setText("#title", t.title);
  // setText("#name-logo", t["name-logo"]);
  setText("#nav-intro", t["nav-intro"]);
  setText("#nav-edu", t["nav-edu"]);
  setText("#nav-projects", t["nav-projects"]);
  setText("#nav-skills", t["nav-skills"]);
  setText("#nav-contact", t["nav-contact"]);
  // setText("#name", t.name);
  // setText("#occup", t.occup);
  // setText("#summary-title", t["summary-title"]);
  setHTML("#summary-content", t["summary-content"]);
  setHTML("#edu-p", t["edu-p"]);
  setText("#edu-h2", t["edu-h2"]);
  setText("#edu-year", t["edu-year"]);
  setText("#project-exp-h2", t["project-exp-h2"]);
  setText("#project1-title", t["project1-title"]);
  setText("#project1-date", t["project1-date"]);
  setText("#project2-title", t["project2-title"]);
  setText("#project2-date", t["project2-date"]);
  setText("#project3-title", t["project3-title"]);
  setText("#project4-title", t["project4-title"]);
  setText("#project5-title", t["project5-title"]);
  setText("#project6-title", t["project6-title"]);
  setText("#project7-title", t["project7-title"]);
  setText("#project8-title", t["project8-title"]);
  setText("#skills-h2", t["skills-h2"]);
  setText("#awards-h2", t["awards-h2"]);
  // setText("#about-me-h2", t["about-me-h2"]);
  setText("#hobbies-h2", t["hobbies-h2"]);
  // setText("#hello", t.hello);
  // setText("#contact", t.contact);
  // setText("#footer-text", t["footer-text"]);

  // Update lists
  const lists = {
    "#project1-desc": t["project1-desc"],
    "#project2-desc": t["project2-desc"],
    "#project3-desc": t["project3-desc"],
    "#project4-desc": t["project4-desc"],
    "#project5-desc": t["project5-desc"],
    "#project6-desc": t["project6-desc"],
    "#project7-desc": t["project7-desc"],
    "#project8-desc": t["project8-desc"],
    "#skills-list": t["skills-list"],
    "#awards-list": t["awards-list"],
  };

  Object.entries(lists).forEach(([id, items]) => setList(id, items));

  // Update hobbies
  const hobbies = document.querySelector("#my-hobbies");
  if (hobbies && Array.isArray(t.hobbies)) {
    hobbies.innerHTML = "";
    t.hobbies.forEach((hobby) => {
      const card = document.createElement("div");
      card.className = "card col-12 col-sm-5 col-lg-2";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      cardBody.textContent = hobby;

      card.appendChild(cardBody);
      hobbies.appendChild(card);
    });
  }
}

function bindImageModal() {
  // 图片点击放大
  document.querySelectorAll(".proj-img").forEach((image) => {
    image.addEventListener("click", () => {
      const modal = image.closest(".imgModal");
      if (!modal) return;

      modal.style.display = "flex";
      modal.classList.add("clicked");
      console.log("magnify!");
    });
  });

  // 点击弹窗遮罩关闭（点击图片本身不关闭）
  document.querySelectorAll(".imgModal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.remove("clicked");
      }
    });
  });
}

function init() {
  bindDarkModeToggle();
  bindImageModal();
  fetchTranslations();
}

document.addEventListener("DOMContentLoaded", init);
window.setLang = setLang;
