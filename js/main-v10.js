/* ================================================================
   KORA Cashmere v10 — main.js (2026)
   Cinematic Hero, Magnetic Buttons, Enhanced Reveals,
   Scroll Indicator, Count-up Stats, Process Animations,
   Back to Top, Header Scroll, prefers-reduced-motion
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // ── 1. CREATE BACK TO TOP BUTTON ──
  const backBtn = document.createElement('button');
  backBtn.className = 'back-to-top';
  backBtn.setAttribute('aria-label', 'Back to top');
  backBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
  document.body.appendChild(backBtn);

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });

  // ── 2. CREATE MOBILE OVERLAY BACKGROUND ──
  const overlayBg = document.createElement('div');
  overlayBg.className = 'mobile-overlay-bg';
  document.body.appendChild(overlayBg);

  // ── 3. NAV SCROLL + ANNOUNCEMENT + BACK TO TOP ──
  const nav = document.getElementById('nav');
  const announcement = document.querySelector('.announcement');

  if (nav) {
    let ticking = false;

    const updateNav = () => {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 50);

      if (announcement) {
        announcement.classList.toggle('hidden', y > 100);
      }

      // Show back-to-top after 600px
      backBtn.classList.toggle('visible', y > 600);

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });
    updateNav();
  }

  // ── 4. HAMBURGER MENU ──
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.mobile-overlay');

  const closeMenu = () => {
    if (hamburger) hamburger.classList.remove('is-active');
    if (overlay) overlay.classList.remove('is-open');
    if (overlayBg) overlayBg.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    if (hamburger) hamburger.classList.add('is-active');
    if (overlay) overlay.classList.add('is-open');
    if (overlayBg) overlayBg.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('is-active') ? closeMenu() : openMenu();
    });
    overlay.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    overlayBg.addEventListener('click', closeMenu);
  }

  // ── 5. REVEAL ON SCROLL (enhanced) ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  const observeReveals = () => {
    document.querySelectorAll('.reveal:not(.revealed)').forEach(el => revealObserver.observe(el));
  };
  observeReveals();

  // ── 6. KEN BURNS HERO ANIMATION ──
  if (!prefersReduced) {
    const heroImg = document.querySelector('.hero-bg-img');
    if (heroImg) {
      heroImg.classList.add('ken-burns');
    }
  }

  // ── 7. HERO WORD-BY-WORD REVEAL ──
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && heroTitle.dataset.words !== 'done') {
    const text = heroTitle.textContent.trim();
    heroTitle.innerHTML = '';
    const words = text.split(/\s+/);
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word + (i < words.length - 1 ? '\u00A0' : '');
      heroTitle.appendChild(span);
    });

    // Reveal words with stagger
    const wordEls = heroTitle.querySelectorAll('.word');
    const baseDelay = prefersReduced ? 0 : 120;

    wordEls.forEach((wordEl, i) => {
      setTimeout(() => {
        wordEl.classList.add('revealed');
      }, baseDelay * i + 200);
    });

    heroTitle.dataset.words = 'done';
  }

  // ── 8. SCROLL INDICATOR ANIMATION ──
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator && !prefersReduced) {
    const scrollLine = scrollIndicator.querySelector('.scroll-line');
    if (scrollLine && !scrollLine.querySelector('.scroll-dot')) {
      const dot = document.createElement('div');
      dot.className = 'scroll-dot';
      scrollLine.appendChild(dot);
    }
  }

  // ── 9. PROCESS NUMBERS ANIMATION ──
  const processNums = document.querySelectorAll('.process-num');
  if (processNums.length > 0) {
    const processObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          processObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    processNums.forEach(el => processObserver.observe(el));
  }

  // ── 10. COUNTER ANIMATION (Fibre Stats) ──
  const counterElements = document.querySelectorAll('.counter');
  if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (isNaN(target)) return;
        counterObserver.unobserve(el);

        if (prefersReduced) {
          el.textContent = target;
          return;
        }

        const duration = 2000;
        const startTime = performance.now();

        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = target;
        };
        requestAnimationFrame(animate);
      });
    }, { threshold: 0.3 });
    counterElements.forEach(el => counterObserver.observe(el));
  }

  // ── 11. PARALLAX (CTA silhouette) ──
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  if (parallaxElements.length > 0 && !prefersReduced) {
    let parallaxTicking = false;
    const updateParallax = () => {
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.15;
        const rect = el.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const offset = (elementCenter - viewportCenter) * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
      parallaxTicking = false;
    };
    window.addEventListener('scroll', () => {
      if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
      }
    }, { passive: true });
    updateParallax();
  }

  // ── 12. MAGNETIC BUTTONS (desktop only) ──
  if (!isTouch && !prefersReduced) {
    document.querySelectorAll('.btn-magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const moveX = x * 0.2;
        const moveY = y * 0.2;
        btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ── 13. PRODUCT ZOOM (mouse-follow, desktop only) ──
  if (!isTouch && !prefersReduced) {
    document.querySelectorAll('.product-card-image').forEach(container => {
      const img = container.querySelector('img');
      if (!img) return;

      container.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.5)';
      });
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        img.style.transformOrigin = `${x}% ${y}%`;
      });
      container.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
        img.style.transformOrigin = 'center center';
      });
    });
  }

  // ── 14. SIZE SELECTOR ──
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.size-btn') || e.target.closest('.size-option');
    if (!btn) return;
    const parent = btn.closest('.size-options') || btn.closest('.product-size-options');
    parent?.querySelectorAll('.size-btn, .size-option').forEach(b => b.classList.remove('is-selected'));
    btn.classList.add('is-selected');
  });

  // ── 15. SHOP FILTER ──
  const filterButtons = document.querySelectorAll('.filter-btn');
  const shopGrid = document.getElementById('shop-grid');

  if (filterButtons.length > 0 && shopGrid) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter || 'all';
        const cards = shopGrid.querySelectorAll('.product-card');
        cards.forEach(card => {
          const category = card.dataset.category;
          const match = filter === 'all' || category === filter;
          if (match) {
            card.style.display = '';
            card.style.opacity = '0';
            requestAnimationFrame(() => { card.style.opacity = '1'; });
          } else {
            card.style.opacity = '0';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
        requestAnimationFrame(observeReveals);
      });
    });
  }

  // ── 16. SMOOTH SCROLL FOR ANCHOR LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    });
  });

  // ── 17. RESPECT PREFERS-REDUCED-MOTION CHANGES ──
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    if (e.matches) {
      // Disable Ken Burns
      const heroImg = document.querySelector('.hero-bg-img');
      if (heroImg) heroImg.classList.remove('ken-burns');

      // Disable magnetic buttons
      document.querySelectorAll('.btn-magnetic').forEach(btn => {
        btn.style.transform = 'translate(0, 0)';
        btn.replaceWith(btn.cloneNode(true));
      });
    }
  });

}); // END DOMContentLoaded
