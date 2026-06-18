// KORA Cashmere — Product Catalog
const COLORS = {
  cream:    { name: 'Cream',     hex: '#F5F0E8', key: 'cream' },
  fawn:     { name: 'Fawn',      hex: '#C4A882', key: 'fawn' },
  charcoal: { name: 'Charcoal',  hex: '#4A4A4A', key: 'charcoal' }
};

const PRODUCTS = [
  {
    id: 1,
    name: 'Cashmere V-Neck Sweater',
    price: 380,
    category: 'sweaters',
    slug: 'vneck-sweater',
    description: 'The quintessential V-neck, draping softly at the collarbone. Woven from the finest Himalayan fibres for effortless elegance.',
    colors: [COLORS.cream, COLORS.fawn, COLORS.charcoal],
    imagesByColor: {
      cream:    '/img/products/shop-vneck-new.jpg',
      fawn:     '/img/products/shop-vneck-fawn.jpg',
      charcoal: '/img/products/shop-vneck-charcoal.jpg'
    },
    image: '/img/products/shop-vneck-fawn.jpg',
    material: '100% Himalayan Cashmere',
    weight: '230gsm',
    origin: 'Handcrafted in the Kathmandu Valley, Nepal',
    makerName: 'Asha',
    makerQuote: 'Every loop I knit carries the warmth of my grandmother\'s hands guiding mine beneath the Himalayan sun.'
  },
  {
    id: 2,
    name: 'Cashmere Crewneck Sweater',
    price: 380,
    category: 'sweaters',
    slug: 'crewneck-sweater',
    description: 'Pure comfort in its most honest form. A crewneck that hugs gently and endures seasons, dyed with earth\'s own pigments.',
    colors: [COLORS.cream, COLORS.fawn, COLORS.charcoal],
    imagesByColor: {
      cream:    '/img/products/shop-crewneck-cream.jpg',
      fawn:     '/img/products/shop-crewneck-new.jpg',
      charcoal: '/img/products/shop-crewneck-charcoal.jpg'
    },
    image: '/img/products/shop-crewneck-new.jpg',
    material: '100% Himalayan Cashmere',
    weight: '230gsm',
    origin: 'Handcrafted in the Kathmandu Valley, Nepal',
    makerName: 'Asha',
    makerQuote: 'To knit cashmere is to listen — the fibres tell you when the tension is true, when the soul is in the stitch.'
  },
  {
    id: 3,
    name: 'Cashmere Turtleneck Sweater',
    price: 420,
    category: 'sweaters',
    slug: 'turtleneck-sweater',
    description: 'A cocoon of warmth. The double-layer turtleneck frames the face like a sculpture, soft as a mountain breeze.',
    colors: [COLORS.cream, COLORS.fawn, COLORS.charcoal],
    imagesByColor: {
      cream:    '/img/products/shop-turtleneck-cream.jpg',
      fawn:     '/img/products/shop-turtleneck-fawn.jpg',
      charcoal: '/img/products/shop-turtleneck-new.jpg'
    },
    image: '/img/products/shop-turtleneck-fawn.jpg',
    material: '100% Himalayan Cashmere',
    weight: '230gsm',
    origin: 'Handcrafted in the Kathmandu Valley, Nepal',
    makerName: 'Asha',
    makerQuote: 'A turtleneck demands patience — each row must rise evenly, like the terraced hills of my homeland.'
  },
  {
    id: 4,
    name: 'Cashmere Scarf',
    price: 120,
    category: 'accessories',
    slug: 'classic-scarf',
    description: 'Draped softly around the shoulders or tied with intention. An heirloom-weight scarf touched by Himalayan hands.',
    colors: [COLORS.cream, COLORS.fawn, COLORS.charcoal],
    imagesByColor: {
      cream:    '/img/products/shop-scarf-new.jpg',
      fawn:     '/img/products/shop-scarf-fawn.jpg',
      charcoal: '/img/products/shop-scarf-charcoal.jpg'
    },
    image: '/img/products/shop-scarf-fawn.jpg',
    material: '100% Himalayan Cashmere',
    weight: '180gsm',
    origin: 'Handcrafted in the Kathmandu Valley, Nepal',
    makerName: 'Durga',
    makerQuote: 'The loom sings when the yarn is happy. A scarf woven with joy wraps its wearer in that same song.'
  },
  {
    id: 5,
    name: 'Cashmere Gloves',
    price: 85,
    category: 'accessories',
    slug: 'cashmere-gloves',
    description: 'Touch the world softly. Touchscreen-ready fingertips meet Himalayan warmth in a glove that honours craft and connection.',
    colors: [COLORS.cream, COLORS.fawn, COLORS.charcoal],
    imagesByColor: {
      cream:    '/img/products/shop-gloves-cream.jpg',
      fawn:     '/img/products/shop-gloves.jpg',
      charcoal: '/img/products/shop-gloves-charcoal.jpg'
    },
    image: '/img/products/shop-gloves.jpg',
    material: '100% Himalayan Cashmere',
    weight: '160gsm',
    origin: 'Handcrafted in the Kathmandu Valley, Nepal',
    makerName: 'Maya',
    makerQuote: 'My fingers dance across the needles each morning, weaving warmth for hands that may be far from home.'
  },
  {
    id: 6,
    name: 'Cashmere Socks',
    price: 75,
    category: 'accessories',
    slug: 'cashmere-socks',
    description: 'Step into a secret luxury. Pure cashmere against the skin from heel to toe, hand-finished with care in every thread.',
    colors: [COLORS.cream, COLORS.fawn, COLORS.charcoal],
    imagesByColor: {
      cream:    '/img/products/shop-socks-cream.jpg',
      fawn:     '/img/products/shop-socks-fawn.jpg',
      charcoal: '/img/products/shop-socks.jpg'
    },
    image: '/img/products/shop-socks-fawn.jpg',
    material: '100% Himalayan Cashmere',
    weight: '150gsm',
    origin: 'Handcrafted in the Kathmandu Valley, Nepal',
    makerName: 'Durga',
    makerQuote: 'Even the smallest garment deserves the greatest care. A sock is a beginning, not an end.'
  }
];

