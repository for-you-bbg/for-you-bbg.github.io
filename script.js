const audio = document.getElementById("audio--play");
const button = document.getElementById("bttn--play");
const lyrics = document.querySelector(".lyrics");
let starInterval;

let lines = [
  {
    time: 1300,
    text: "Meri hoke hamesha hi rehna kabhi na kehna alwida",
  },
  {
    time: 5900,
    speed: 130,
    text: "Meri subha ho tum hi aur tum hi shaam ho",
  },
  {
    time: 12000,
    speed: 140,
    text: "Tum dard ho",
  },
  {
    time: 14000,
    speed: 140,
    text: "Tum hi aaram ho",
  },
  {
    time: 17200,
    speed: 150,
    text: "Meri duao se aati h bs ye sada",
  },
  {
    time: 23000,
    text: "Meri hoke hamesha hi rehna kabhi na kehna alwida",
  },
  {
    time: 27600,
    speed: 200,
    text: "Ahhh ahhh... haaaaaaaaaaaaaaa ahh",
  },
  {
    time: 36000,
    speed: 150,
    text: "Ohh ohh... hoooooooooo ohh",
  },
  {
    time: 41500,
    speed: 140,
    text: "hmm hmm hmm.....",
  },
  {
    time: 44800,
    text: "Meri hoke hamesha hi rehna kabhi na kehna alwidaaaaa",
  },
  {
    time: 50600,
    speed: 110,
    text: "♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪",
  },
  {
    time: 56390,
    speed: 110,
    text: "♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪",
  },
  {
    time: 63000,
    speed: 110,
    text: "♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪",
  },
];
if (window.innerWidth < 768) {
  lines[10].text = "♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪";
  lines[11].text = "♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪";
  lines[12].text = "♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪";
}
// const speed = (nextTime - currentTime) / text.length;

button.addEventListener("click", () => {
  lyrics.innerHTML = "";
  lyrics.classList.remove("text--hidden");
  document.body.classList.add("img");
  audio.play();

  lyrics.classList.remove("text--hidden");

  lines.forEach((line) => {
    setTimeout(() => {
      typeText(line.text, line.speed);
    }, line.time);
  });
});
function typeText(text, speed = 90) {
  const line = document.createElement("div");
  lyrics.appendChild(line);

  let i = 0;

  const interval = setInterval(() => {
    line.textContent = text.slice(0, i + 1);
    i++;

    if (i >= text.length) {
      clearInterval(interval);
    }
  }, speed);
}
function createStar() {
  const star = document.createElement("span");

  star.className = "sparkle";
  star.textContent = "💕";

  star.style.left = `${Math.random() * 90}%`;
  star.style.top = `${Math.random() * 90}%`;

  const x = (Math.random() - 0.5) * 60;
  const y = (Math.random() - 0.5) * 60;

  star.style.setProperty("--x", `${x}px`);
  star.style.setProperty("--y", `${y}px`);

  star.style.fontSize = `${8 + Math.random() * 8}px`;

  button.appendChild(star);

  star.addEventListener("animationend", () => {
    star.remove();
  });
}

// Start creating hearts on hover
button.addEventListener("mouseleave", () => {
  button.style.color = "black";
});
button.addEventListener("mouseenter", () => {
  if (starInterval) return;

  for (let i = 0; i < 30; i++) {
    createStar();
  }
  starInterval = setInterval(createStar, 45);
});
