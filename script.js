const audio = document.getElementById("audio--play");
const button = document.getElementById("bttn--play");
const lyrics = document.querySelector(".lyrics");
const container = document.querySelector(".container");
const greenBox = document.querySelector(".green");
const purpleBox = document.querySelector(".purple");

const tl = gsap.timeline();
let starInterval;

const repeatt = {
  repeat: -1,
  yoyo: true,
};

gsap.defaults({
  duration: 1,
});

const originalMusicLines = [
  { time: 1300, text: "Meri hoke hamesha hi rehna kabhi na kehna alwida" },
  { time: 5900, speed: 130, text: "Meri subha ho tum hi aur tum hi shaam ho" },
  { time: 12000, speed: 140, text: "Tum dard ho" },
  { time: 14000, speed: 140, text: "Tum hi aaram ho" },
  { time: 17200, speed: 150, text: "Meri duao se aati h bs ye sada" },
  { time: 23000, text: "Meri hoke hamesha hi rehna kabhi na kehna alwida" },
  { time: 27600, speed: 200, text: "Ahhh ahhh... haaaaaaaaaaaaaaa ahh" },
  { time: 36000, speed: 150, text: "Ohh ohh... hoooooooooo ohh" },
  { time: 41500, speed: 140, text: "hmm hmm hmm....." },
  { time: 44800, text: "Meri hoke hamesha hi rehna kabhi na kehna alwidaaaaa" },
  {
    time: 50600,
    speed: 110,
    text: "♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪",
  },
  {
    time: 56000,
    speed: 110,
    text: "♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪",
  },
  {
    time: 61500,
    speed: 110,
    text: "♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪",
  },
];

let lines = originalMusicLines.map((line) => ({ ...line }));

button.addEventListener("click", () => {
  lyrics.innerHTML = "";
  document.body.classList.add("img");
  container.classList.add("hidden");
  audio.play();

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

button.addEventListener("mouseleave", () => {
  button.style.backgroundColor = "blue";
});

// Start creating hearts on hover
button.addEventListener("mouseenter", () => {
  if (starInterval) return;

  for (let i = 0; i < 30; i++) {
    createStar();
  }
  starInterval = setInterval(createStar, 45);
});

const mm = gsap.matchMedia();

mm.add(
  {
    isMobile: "(max-width: 767px)",
    isDesktop: "(min-width: 768px)",
  },
  (context) => {
    const { isMobile } = context.conditions;

    tl.clear();

    if (isMobile) {
      lines[10].text = "♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪";
      lines[11].text = "♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪";
      lines[12].text = "♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪";

      gsap.from(button, { x: -200, y: 200, opacity: 0 });
      gsap.to(button, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      });

      const axis = 50;
      tl.to(container, { y: axis + 150, duration: 1 })
        .to(container, {
          x: axis,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
        })
        .to(container, {
          x: -axis,
          yoyo: true,
          duration: 0.5,
          repeat: -1,
          ease: "power2.inOut",
        });
    } else {
      gsap.from(button, { x: -200, y: 600, opacity: 0 });
      gsap.to(button, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.5,
        rotate: 360,
      });

      const axis = 400;
      tl.to(container, { y: axis - 100, duration: 1 })
        .to(container, { x: axis, duration: 1 })
        .to(container, {
          x: -axis,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
    }

    gsap.to(greenBox, { rotate: 360, ...repeatt });
    gsap.to(purpleBox, { rotate: 360, ...repeatt });

    return () => {
      lines[10].text = originalMusicLines[10].text;
      lines[11].text = originalMusicLines[11].text;
      lines[12].text = originalMusicLines[12].text;
    };
  },
);
