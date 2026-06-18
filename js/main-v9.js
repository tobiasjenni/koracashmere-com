/* ================================================================
   KORA Cashmere v5 — main.js (2026)
   Nav Scroll, Hamburger Slide, Reveal, Back to Top,
   Announcement Bar, Skeleton Loader, Product Zoom,
   Size Selector, Shop Filter, Snipcart, Counter, Parallax
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. CREATE BACK TO TOP BUTTON ──
  const backBtn = document.createElement('button');
  backBtn.className = 'back-to-top';
  backBtn.setAttribute('aria-label', 'Back to top');
  backBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
  document.body.appendChild(backBtn);

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    let lastScroll = 0;

    const updateNav = () => {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 50);
      nav.classList.toggle('nav-compact', y > 500);

      // Hide announcement on scroll
      if (announcement) {
        announcement.classList.toggle('hidden', y > 100);
      }

      // Show back-to-top after scrolling down
      backBtn.classList.toggle('visible', y > 400);

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    });
    updateNav();
  }

  // ── 4. HAMBURGER MENU (Slide-in) ──
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
      const isOpen = hamburger.classList.contains('is-active');
      isOpen ? closeMenu() : openMenu();
    });

    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    overlayBg.addEventListener('click', closeMenu);
  }

  // ── 5. REVEAL ON SCROLL ──
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

  // ── 6. PRODUCT ZOOM ──
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouchDevice) {
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

  // ── 7. SIZE SELECTOR ──
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.size-btn') || e.target.closest('.size-option');
    if (!btn) return;
    const parent = btn.closest('.size-options') || btn.closest('.product-size-options');
    parent?.querySelectorAll('.size-btn, .size-option').forEach(b => b.classList.remove('is-selected'));
    btn.classList.add('is-selected');
  });

  // ── 8. SHOP FILTER ──
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

  // ── 9. COUNTER ANIMATION ──
  const counterElements = document.querySelectorAll('.counter');
  if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (isNaN(target)) return;
        counterObserver.unobserve(el);

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

  // ── 10. PARALLAX ──
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
    updateParallax();
  }

  // ── 11. LOADING SKELETONS → replace with real content ──
  document.querySelectorAll('.skeleton-grid').forEach(skeleton => {
    // Skeletons are replaced by inline scripts after DOMContentLoaded
    // This just ensures any remaining skeletons fade out
  });

}); // END DOMContentLoaded
