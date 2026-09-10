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
      const idx = themeOrder.indexOf(theme);
      const next = themeOrder[(idx + 1) % themeOrder.length];
      const labels = { dark: "Dark", light: "Light", glow: "Glow" };
      toggleBtn.querySelector(".toggle-label").textContent = labels[next];
    }
  }

  const themeOrder = ["dark", "light", "glow"];
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current =
        document.documentElement.getAttribute("data-theme") || "dark";
      const idx = themeOrder.indexOf(current);
      const next = themeOrder[(idx + 1) % themeOrder.length];
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

  // HERO PROMPT COMMAND CYCLING
  const heroPromptCmd = document.getElementById("heroPromptCmd");
  if (heroPromptCmd) {
    const cmds = ["whoami", "ls ~/projects", "cat ./bio.txt", "nmap -sV self"];
    let i = 0;
    let j = 0;
    let deleting = false;
    function tick() {
      const c = cmds[i];
      if (deleting) {
        heroPromptCmd.textContent = c.substring(0, j - 1);
        j--;
        if (j === 0) {
          deleting = false;
          i = (i + 1) % cmds.length;
          setTimeout(tick, 500);
          return;
        }
        setTimeout(tick, 35);
      } else {
        heroPromptCmd.textContent = c.substring(0, j + 1);
        j++;
        if (j === c.length) {
          deleting = true;
          setTimeout(tick, 2000);
          return;
        }
        setTimeout(tick, 70);
      }
    }
    tick();
  }

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
  const skillsFilterBtns = document.querySelectorAll("#skills .filter-btn");
  const skillCategories = document.querySelectorAll(".skill-category");
  const skillsGrid = document.querySelector(".skills-grid");

  const certFilterBtns = document.querySelectorAll("#certifications .filter-btn");
  const certCards = document.querySelectorAll("#certifications .cert-card");

  function applySkillsFilter(filter) {
    skillsFilterBtns.forEach((b) => {
      b.classList.toggle("active", b.dataset.filter === filter);
      b.setAttribute("aria-selected", b.dataset.filter === filter ? "true" : "false");
    });

    let visibleCount = 0;
    skillCategories.forEach((cat) => {
      const match = filter === "all" || cat.dataset.category === filter;
      cat.classList.toggle("hidden", !match);
      cat.style.display = match ? "block" : "none";
      if (match) visibleCount++;
    });

    skillsGrid.classList.toggle("filtered", filter !== "all" && visibleCount === 1);
  }

  function applyCertFilter(filter) {
    certFilterBtns.forEach((b) => {
      b.classList.toggle("active", b.dataset.filter === filter);
      b.setAttribute("aria-selected", b.dataset.filter === filter ? "true" : "false");
    });

    certCards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.style.display = match ? "" : "none";
    });
  }

  skillsFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => applySkillsFilter(btn.dataset.filter));
  });

  certFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => applyCertFilter(btn.dataset.filter));
  });

  applySkillsFilter("programming");
  applyCertFilter("cybersecurity");

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

  function focusGuessInput() {
    // Focus only once the overlay is actually visible: in this task it is
    // still visibility:hidden, and default focus() scrolls the element into
    // view (animated by html{scroll-behavior:smooth}).
    const focusIt = () => {
      if (gameModal.classList.contains("active")) {
        guessInput.focus({ preventScroll: true });
      }
    };
    if (getComputedStyle(gameModal).visibility === "visible") {
      focusIt();
      return;
    }
    gameModal.addEventListener("transitionend", focusIt, { once: true });
    setTimeout(focusIt, 350);
  }

  function openGameModal() {
    gameModal.classList.add("active");
    document.body.classList.add("modal-open");
    initGame();
    focusGuessInput();
  }

  function closeGameModal() {
    gameModal.classList.remove("active");
    document.body.classList.remove("modal-open");
    heroGamesBtn.focus({ preventScroll: true });
  }

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
    guessInput.focus({ preventScroll: true });
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
    guessInput.focus({ preventScroll: true });
  }

  heroGamesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openGameModal();
  });

  closeGame.addEventListener("click", () => {
    closeGameModal();
  });

  gameModal.addEventListener("click", (e) => {
    if (e.target === gameModal) {
      closeGameModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && gameModal.classList.contains("active")) {
      closeGameModal();
    }
  });

  submitGuess.addEventListener("click", submitGuessHandler);

  guessInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      submitGuessHandler();
    }
  });

  playAgain.addEventListener("click", initGame);

  // =====================
  // CEM VIDEO CARD — lazy-load + IntersectionObserver autoplay + play/pause
  // =====================
  (function initCemVideo() {
    const video = document.querySelector(".cem-video");
    if (!video) return;
    const wrap = video.closest(".cem-video-wrap");
    const card = document.querySelector(".cem-video-card");
    const playBtn = wrap ? wrap.querySelector(".cem-video-play") : null;
    if (!wrap || !playBtn || !card) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let hasLoaded = false;

    const PLAY_ICON =
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><polygon points="6,3 20,12 6,21" fill="currentColor"></polygon></svg>';
    const PAUSE_ICON =
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor"></rect><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"></rect></svg>';

    function updateButton(isPlaying) {
      if (isPlaying) {
        playBtn.innerHTML = PAUSE_ICON;
        playBtn.setAttribute("aria-label", "Pause demo video");
      } else {
        playBtn.innerHTML = PLAY_ICON;
        playBtn.setAttribute("aria-label", "Play demo video");
      }
    }

    function syncState() {
      if (video.paused || video.ended) {
        wrap.classList.remove("is-playing");
        wrap.classList.add("is-paused");
        updateButton(false);
      } else {
        wrap.classList.add("is-playing");
        wrap.classList.remove("is-paused");
        updateButton(true);
      }
    }

    function ensureLoaded() {
      if (hasLoaded) return;
      const src = video.getAttribute("data-src");
      if (src) {
        video.src = src;
        // keep poster attribute as-is (Assets/CEM_Preview.mp4 per spec)
        video.load();
      }
      hasLoaded = true;
      wrap.classList.add("is-paused");
      syncState();
    }

    // Initial state: paused, show play button
    wrap.classList.add("is-paused");
    updateButton(false);

    // Events to keep overlay in sync
    video.addEventListener("play", syncState);
    video.addEventListener("pause", syncState);
    video.addEventListener("ended", syncState);

    // Click toggles play/pause (wrap and button)
    function togglePlayback() {
      ensureLoaded();
      // If reduced-motion, allow manual play but never autoplay
      if (video.paused) {
        const p = video.play();
        if (p && typeof p.catch === "function") p.catch(function () {});
      } else {
        video.pause();
      }
    }

    playBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      togglePlayback();
    });

    video.addEventListener("click", togglePlayback);
    wrap.addEventListener("click", function (e) {
      if (e.target === wrap) togglePlayback();
    });

    // Keyboard: Space / Enter on wrap triggers toggle (when focused)
    wrap.setAttribute("tabindex", "-1");
    playBtn.addEventListener("keydown", function (e) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        togglePlayback();
      }
    });

    // Lazy-load observer: load src when card first enters viewport (no eager fetch)
    const lazyObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            ensureLoaded();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px" },
    );
    lazyObserver.observe(card);

    // Autoplay observer: play when >=40% visible, pause when out — respects reduced-motion
    if (!prefersReducedMotion) {
      const autoObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!hasLoaded) return;
            if (entry.intersectionRatio >= 0.4) {
              if (video.paused) {
                const pr = video.play();
                if (pr && typeof pr.catch === "function") pr.catch(function () {});
              }
            } else {
              if (!video.paused) video.pause();
            }
          });
        },
        { threshold: 0.4 },
      );
      autoObserver.observe(wrap);
    } else {
      // Reduced motion: never autoplay, ensure paused and no observer
      video.pause();
    }
  })();
});
