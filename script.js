/* PORTFOLIO INTERACTIVITY WITH CONTACT FORM */

document.addEventListener("DOMContentLoaded", () => {
  // =====================
  // THEME SWITCHING LOGIC
  // =====================
  function initTheme() {
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateToggleLabel(savedTheme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
    updateToggleLabel(theme);
  }

  function updateToggleLabel(theme) {
    const toggleBtn = document.getElementById("themeToggle");
    if (toggleBtn) {
      toggleBtn.querySelector(".toggle-label").textContent =
        theme === "light" ? "Dark" : "Light";
    }
  }

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current =
        document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  initTheme();

  // =====================
  // LAZY LOADING WITH BLUR-UP
  // =====================
  const lazyImages = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => {
            img.classList.add("loaded");
          };
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px",
    },
  );

  lazyImages.forEach((img) => {
    img.classList.add("lazy");
    imageObserver.observe(img);
  });

  //  TYPING ANIMATION
  const typingEl = document.getElementById("typingText");
  const phrases = [
    "Penetration Tester",
    "Data Science Enthusiast",
    "Cloud Security Specialist",
    "Incident Responder",
    "Ctf Player",
    "Security Data Analyst",
    "DevSecOps Enthusiast",
    "Cybersecurity Educator",
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let typeSpeed = 80;

  function typeLoop() {
    const current = phrases[phraseIdx];
    if (deleting) {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 80;
    }

    if (!deleting && charIdx === current.length) {
      typeSpeed = 2000;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(typeLoop, typeSpeed);
  }
  typeLoop();

  //NAVBAR SCROLL EFFECT
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    // Navbar background
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active link highlighting
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // MOBILE HAMBURGER MENU
  const hamburger = document.getElementById("hamburger");
  const navLinksEl = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinksEl.classList.toggle("open");
  });

  // Close menu on link click
  navLinksEl.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinksEl.classList.remove("open");
    });
  });

  //SCROLL REVEAL (Intersection Observer)
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // SKILL BAR ANIMATION
  const skillFills = document.querySelectorAll(".skill-fill");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const width = target.getAttribute("data-width");
          target.style.width = width + "%";
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  skillFills.forEach((fill) => skillObserver.observe(fill));

  // =====================
  // SKILLS FILTER
  // =====================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const skillCategories = document.querySelectorAll(".skill-category");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      skillCategories.forEach((cat) => {
        if (filter === "all" || cat.dataset.category === filter) {
          cat.classList.remove("hidden");
          cat.style.display = "block";
        } else {
          cat.classList.add("hidden");
          cat.style.display = "none";
        }
      });
    });
  });

  //PROFILE IMAGE FALLBACK
  const profileImg = document.getElementById("profileImg");
  if (profileImg) {
    profileImg.addEventListener("error", () => {
      // Create a canvas-based placeholder
      const canvas = document.createElement("canvas");
      canvas.width = 350;
      canvas.height = 467;
      const ctx = canvas.getContext("2d");
      // Background
      const grd = ctx.createLinearGradient(0, 0, 350, 467);
      grd.addColorStop(0, "#111827");
      grd.addColorStop(1, "#0a0e17");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 350, 467);
      // Circle
      ctx.beginPath();
      ctx.arc(175, 180, 80, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 212, 255, 0.15)";
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 212, 255, 0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();
      // Initials
      ctx.font = "700 48px Orbitron, sans-serif";
      ctx.fillStyle = "#00d4ff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("TM", 175, 185);
      // Label
      ctx.font = "500 14px Inter, sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("Tebello Masike", 175, 310);
      ctx.font = "400 12px Inter, sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText("Cybersecurity & Data Science Enthusiast", 175, 335);
      profileImg.src = canvas.toDataURL();
    });
  }

  // ─── SMOOTH SCROLL FOR BUTTONS ────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // =====================
  // MAGNETIC BUTTONS
  // =====================
  const magneticBtns = document.querySelectorAll(".btn, .hero-cta");

  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      const strength = 8;

      btn.style.transform = `translate(${deltaX * strength}px, ${deltaY * strength}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  // =====================
  // ENHANCED GLOW EFFECTS
  // =====================
  const glowElements = document.querySelectorAll(
    ".btn, .stat-card, .cert-card, .timeline-card, .education-card",
  );

  glowElements.forEach((el) => {
    el.addEventListener("mouseenter", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.setProperty("--glow-x", `${x}px`);
      el.style.setProperty("--glow-y", `${y}px`);
    });
  });

  // =====================
  // POLISHED SCROLL REVEAL
  // =====================
  const polishedReveal = document.querySelectorAll(".section, .hero-content");
  const polishObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("polished");
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  polishedReveal.forEach((el) => polishObserver.observe(el));

  // =====================
  // SMOOTH PARALLAX ON SCROLL
  // =====================
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector(".hero-content");

        if (heroContent && scrolled < 500) {
          heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
          heroContent.style.opacity = 1 - scrolled / 500;
        }

        ticking = false;
      });
      ticking = true;
    }
  });

  // =====================
  // =====================
  // CURSOR TRAILING GLOW
  // =====================
  const cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
    `;
  document.body.appendChild(cursorGlow);

  document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
  });

  document.addEventListener("mouseleave", () => {
    cursorGlow.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursorGlow.style.opacity = "1";
  });

  // ─── GUESS THE NUMBER GAME ────────────────
  const gameModal = document.getElementById("gameModal");
  const heroGamesBtn = document.getElementById("heroGamesBtn");
  const closeGame = document.getElementById("closeGame");
  const guessInput = document.getElementById("guessInput");
  const submitGuess = document.getElementById("submitGuess");
  const gameFeedback = document.getElementById("gameFeedback");
  const attemptCount = document.getElementById("attemptCount");
  const playAgain = document.getElementById("playAgain");

  let targetNumber = 0;
  let attempts = 0;
  const maxAttempts = 10;
  let gameActive = true;

  function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameActive = true;
    attemptCount.textContent = "0";
    guessInput.value = "";
    guessInput.disabled = false;
    submitGuess.disabled = false;
    gameFeedback.textContent = "";
    gameFeedback.className = "game-feedback";
    playAgain.classList.add("hidden");
    guessInput.focus();
  }

  function submitGuessHandler() {
    if (!gameActive) return;

    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      gameFeedback.textContent = "Please enter a number between 1 and 100";
      gameFeedback.className = "game-feedback error";
      return;
    }

    attempts++;
    attemptCount.textContent = attempts;

    if (guess === targetNumber) {
      gameFeedback.textContent = `🎉 Congratulations! You cracked the code in ${attempts} attempts!`;
      gameFeedback.className = "game-feedback success";
      gameActive = false;
      guessInput.disabled = true;
      submitGuess.disabled = true;
      playAgain.classList.remove("hidden");
    } else if (attempts >= maxAttempts) {
      gameFeedback.textContent = `Game over! The number was ${targetNumber}. Better luck next time!`;
      gameFeedback.className = "game-feedback error";
      gameActive = false;
      guessInput.disabled = true;
      submitGuess.disabled = true;
      playAgain.classList.remove("hidden");
    } else if (guess < targetNumber) {
      gameFeedback.textContent = "Too low! Try a higher number.";
      gameFeedback.className = "game-feedback info";
    } else {
      gameFeedback.textContent = "Too high! Try a lower number.";
      gameFeedback.className = "game-feedback info";
    }

    guessInput.value = "";
    guessInput.focus();
  }

  heroGamesBtn.addEventListener("click", () => {
    gameModal.classList.add("active");
    initGame();
  });

  closeGame.addEventListener("click", () => {
    gameModal.classList.remove("active");
  });

  gameModal.addEventListener("click", (e) => {
    if (e.target === gameModal) {
      gameModal.classList.remove("active");
    }
  });

  submitGuess.addEventListener("click", submitGuessHandler);

  guessInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      submitGuessHandler();
    }
  });

  playAgain.addEventListener("click", initGame);
});
