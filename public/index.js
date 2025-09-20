const $navbar = $(".navbar");
const $btn = $("#toggle-dark");

$btn.on("click", function () {
  const $body = $("body");
  const isDark = $body.attr("data-bs-theme") === "dark";
  const $hasDarks = $(".has-dark, section, .date, .card-body");
  $hasDarks.toggleClass("dark");
  $navbar.toggleClass("navbar-dark bg-dark navbar-light bg-light");
  $btn.text(isDark ? "⏾" : "☀");
  $body.attr("data-bs-theme", isDark ? "light" : "dark");
});

let translations = {};

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
  $("#title").text(t.title);
  // $("#name-logo").text(t["name-logo"]);
  $("#nav-intro").text(t["nav-intro"]);
  $("#nav-edu").text(t["nav-edu"]);
  $("#nav-projects").text(t["nav-projects"]);
  $("#nav-skills").text(t["nav-skills"]);
  $("#nav-contact").text(t["nav-contact"]);
  // $("#name").text(t.name);
  // $("#occup").text(t.occup);
  // $("#summary-title").text(t["summary-title"]);
  $("#summary-content").html(t["summary-content"]);
  $("#edu-h2").text(t["edu-h2"]);
  $("#edu-p").html(t["edu-p"]);
  $("#edu-year").text(t["edu-year"]);
  $("#project-exp-h2").text(t["project-exp-h2"]);
  $("#project1-title").text(t["project1-title"]);
  $("#project1-date").text(t["project1-date"]);
  $("#project2-title").text(t["project2-title"]);
  $("#project2-date").text(t["project2-date"]);
  $("#project3-title").text(t["project3-title"]);
  $("#project4-title").text(t["project4-title"]);
  $("#project5-title").text(t["project5-title"]);
  $("#project6-title").text(t["project6-title"]);
  $("#project7-title").text(t["project7-title"]);
  $("#project8-title").text(t["project8-title"]);
  $("#skills-h2").text(t["skills-h2"]);
  $("#awards-h2").text(t["awards-h2"]);
  // $("#about-me-h2").text(t["about-me-h2"]);
  $("#hobbies-h2").text(t["hobbies-h2"]);
  // $("#hello").text(t.hello);
  // $("#contact").text(t.contact);
  // $("#footer-text").text(t["footer-text"]);

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

  for (const [id, items] of Object.entries(lists)) {
    const $list = $(id);
    $list.empty();
    items.forEach((item) => {
      $list.append(`<li>${item}</li>`);
    });
  }

  // Update hobbies
  const $hobbies = $("#my-hobbies");
  $hobbies.empty();
  t.hobbies.forEach((hobby) => {
    $hobbies.append(
      `<div class="card col-12 col-sm-5 col-lg-2"><div class="card-body">${hobby}</div></div>`
    );
  });
}

// Initial load
$(document).ready(function () {
  fetchTranslations();
});

// function showLarge(src) {
// document.getElementById("proj-img").src = src;
// document.getElementById("imgModal").style.display = "flex";
// }
// 图片点击放大
$(".proj-img").on("click", function () {
  // 找到当前图片的最近的 .imgModal 父元素
  $(this).closest(".imgModal").css("display", "flex");
  $(this).closest(".imgModal").addClass("clicked");
  console.log("magnify!");
});

// 点击弹窗遮罩关闭
$(".imgModal").on("click", function (e) {
  // 只在点击遮罩时关闭，点击图片本身不关闭
  if (e.target === this) {
    $(this).removeClass("clicked");
  }
});
