// KORA Cashmere — Product Catalog
const COLORS = {
  cream:   { name: 'Cream',     hex: '#F5F0E8' },
  walnut:  { name: 'Walnut',    hex: '#5C4033' },
  terracotta: { name: 'Terracotta', hex: '#C8653E' },
  saffron: { name: 'Saffron',   hex: '#E8B84B' },
  charcoal:{ name: 'Charcoal',  hex: '#36454F' },
  navy:    { name: 'Navy',      hex: '#1B2A4A' }
};

const PRODUCTS = [
  {
    id: 1,
    name: 'Cashmere V-Neck Sweater',
    price: 380,
    category: 'sweaters',
    slug: 'vneck-sweater',
    description: 'The quintessential V-neck, draping softly at the collarbone. Woven from the finest Himalayan fibres for effortless elegance.',
    colors: [COLORS.cream, COLORS.walnut, COLORS.terracotta, COLORS.charcoal],
    // [0] = real product photo (used in shop grid), [1+] = lifestyle/model shots
    images: [
      '/img/products/shop-vneck.jpg',
      '/img/products/vneck-real.jpg',
      '/img/models/model-vneck-female.jpg'
    ],
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
    colors: [COLORS.cream, COLORS.saffron, COLORS.navy, COLORS.charcoal],
    images: [
      '/img/products/shop-crewneck.jpg',
      '/img/products/crewneck-real.jpg',
      '/img/products/crewneck-real-alt.jpg',
      '/img/models/model-crewneck-male.jpg'
    ],
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
    colors: [COLORS.cream, COLORS.terracotta, COLORS.charcoal, COLORS.navy],
    images: [
      '/img/products/shop-turtleneck.jpg',
      '/img/products/turtleneck-real.jpg',
      '/img/products/turtleneck-real-alt1.jpg',
      '/img/products/turtleneck-real-alt2.jpg',
      '/img/models/model-turtleneck-female.jpg'
    ],
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
    colors: [COLORS.cream, COLORS.walnut, COLORS.terracotta, COLORS.saffron, COLORS.navy],
    images: [
      '/img/products/shop-scarf.jpg',
      '/img/products/scarf-real.jpg',
      '/img/models/model-scarf-female.jpg'
    ],
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
    colors: [COLORS.walnut, COLORS.charcoal, COLORS.navy, COLORS.terracotta],
    images: [
      '/img/products/shop-gloves.jpg',
      '/img/products/cashmere-gloves.jpg',
      '/img/models/model-gloves-male.jpg'
    ],
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
    colors: [COLORS.cream, COLORS.charcoal, COLORS.navy, COLORS.saffron],
    images: [
      '/img/products/shop-socks.jpg',
      '/img/products/cashmere-socks.jpg',
      '/img/models/model-socks-cozy.jpg'
    ],
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
    const swatches = product.colors.map(c =>
      `<div class="color-swatch" style="background-color:${c.hex}" title="${c.name}"></div>`
    ).join('');

    // Use first image (real product photo) for shop grid
    const shopImg = product.images[0];

    return `
      <div class="product-card" data-category="${product.category}" data-slug="${product.slug}">
        <a href="/product?p=${product.slug}" class="product-card-image-link">
          <div class="product-card-image">
            <img src="${shopImg}" alt="${product.name}" loading="lazy">
          </div>
        </a>
        <div class="product-card-info">
          <a href="/product?p=${product.slug}" class="product-card-name-link">
            <h3 class="product-card-name">${product.name}</h3>
          </a>
          <div class="product-card-price">€${product.price}</div>
          <div class="product-card-swatches">${swatches}</div>
          <button class="snipcart-add-item btn btn-primary"
            data-item-id="${product.slug}"
            data-item-name="${product.name}"
            data-item-price="${product.price}"
            data-item-url="/product?p=${product.slug}"
            data-item-image="${shopImg}"
            data-item-description="${product.description}">
            Add to Bag
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

  const swatches = product.colors.map(c =>
    `<div class="color-swatch-large" style="background-color:${c.hex}" title="${c.name}" data-color="${c.name}"></div>`
  ).join('');

  const sizes = ['S', 'M', 'L', 'XL'].map(s =>
    `<div class="size-option" data-size="${s}">${s}</div>`
  ).join('');

  // Build image gallery: primary = real product photo (large), then thumbnail strip
  const primaryImg = product.images[0];
  const thumbnails = product.images.map((img, i) =>
    `<img src="${img}" alt="${product.name} — ${i === 0 ? 'Product' : 'Detail'}" 
         class="gallery-thumb${i === 0 ? ' active' : ''}" 
         onclick="switchGalleryImage(this, '${img}')" 
         loading="lazy">`
  ).join('');

  return `
    <div class="product-detail">
      <div class="product-detail-gallery">
        <div class="gallery-main-wrap">
          <img id="gallery-main" src="${primaryImg}" alt="${product.name}" class="gallery-main">
        </div>
        <div class="gallery-thumb-strip">
          ${thumbnails}
        </div>
      </div>
      <div class="product-detail-info">
        <h1 class="product-detail-name">${product.name}</h1>
        <div class="product-detail-price">€${product.price}</div>
        <p class="product-detail-description">${product.description}</p>

        <div class="product-detail-section">
          <label>Color</label>
          <div class="product-color-options">${swatches}</div>
        </div>

        <div class="product-detail-section">
          <label>Size</label>
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
          data-item-image="${primaryImg}"
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

// Gallery image switcher (global function)
function switchGalleryImage(thumb, src) {
  document.getElementById('gallery-main').src = src;
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}
window.switchGalleryImage = switchGalleryImage;

window.PRODUCTS = PRODUCTS;
window.renderShopGrid = renderShopGrid;
window.renderProductPage = renderProductPage;
