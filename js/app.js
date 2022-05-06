//     background: #00000078;
// header on scroll
let fixedNav = document.querySelector("header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    fixedNav.style.backgroundColor = "#00000078";
    this.document.querySelector("header .logo ").style.color = "#fff";
    this.document.querySelector("header .logo ").style.textDecoration =
      "underline";
    this.document.querySelector("header .logo ").style.fontSize = "25px";
    this.document.querySelector("header .logo ").style.fontFamily = "cursive";
  } else {
    fixedNav.style.backgroundColor = "unset";
  }
});

// slide show
var index = 0;
var imgsSlide = [
  "imgs/mosque01.jpg",
  "imgs/mosque02.jpg",
  "imgs/mosque03.jpg",
  "imgs/mosque04.jpg",
  "imgs/mosque05.jpg",
  "imgs/azharjpg.jpg",
  "imgs/mosque06.jpg",
  "imgs/mosque07.jpg",
  "imgs/azhar2.jpg",
];
// المسار يبقا بالنسبة للجافا سكريبت

function slideShow() {
  document.querySelector(".main").style.backgroundImage =
    "url(" + imgsSlide[index] + ")";
  if (index < imgsSlide.length - 1) {
    index++;
  } else {
    index = 0;
  }
}
setInterval("slideShow()", 3000);
// End of slide
// ========================================
// scroll to hadith
hadithSection = document.querySelector("Hadith");
document.querySelector(".main .title .btn").addEventListener("click", () => {
  window.scrollTo(0, 500);
});
// ========================================
//hadith API
let hadithContainer = document.querySelector(".hadithContainer");
let num = document.querySelector(" .number");
let next = document.querySelector(" .next");
let pre = document.querySelector(" .pre");
let indexOfHadith = 0;
function hadithChanger() {
  fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-150")
    .then((response) => response.json())
    .then((data) => {
      let hadiths = data.data.hadiths;
      //   console.log(hadiths[indexOfHadith]);
      showHadith();
      function showHadith() {
        hadithContainer.innerHTML = hadiths[indexOfHadith].arab;
        num.innerHTML = `150 -  ${indexOfHadith + 1} `;
      }
      next.addEventListener("click", () => {
        indexOfHadith == 149 ? (indexOfHadith = 0) : indexOfHadith++;
        showHadith();
      });
      pre.addEventListener("click", () => {
        indexOfHadith == 0 ? (indexOfHadith = 149) : indexOfHadith--;
        showHadith();
      });
    });
}
hadithChanger();
// ===================================================

// ============5 -5 -2022====================
let linksArray = Array.from(document.querySelectorAll("header ul li"));
// console.log(linksArray);
function active(className) {
  for (let index = 0; index < linksArray.length; index++) {
    linksArray[index].classList.remove("active");
    if (className == linksArray[index].dataset.filter) {
      linksArray[index].classList.add("active");
    }
  }
}
//=================== ====================
// http://api.alquran.cloud/v1/meta
getSurah();
let containerQuran = document.querySelector(".Quran .container");
let popUp = document.querySelector(".popUp");
let popUpContainer = document.querySelector(".popUp .container");

function getSurah() {
  fetch("http://api.alquran.cloud/v1/meta")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      let surahs = data.data.surahs.references;
      for (let index = 0; index < surahs.length; index++) {
        containerQuran.innerHTML += `
       <div class="surah">
       <p>(${surahs[index].number})</p>
       <p>${surahs[index].name}</p>
       <p>${surahs[index].englishName}</p>
       <p>(${surahs[index].numberOfAyahs})</p>
     </div>`;
      }
      let suraClick = document.querySelectorAll(".Quran .container .surah");
      // console.log(suraClick);

      for (let i = 0; i < suraClick.length; i++) {
        suraClick[i].addEventListener("click", () => {
          popUp.style.transform = "scale(1)";
          fetch(`https://api.alquran.cloud/v1/surah/${i + 1}`)
            .then((response) => response.json())
            .then((data) => {
              // console.log(data.data.ayahs);
              popUpContainer.innerHTML = "";
              // remove recently text
              // show ayaht of surah
              for (let j = 0; j < data.data.ayahs.length; j++) {
                popUpContainer.innerHTML += `        <div class="ayah"><h2>
                (${j + 1})
                ${data.data.ayahs[j].text}</h2></div>`;
              }
            });
        });
      }
    });

  // console.log(surahs);
}
// =================== close pop Up =================
function closePopUp() {
  popUp.style.transform = "scale(0)";
}
// ================================
let timePrayContainer = document.querySelector(".time-of-pray .container");
// let card = document.querySelector(".time-of-pray .container  .card ");
fetch(
  "https://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8"
)
  .then((response) => response.json())
  .then((data) => {
    let times = data.data.timings;
    for (let time in times)
      timePrayContainer.innerHTML += `
    <div class="card">
    <p>${time}</p>
    <p>${times[time]}</p>
  </div>`;
  });
// =============================
window.onscroll = function scrollFixed() {
  if (window.scrollY > 222) {
    document.querySelector(".fixed").style.display = "flex";
  } else {
    document.querySelector(".fixed").style.display = "none";
  }
};
// =========================
function Up() {
  window.scrollTo(0, 0);
}
// https://www.youtube.com/playlist?list=PLnD96kXp-_pMo0m5hAltTJmrTAaMdxWFF
