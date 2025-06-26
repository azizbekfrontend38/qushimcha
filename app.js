const playBtn = document.querySelector("#play");
const audio = document.querySelector("audio");
const voiceRange = document.querySelector("#voice");
const voiceValue = document.querySelector("#voice-value");
const backward = document.querySelector("#backward");
const forward = document.querySelector("#forward");
const cover = document.querySelector("#cover");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");
const html = document.documentElement;
const themes = document.getElementById("themes");

let musics = ["Ruhsora-Emm-Meni-esla", "Jah-Khalib-Медина"];
let currentMusic = 0;

// Qo‘shiqni yangilash
function changeMusic(index) {
  cover.src = `./images/${musics[index]}.jpg`;
  cover.alt = musics[index];
  audio.src = `./audio/${musics[index]}.mp3`;
}

// O‘ynatish
function play() {
  audio.play();
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

// Pauza
function pause() {
  audio.pause();
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
}

// Ilk yuklash
changeMusic(currentMusic);
audio.volume = 0.5;
voiceValue.textContent = 50;

// Tugmalar: Play/Pause
playBtn.addEventListener("click", () => {
  audio.paused ? play() : pause();
});

// ✅ "Utqazish" — keyingi ashulaga o‘tish
forward.addEventListener("click", () => {
  currentMusic = (currentMusic + 1) % musics.length;
  changeMusic(currentMusic);
});

// Orqaga
backward.addEventListener("click", () => {
  currentMusic = (currentMusic - 1 + musics.length) % musics.length;
  changeMusic(currentMusic);
});

// Ovoz sozlash
voiceRange.addEventListener("input", () => {
  audio.volume = voiceRange.value / 100;
  voiceValue.textContent = voiceRange.value;
});

// Progress yangilanishi
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
});

// Progressni qo‘lda o‘zgartirish
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Ashula tugaganda avtomatik o'tish
audio.addEventListener("ended", () => {
  forward.click();
});
// darck

const theme = localStorage.getItem("theme");
if (theme) {
  html.dataset.theme = theme;
  themes.checked = html.dataset.theme == "dark" ? true : false;
}
themes.addEventListener("click", () => {
  html.dataset.theme = html.dataset.theme == "light" ? "dark" : "light";
  localStorage.setItem("theme", html.dataset.theme);
  themes.checked = html.dataset.theme == "dark" ? true : false;
});
