/* ================================================================
   KORA Cashmere v4 — main.js (2026)
   Alle Funktionen: Nav Scroll, Hamburger, Reveal, Product Zoom,
   Size Selector, Shop Filter, Snipcart, Counter, Parallax
   Sauberes ES6, keine Dependencies.
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────────────────────────
  // 1. NAV SCROLL BEHAVIOR
  // ─────────────────────────────────────────────────────────────
  const nav = document.getElementById('nav');
  if (nav) {
    let ticking = false;
    const updateNav = () => {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 50);
      nav.classList.toggle('nav-compact', y > 500);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    });
    // Initial state
    updateNav();
  }

  // ─────────────────────────────────────────────────────────────
  // 2. HAMBURGER MENU
  // ─────────────────────────────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.mobile-overlay');

  const closeMenu = () => {
    hamburger.classList.remove('is-active');
    overlay.classList.remove('is-open');
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 400);
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    hamburger.classList.add('is-active');
    overlay.classList.add('is-open');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });
  };

  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('is-active');
      isOpen ? closeMenu() : openMenu();
    });

    // Overlay schliesst beim Klick auf einen Link
    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 3. REVEAL ON SCROLL (IntersectionObserver)
  // ─────────────────────────────────────────────────────────────
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

  // ─────────────────────────────────────────────────────────────
  // 4. PRODUCT ZOOM (für Produktseite/product-detail)
  // ─────────────────────────────────────────────────────────────
  const initProductZoom = () => {
    const containers = document.querySelectorAll('.product-image-container');
    if (containers.length === 0) return;

    // Touch detection: deaktivieren auf Touch-Geräten
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    containers.forEach(container => {
      if (isTouchDevice) return; // Nur klassischer pinch-zoom

      const img = container.querySelector('img');
      if (!img) return;

      container.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.8)';
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
  };
  initProductZoom();

  // ─────────────────────────────────────────────────────────────
  // 5. SIZE SELECTOR (für product.html — .size-option und shop.html — .size-btn)
  // ─────────────────────────────────────────────────────────────
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.size-btn') || e.target.closest('.size-option');
    if (!btn) return;
    const parent = btn.closest('.size-options') || btn.closest('.product-size-options');
    parent?.querySelectorAll('.size-btn, .size-option').forEach(b => b.classList.remove('is-selected'));
    btn.classList.add('is-selected');
  });

  // ─────────────────────────────────────────────────────────────
  // 6. SHOP FILTER (für shop.html)
  // ─────────────────────────────────────────────────────────────
  const filterButtons = document.querySelectorAll('.filter-btn');
  const shopGrid = document.getElementById('shop-grid');

  if (filterButtons.length > 0 && shopGrid) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        // Aktiven Button setzen
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter || 'all';

        // Produkt-Cards filtern mit sanfter Transition
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

        // Neue Reveals beobachten
        requestAnimationFrame(observeReveals);
      });
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 7. SNIPCART
  // ─────────────────────────────────────────────────────────────
  // Snipcart aktualisiert snipcart-items-count automatisch.
  // Prüfen ob Snipcart geladen ist und ggf. initialisieren.
  const checkoutBtn = document.querySelector('.snipcart-checkout');
  if (checkoutBtn) {
    // Snipcart-Integration ist bereit — kein weiterer Code nötig,
    // da Snipcart selbst das items-count via data-item-count aktualisiert.
    // Wir stellen nur sicher, dass das Element existiert.
  }

  // ─────────────────────────────────────────────────────────────
  // 8. COUNTER ANIMATION (optional, für Story-Seite)
  // ─────────────────────────────────────────────────────────────
  const counterElements = document.querySelectorAll('.counter');
  if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (isNaN(target)) return;

        counterObserver.unobserve(el);

        // Von 0 bis Zielwert hochzählen
        const duration = 2000; // ms
        const startTime = performance.now();

        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          el.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = target;
          }
        };

        requestAnimationFrame(animate);
      });
    }, { threshold: 0.3 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // ─────────────────────────────────────────────────────────────
  // 9. PARALLAX (subtle)
  // ─────────────────────────────────────────────────────────────
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  if (parallaxElements.length > 0) {
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
    });

    // Initial setzen
    updateParallax();
  }

}); // Ende DOMContentLoaded
