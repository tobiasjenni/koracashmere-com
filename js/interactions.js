// KORA Cashmere — Premium Interactions
// 3D Tilt, Parallax, Custom Cursor, Micro-interactions

(function() {
  'use strict';

  // ══════════════════════════════════════════════════════════════
  // 1. CUSTOM CURSOR — Himalayan Dust
  // ══════════════════════════════════════════════════════════════
  const cursor = document.createElement('div');
  cursor.className = 'kora-cursor';
  const cursorRing = document.createElement('div');
  cursorRing.className = 'kora-cursor-ring';
  document.body.appendChild(cursor);
  document.body.appendChild(cursorRing);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on clickable/imagery
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, .product-card, .value-card, .craft-image');
    if (target) {
      cursorRing.classList.add('kora-cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, .product-card, .value-card, .craft-image');
    if (target) {
      cursorRing.classList.remove('kora-cursor-hover');
    }
  });

  // Hide cursor on mobile
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorRing.style.display = 'none';
  }

  // ══════════════════════════════════════════════════════════════
  // 2. 3D TILT PRODUCT CARDS
  // ══════════════════════════════════════════════════════════════
  const tiltCards = document.querySelectorAll('.product-card, .value-card');
  tiltCards.forEach(card => {
    card.classList.add('kora-tilt');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.setProperty('--rx', `${rotateX}deg`);
      card.style.setProperty('--ry', `${rotateY}deg`);
      card.style.setProperty('--s', '1.02');
      // Glow follow
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      card.style.setProperty('--gx', `${pctX}%`);
      card.style.setProperty('--gy', `${pctY}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--s', '1');
    });
  });

  // ══════════════════════════════════════════════════════════════
  // 3. PARALLAX HIMALAYAN SCROLL
  // ══════════════════════════════════════════════════════════════
  const parallaxLayers = document.querySelectorAll('[data-parallax]');
  let lastScrollY = window.scrollY;
  let rafPending = false;

  function updateParallax() {
    const sy = window.scrollY;
    parallaxLayers.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.2;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = sy * speed;
        el.style.transform = `translateY(${offset}px)`;
      }
    });
    rafPending = false;
  }

  window.addEventListener('scroll', () => {
    if (!rafPending) {
      requestAnimationFrame(updateParallax);
      rafPending = true;
    }
  });

  // ══════════════════════════════════════════════════════════════
  // 4. SMOOTH IMAGE ZOOM ON PRODUCT PAGE
  // ══════════════════════════════════════════════════════════════
  const detailImage = document.querySelector('.product-detail-image');
  if (detailImage) {
    const img = detailImage.querySelector('img');
    if (img) {
      detailImage.addEventListener('mousemove', (e) => {
        const rect = detailImage.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = 'scale(1.8)';
      });
      detailImage.addEventListener('mouseleave', () => {
        img.style.transformOrigin = 'center center';
        img.style.transform = 'scale(1)';
      });
    }
  }

  // ══════════════════════════════════════════════════════════════
  // 5. REVEAL WITH STAGGER & DIRECTION
  // ══════════════════════════════════════════════════════════════
  // Enhanced reveal — elements can come from left/right too
  const enhancedReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const dir = el.dataset.revealDir || 'up';
        const delay = parseFloat(el.dataset.revealDelay) || 0;
        setTimeout(() => {
          el.classList.add('revealed');
          if (dir === 'left') {
            el.style.transform = 'translateX(0)';
          } else if (dir === 'right') {
            el.style.transform = 'translateX(0)';
          } else {
            el.style.transform = 'translateY(0)';
          }
          el.style.opacity = '1';
        }, delay * 1000);
        enhancedReveal.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => enhancedReveal.observe(el));

  // ══════════════════════════════════════════════════════════════
  // 6. COUNTER ANIMATION (Stats)
  // ══════════════════════════════════════════════════════════════
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = parseInt(el.dataset.duration) || 2000;
        const start = performance.now();
        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          el.textContent = current.toLocaleString();
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  // ══════════════════════════════════════════════════════════════
  // 7. MAGNETIC BUTTONS
  // ══════════════════════════════════════════════════════════════
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ══════════════════════════════════════════════════════════════
  // 8. SMOOTH HERO TEXT REVEAL (split words)
  // ══════════════════════════════════════════════════════════════
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && !heroTitle.dataset.split) {
    heroTitle.dataset.split = 'done';
    const words = heroTitle.textContent.trim().split(/\s+/);
    heroTitle.innerHTML = words.map((word, i) =>
      `<span class="kora-word" style="display:inline-block;transition:all 0.6s cubic-bezier(0.25,0.46,0.45,0.94);transition-delay:${i * 0.07}s">${word}</span>`
    ).join(' ');
    // Trigger animation after mount
    requestAnimationFrame(() => {
      heroTitle.querySelectorAll('.kora-word').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        // Stagger
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 400);
      });
    });
  }

})();