function renderShopGrid(filter) {
  const filtered = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filter);

  return filtered.map(product => {
    const defaultImg = product.image;
    const swatches = product.colors.map(c => {
      const imgSrc = product.imagesByColor[c.key] || defaultImg;
      return `<div class="color-swatch" style="background-color:${c.hex}" title="${c.name}" 
                    data-color="${c.key}" data-image="${imgSrc}" data-product="${product.slug}"
                    onclick="switchGridColor(this, '${c.key}', '${imgSrc}', '${product.slug}')"></div>`;
    }).join('');

    return `
      <div class="product-card" data-category="${product.category}" data-slug="${product.slug}">
        <a href="/product?p=${product.slug}" class="product-card-image-link">
          <div class="product-card-image">
            <img id="grid-img-${product.slug}" src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-card-image-overlay">
              <span class="quick-view-hint">Quick View</span>
            </div>
          </div>
        </a>
        <div class="product-card-body">
          <a href="/product?p=${product.slug}" class="product-card-name-link">
            <h3 class="product-card-title">${product.name}</h3>
          </a>
          <div class="product-card-price">€${product.price}</div>
          <div class="product-card-colors">${swatches}</div>
          <button class="snipcart-add-item btn-add-to-bag"
            data-item-id="${product.slug}"
            data-item-name="${product.name}"
            data-item-price="${product.price}"
            data-item-url="/product?p=${product.slug}"
            data-item-image="${product.image}"
            data-item-description="${product.description}">
            <svg class="bag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderProductPage(slug) {
  const product = PRODUCTS.find(p => p.slug === slug);
  if (!product) {
    return '<div class="product-not-found"><h2>Product not found</h2><p><a href="/shop">Return to Shop</a></p></div>';
  }

  // Color swatches with click handler to switch image
  const swatches = product.colors.map((c, i) => {
    const imgSrc = product.imagesByColor[c.key] || product.image;
    return `<div class="color-swatch-large${i === 0 ? ' is-selected' : ''}" 
                 style="background-color:${c.hex}" 
                 title="${c.name}" 
                 data-color="${c.key}"
                 data-image="${imgSrc}"
                 onclick="switchProductColor(this, '${c.key}', '${imgSrc}')"></div>`;
  }).join('');

  const sizes = ['S', 'M', 'L', 'XL'].map((s, i) =>
    `<div class="size-option${i === 0 ? ' is-selected' : ''}" data-size="${s}">${s}</div>`
  ).join('');

  return `
    <div class="product-detail">
      <div class="product-detail-gallery">
        <div class="gallery-main-wrap">
          <img id="gallery-main" src="${product.image}" alt="${product.name}" class="gallery-main">
        </div>
      </div>
      <div class="product-detail-info">
        <h1 class="product-detail-name">${product.name}</h1>
        <div class="product-detail-price">€${product.price}</div>
        <p class="product-detail-description">${product.description}</p>

        <div class="product-detail-section">
          <label>Color — <span id="selected-color-name">${product.colors[0].name}</span></label>
          <div class="product-color-options">${swatches}</div>
        </div>

        <div class="product-detail-section">
          <label>Size <a href="/size-guide" style="font-weight:300;font-size:10px;letter-spacing:1.5px;color:var(--terracotta);text-decoration:underline;text-underline-offset:3px;">Size Guide</a></label>
          <div class="product-size-options">${sizes}</div>
        </div>

        <div class="product-specs">
          <div class="spec-row"><span class="spec-label">Material</span><span class="spec-value">${product.material}</span></div>
          <div class="spec-row"><span class="spec-label">Weight</span><span class="spec-value">${product.weight}</span></div>
          <div class="spec-row"><span class="spec-label">Origin</span><span class="spec-value">${product.origin}</span></div>
        </div>

        <button class="snipcart-add-item product-add-to-bag btn btn-primary"
          data-item-id="${product.slug}"
          data-item-name="${product.name}"
          data-item-price="${product.price}"
          data-item-url="/product?p=${product.slug}"
          data-item-image="${product.image}"
          data-item-description="${product.description}">
          Add to Bag — €${product.price}
        </button>

        <div class="meet-the-maker">
          <h4 class="maker-name">Meet ${product.makerName}</h4>
          <p class="maker-quote">"${product.makerQuote}"</p>
        </div>
      </div>
    </div>
  `;
}

// Color swatch click → switch product image
function switchProductColor(swatchEl, colorKey, imageSrc) {
  // Update main image
  const mainImg = document.getElementById('gallery-main');
  if (mainImg) {
    mainImg.src = imageSrc;
    mainImg.alt = mainImg.alt.replace(/Cream|Fawn|Charcoal/g, 
      colorKey.charAt(0).toUpperCase() + colorKey.slice(1));
  }

  // Update active state on swatches
  document.querySelectorAll('.color-swatch-large').forEach(s => s.classList.remove('is-selected'));
  swatchEl.classList.add('is-selected');

  // Update color name label
  const label = document.getElementById('selected-color-name');
  if (label) {
    label.textContent = colorKey.charAt(0).toUpperCase() + colorKey.slice(1);
  }

  // Update Snipcart image to match selected color
  const addBtn = document.querySelector('.snipcart-add-item');
  if (addBtn) {
    addBtn.setAttribute('data-item-image', imageSrc);
  }
}
window.switchProductColor = switchProductColor;

// Shop grid color swatch → switch product card image
function switchGridColor(swatchEl, colorKey, imageSrc, productSlug) {
  // Update the card image
  const cardImg = document.getElementById('grid-img-' + productSlug);
  if (cardImg) {
    cardImg.src = imageSrc;
  }

  // Update active state on swatches within this card
  const card = swatchEl.closest('.product-card');
  if (card) {
    card.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('is-selected'));
  }
  swatchEl.classList.add('is-selected');

  // Update Snipcart add-to-bag button image
  if (card) {
    const addBtn = card.querySelector('.snipcart-add-item');
    if (addBtn) {
      addBtn.setAttribute('data-item-image', imageSrc);
    }
  }
}
window.switchGridColor = switchGridColor;

window.PRODUCTS = PRODUCTS;
window.renderShopGrid = renderShopGrid;
window.renderProductPage = renderProductPage;
