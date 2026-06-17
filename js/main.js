// KORA Cashmere — Main JS
document.addEventListener('DOMContentLoaded', function() {
  
  // ═══════════════════════════════════════════════
  // NAV SCROLL STATE
  // ═══════════════════════════════════════════════
  const nav = document.getElementById('nav');
  if (nav) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          nav.classList.toggle('scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    });
    // Initial check
    if (window.scrollY > 50) nav.classList.add('scrolled');
  }

  // ═══════════════════════════════════════════════
  // HAMBURGER MENU
  // ═══════════════════════════════════════════════
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.mobile-overlay');
  
  if (hamburger && overlay) {
    hamburger.addEventListener('click', function() {
      const isOpen = this.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      // Show overlay with opacity transition
      if (isOpen) {
        overlay.style.display = 'flex';
        requestAnimationFrame(() => {
          overlay.style.opacity = '1';
        });
      } else {
        overlay.style.opacity = '0';
        setTimeout(() => { overlay.style.display = 'none'; }, 400);
      }
    });

    // Close on link click
    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        overlay.classList.remove('open');
        overlay.style.opacity = '0';
        setTimeout(() => { overlay.style.display = 'none'; }, 400);
        document.body.style.overflow = '';
      });
    });
  }

  // ═══════════════════════════════════════════════
  // SCROLL REVEAL (IntersectionObserver)
  // ═══════════════════════════════════════════════
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ═══════════════════════════════════════════════
  // FEATURED PRODUCTS (Homepage)
  // ═══════════════════════════════════════════════
  const featuredGrid = document.getElementById('featured-products');
  if (featuredGrid && typeof PRODUCTS !== 'undefined') {
    featuredGrid.innerHTML = PRODUCTS.map(p => renderProductCard(p, true)).join('');
    // Observe new reveal elements
    featuredGrid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  // ═══════════════════════════════════════════════
  // SHOP PAGE
  // ═══════════════════════════════════════════════
  const shopGrid = document.getElementById('shop-grid');
  if (shopGrid && typeof PRODUCTS !== 'undefined') {
    renderShopGrid('all');
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderShopGrid(this.dataset.filter);
        // Re-observe reveals
        shopGrid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
      });
    });
  }

  // ═══════════════════════════════════════════════
  // PRODUCT DETAIL PAGE
  // ═══════════════════════════════════════════════
  const productSlug = new URLSearchParams(window.location.search).get('p');
  if (productSlug && document.getElementById('product-detail') && typeof PRODUCTS !== 'undefined') {
    renderProductDetail(productSlug);
  }

}); // end DOMContentLoaded

// ════════════════════════════════════════════════════════════
// SHOP GRID RENDERER
// ════════════════════════════════════════════════════════════
function renderShopGrid(filter) {
  const grid = document.getElementById('shop-grid');
  if (!grid) return;

  const products = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category.toLowerCase() === filter);

  grid.innerHTML = products.map((p, i) => {
    const delayClass = `reveal-d${Math.min((i % 6) + 1, 9)}`;
    return `
      <a href="/product?p=${p.slug}" class="product-card reveal ${delayClass}" data-category="${p.category.toLowerCase()}">
        <div class="product-card-image">
          <img src="${p.img}" alt="${p.name}" loading="lazy"
               onerror="var pl=this.nextElementSibling;this.style.display='none';if(pl)pl.style.display='flex'">
          <div class="placeholder-img">${p.category}</div>
        </div>
        <div class="product-card-category">${p.category}</div>
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-price">€${p.price.toFixed(0)}</div>
      </a>
    `;
  }).join('');
}

// ════════════════════════════════════════════════════════════
// PRODUCT DETAIL RENDERER
// ════════════════════════════════════════════════════════════
function renderProductDetail(slug) {
  const product = PRODUCTS.find(p => p.slug === slug);
  if (!product) {
    document.getElementById('product-detail').innerHTML = '<p>Product not found.</p>';
    return;
  }

  const container = document.getElementById('product-detail');

  // Determine sizes
  const isAccessory = product.category === 'Accessories';
  const sizes = isAccessory ? ['One Size'] : ['S', 'M', 'L', 'XL'];

  container.innerHTML = `
    <div class="product-detail">
      <div class="product-detail-image">
        <img src="${product.img}" alt="${product.name}" 
             onerror="var pl=this.nextElementSibling;this.style.display='none';if(pl)pl.style.display='flex'">
        <div class="placeholder-img" style="font-size:15px;letter-spacing:3px;display:none;">${product.category}</div>
      </div>
      <div class="product-detail-info">
        <div class="product-detail-category">${product.category}</div>
        <h1>${product.name}</h1>
        <div class="product-detail-price">€${product.price.toFixed(0)}</div>
        <p class="product-detail-desc">${product.description}</p>
        <div class="size-selector">
          <label>Size</label>
          <div class="size-options">
            ${sizes.map((s, i) => `<button class="size-btn ${i === 1 ? 'selected' : ''}" data-size="${s}">${s}</button>`).join('')}
          </div>
        </div>
        <ul class="product-detail-meta">
          ${product.details.map(d => `<li>${d}</li>`).join('')}
        </ul>
        <button class="btn btn-gold snipcart-add-item" style="border:none;cursor:pointer;font-family:var(--sans);"
          data-item-id="${product.id}"
          data-item-price="${product.price}"
          data-item-name="${product.name}"
          data-item-url="${window.location.origin}/product?p=${product.slug}">
          Add to Bag — €${product.price.toFixed(0)}
        </button>
      </div>
    </div>
  `;

  // Size selector interactivity
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
    });
  });
}
