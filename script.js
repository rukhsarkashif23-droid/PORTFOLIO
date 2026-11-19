// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Preloader
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("preloader").classList.add("done"), 700);
});

// Typing effect
const roles = ["Website Designer", "Front-End Learner", "Creative Thinker", "Detail Lover"];
const typedEl = document.getElementById("typed");
let r = 0, c = 0, deleting = false;

function type() {
  const word = roles[r];
  typedEl.textContent = word.slice(0, c);
  if (!deleting && c < word.length) {
    c++; setTimeout(type, 90);
  } else if (!deleting) {
    deleting = true; setTimeout(type, 1500);
  } else if (c > 0) {
    c--; setTimeout(type, 45);
  } else {
    deleting = false; r = (r + 1) % roles.length; setTimeout(type, 300);
  }
}
setTimeout(type, 1800);

// Navbar: scrolled state, progress bar, active link
const nav = document.getElementById("nav");
const progress = document.getElementById("progress");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".links a:not(.nav-cta)");

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  nav.classList.toggle("scrolled", y > 40);
  progress.style.width = (y / max) * 100 + "%";

  let current = "home";
  sections.forEach((s) => {
    if (y >= s.offsetTop - window.innerHeight * 0.4) current = s.id;
  });
  navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const burger = document.getElementById("burger");
const links = document.getElementById("links");
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  links.classList.toggle("open");
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    burger.classList.remove("open");
    links.classList.remove("open");
  })
);

// Scroll reveal (with a small stagger for siblings)
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  if (!el.closest(".hero")) {
    const siblings = [...el.parentElement.children].filter((n) => n.classList.contains("reveal"));
    el.style.transitionDelay = siblings.indexOf(el) * 0.1 + "s";
    io.observe(el);
  }
});

// Cursor glow (desktop only)
const glow = document.getElementById("cursorGlow");
if (window.matchMedia("(pointer: fine)").matches) {
  let gx = 0, gy = 0, tx = 0, ty = 0;
  window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
  (function follow() {
    gx += (tx - gx) * 0.08;
    gy += (ty - gy) * 0.08;
    glow.style.transform = `translate(${gx - 160}px, ${gy - 160}px)`;
    requestAnimationFrame(follow);
  })();
} else {
  glow.style.display = "none";
}

// Magnetic buttons
document.querySelectorAll(".magnetic").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const b = btn.getBoundingClientRect();
    const x = (e.clientX - b.left - b.width / 2) * 0.25;
    const y = (e.clientY - b.top - b.height / 2) * 0.35;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
});

// Project card 3D tilt (desktop only)
const card = document.getElementById("tilt");
if (card && window.matchMedia("(pointer: fine)").matches) {
  card.addEventListener("mousemove", (e) => {
    const b = card.getBoundingClientRect();
    const rx = ((e.clientY - b.top) / b.height - 0.5) * -6;
    const ry = ((e.clientX - b.left) / b.width - 0.5) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener("mouseleave", () => (card.style.transform = ""));
}
