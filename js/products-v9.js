     1|     1|// KORA Cashmere — Product Catalog
     2|     2|const COLORS = {
     3|     3|  cream:    { name: 'Cream',     hex: '#F5F0E8', key: 'cream' },
     4|     4|  fawn:     { name: 'Fawn',      hex: '#C4A882', key: 'fawn' },
     5|     5|  charcoal: { name: 'Charcoal',  hex: '#4A4A4A', key: 'charcoal' }
     6|     6|};
     7|     7|
     8|     8|const PRODUCTS = [
     9|     9|  {
    10|    10|    id: 1,
    11|    11|    name: 'Cashmere V-Neck Sweater',
    12|    12|    price: 380,
    13|    13|    category: 'sweaters',
    14|    14|    slug: 'vneck-sweater',
    15|    15|    description: 'The quintessential V-neck, draping softly at the collarbone. Woven from the finest Himalayan fibres for effortless elegance.',
    16|    16|    colors: [COLORS.cream, COLORS.fawn, COLORS.charcoal],
    17|    17|    imagesByColor: {
    18|    18|      cream:    '/img/products/shop-vneck-new.jpg',
    19|    19|      fawn:     '/img/products/shop-vneck-fawn.jpg',
    20|    20|      charcoal: '/img/products/shop-vneck-charcoal.jpg'
    21|    21|    },
    22|    22|    image: '/img/products/shop-vneck-new.jpg',
    23|    23|    material: '100% Himalayan Cashmere',
    24|    24|    weight: '230gsm',
    25|    25|    origin: 'Handcrafted in the Kathmandu Valley, Nepal',
    26|    26|    makerName: 'Asha',
    27|    27|    makerQuote: 'Every loop I knit carries the warmth of my grandmother\'s hands guiding mine beneath the Himalayan sun.'
    28|    28|  },
    29|    29|  {
    30|    30|    id: 2,
    31|    31|    name: 'Cashmere Crewneck Sweater',
    32|    32|    price: 380,
    33|    33|    category: 'sweaters',
    34|    34|    slug: 'crewneck-sweater',
    35|    35|    description: 'Pure comfort in its most honest form. A crewneck that hugs gently and endures seasons, dyed with earth\'s own pigments.',
    36|    36|    colors: [COLORS.cream, COLORS.fawn, COLORS.charcoal],
    37|    37|    imagesByColor: {
    38|    38|      cream:    '/img/products/shop-crewneck-cream.jpg',
    39|    39|      fawn:     '/img/products/shop-crewneck-new.jpg',
    40|    40|      charcoal: '/img/products/shop-crewneck-charcoal.jpg'
    41|    41|    },
    42|    42|    image: '/img/products/shop-crewneck-new.jpg',
    43|    43|    material: '100% Himalayan Cashmere',
    44|    44|    weight: '230gsm',
    45|    45|    origin: 'Handcrafted in the Kathmandu Valley, Nepal',
    46|    46|    makerName: 'Asha',
    47|    47|    makerQuote: 'To knit cashmere is to listen — the fibres tell you when the tension is true, when the soul is in the stitch.'
    48|    48|  },
    49|    49|  {
    50|    50|    id: 3,
    51|    51|    name: 'Cashmere Turtleneck Sweater',
    52|    52|    price: 420,
    53|    53|    category: 'sweaters',
    54|    54|    slug: 'turtleneck-sweater',
    55|    55|    description: 'A cocoon of warmth. The double-layer turtleneck frames the face like a sculpture, soft as a mountain breeze.',
    56|    56|    colors: [COLORS.cream, COLORS.fawn, COLORS.charcoal],
    57|    57|    imagesByColor: {
    58|    58|      cream:    '/img/products/shop-turtleneck-cream.jpg',
    59|    59|      fawn:     '/img/products/shop-turtleneck-fawn.jpg',
    60|    60|      charcoal: '/img/products/shop-turtleneck-new.jpg'
    61|    61|    },
    62|    62|    image: '/img/products/shop-turtleneck-new.jpg',
    63|    63|    material: '100% Himalayan Cashmere',
    64|    64|    weight: '230gsm',
    65|    65|    origin: 'Handcrafted in the Kathmandu Valley, Nepal',
    66|    66|    makerName: 'Asha',
    67|    67|    makerQuote: 'A turtleneck demands patience — each row must rise evenly, like the terraced hills of my homeland.'
    68|    68|  },
    69|    69|  {
    70|    70|    id: 4,
    71|    71|    name: 'Cashmere Scarf',
    72|    72|    price: 120,
    73|    73|    category: 'accessories',
    74|    74|    slug: 'classic-scarf',
    75|    75|    description: 'Draped softly around the shoulders or tied with intention. An heirloom-weight scarf touched by Himalayan hands.',
    76|    76|    colors: [COLORS.cream, COLORS.fawn, COLORS.charcoal],
    77|    77|    imagesByColor: {
    78|    78|      cream:    '/img/products/shop-scarf-new.jpg',
    79|    79|      fawn:     '/img/products/shop-scarf-fawn.jpg',
    80|    80|      charcoal: '/img/products/shop-scarf-charcoal.jpg'
    81|    81|    },
    82|    82|    image: '/img/products/shop-scarf-new.jpg',
    83|    83|    material: '100% Himalayan Cashmere',
    84|    84|    weight: '180gsm',
    85|    85|    origin: 'Handcrafted in the Kathmandu Valley, Nepal',
    86|    86|    makerName: 'Durga',
    87|    87|    makerQuote: 'The loom sings when the yarn is happy. A scarf woven with joy wraps its wearer in that same song.'
    88|    88|  },
    89|    89|  {
    90|    90|    id: 5,
    91|    91|    name: 'Cashmere Gloves',
    92|    92|    price: 85,
    93|    93|    category: 'accessories',
    94|    94|    slug: 'cashmere-gloves',
    95|    95|    description: 'Touch the world softly. Touchscreen-ready fingertips meet Himalayan warmth in a glove that honours craft and connection.',
    96|    96|    colors: [COLORS.cream, COLORS.fawn, COLORS.charcoal],
    97|    97|    imagesByColor: {
    98|    98|      cream:    '/img/products/shop-gloves-cream.jpg',
    99|    99|      fawn:     '/img/products/shop-gloves.jpg',
   100|   100|      charcoal: '/img/products/shop-gloves-charcoal.jpg'
   101|   101|    },
   102|   102|    image: '/img/products/shop-gloves.jpg',
   103|   103|    material: '100% Himalayan Cashmere',
   104|   104|    weight: '160gsm',
   105|   105|    origin: 'Handcrafted in the Kathmandu Valley, Nepal',
   106|   106|    makerName: 'Maya',
   107|   107|    makerQuote: 'My fingers dance across the needles each morning, weaving warmth for hands that may be far from home.'
   108|   108|  },
   109|   109|  {
   110|   110|    id: 6,
   111|   111|    name: 'Cashmere Socks',
   112|   112|    price: 75,
   113|   113|    category: 'accessories',
   114|   114|    slug: 'cashmere-socks',
   115|   115|    description: 'Step into a secret luxury. Pure cashmere against the skin from heel to toe, hand-finished with care in every thread.',
   116|   116|    colors: [COLORS.cream, COLORS.fawn, COLORS.charcoal],
   117|   117|    imagesByColor: {
   118|   118|      cream:    '/img/products/shop-socks-cream.jpg',
   119|   119|      fawn:     '/img/products/shop-socks-fawn.jpg',
   120|   120|      charcoal: '/img/products/shop-socks.jpg'
   121|   121|    },
   122|   122|    image: '/img/products/shop-socks.jpg',
   123|   123|    material: '100% Himalayan Cashmere',
   124|   124|    weight: '150gsm',
   125|   125|    origin: 'Handcrafted in the Kathmandu Valley, Nepal',
   126|   126|    makerName: 'Durga',
   127|   127|    makerQuote: 'Even the smallest garment deserves the greatest care. A sock is a beginning, not an end.'
   128|   128|  }
   129|   129|];
   130|   130|
   131|   131|function renderShopGrid(filter) {
   132|   132|  const filtered = filter === 'all'
   133|   133|    ? PRODUCTS
   134|   134|    : PRODUCTS.filter(p => p.category === filter);
   135|   135|
   136|   136|  return filtered.map(product => {
   137|   137|    const defaultImg = product.image;
   138|   138|    const swatches = product.colors.map(c => {
   139|   139|      const imgSrc = product.imagesByColor[c.key] || defaultImg;
   140|   140|      return `<div class="color-swatch" style="background-color:${c.hex}" title="${c.name}" 
   141|   141|                    data-color="${c.key}" data-image="${imgSrc}" data-product="${product.slug}"
   142|   142|                    onclick="switchGridColor(this, '${c.key}', '${imgSrc}', '${product.slug}')"></div>`;
   143|   143|    }).join('');
   144|   144|
   145|   145|    return `
   146|   146|      <div class="product-card" data-category="${product.category}" data-slug="${product.slug}">
   147|   147|        <a href="/product?p=${product.slug}" class="product-card-image-link">
   148|   148|          <div class="product-card-image">
   149|   149|            <img id="grid-img-${product.slug}" src="${product.image}" alt="${product.name}" loading="lazy">
   150|   150|          </div>
   151|   151|        </a>
   152|   152|        <div class="product-card-body">
   153|   153|          <a href="/product?p=${product.slug}" class="product-card-name-link">
   154|   154|            <h3 class="product-card-title">${product.name}</h3>
   155|   155|          </a>
   156|   156|          <div class="product-card-price">€${product.price}</div>
   157|   157|          <div class="product-card-colors">${swatches}</div>
   158|   158|          <button class="snipcart-add-item btn btn-primary"
   159|   159|            data-item-id="${product.slug}"
   160|   160|            data-item-name="${product.name}"
   161|   161|            data-item-price="${product.price}"
   162|   162|            data-item-url="/product?p=${product.slug}"
   163|   163|            data-item-image="${product.image}"
   164|   164|            data-item-description="${product.description}">
   165|   165|            Add to Bag
   166|   166|          </button>
   167|   167|        </div>
   168|   168|      </div>
   169|   169|    `;
   170|   170|  }).join('');
   171|   171|}
   172|   172|
   173|   173|function renderProductPage(slug) {
   174|   174|  const product = PRODUCTS.find(p => p.slug === slug);
   175|   175|  if (!product) {
   176|   176|    return '<div class="product-not-found"><h2>Product not found</h2><p><a href="/shop">Return to Shop</a></p></div>';
   177|   177|  }
   178|   178|
   179|   179|  // Color swatches with click handler to switch image
   180|   180|  const swatches = product.colors.map((c, i) => {
   181|   181|    const imgSrc = product.imagesByColor[c.key] || product.image;
   182|   182|    return `<div class="color-swatch-large${i === 0 ? ' is-selected' : ''}" 
   183|   183|                 style="background-color:${c.hex}" 
   184|   184|                 title="${c.name}" 
   185|   185|                 data-color="${c.key}"
   186|   186|                 data-image="${imgSrc}"
   187|   187|                 onclick="switchProductColor(this, '${c.key}', '${imgSrc}')"></div>`;
   188|   188|  }).join('');
   189|   189|
   190|   190|  const sizes = ['S', 'M', 'L', 'XL'].map((s, i) =>
   191|   191|    `<div class="size-option${i === 0 ? ' is-selected' : ''}" data-size="${s}">${s}</div>`
   192|   192|  ).join('');
   193|   193|
   194|   194|  return `
   195|   195|    <div class="product-detail">
   196|   196|      <div class="product-detail-gallery">
   197|   197|        <div class="gallery-main-wrap">
   198|   198|          <img id="gallery-main" src="${product.image}" alt="${product.name}" class="gallery-main">
   199|   199|        </div>
   200|   200|      </div>
   201|   201|      <div class="product-detail-info">
   202|   202|        <h1 class="product-detail-name">${product.name}</h1>
   203|   203|        <div class="product-detail-price">€${product.price}</div>
   204|   204|        <p class="product-detail-description">${product.description}</p>
   205|   205|
   206|   206|        <div class="product-detail-section">
   207|   207|          <label>Color — <span id="selected-color-name">${product.colors[0].name}</span></label>
   208|   208|          <div class="product-color-options">${swatches}</div>
   209|   209|        </div>
   210|   210|
   211|   211|        <div class="product-detail-section">
   212|   212|          <label>Size</label>
   213|   213|          <div class="product-size-options">${sizes}</div>
   214|   214|        </div>
   215|   215|
   216|   216|        <div class="product-specs">
   217|   217|          <div class="spec-row"><span class="spec-label">Material</span><span class="spec-value">${product.material}</span></div>
   218|   218|          <div class="spec-row"><span class="spec-label">Weight</span><span class="spec-value">${product.weight}</span></div>
   219|   219|          <div class="spec-row"><span class="spec-label">Origin</span><span class="spec-value">${product.origin}</span></div>
   220|   220|        </div>
   221|   221|
   222|   222|        <button class="snipcart-add-item product-add-to-bag btn btn-primary"
   223|   223|          data-item-id="${product.slug}"
   224|   224|          data-item-name="${product.name}"
   225|   225|          data-item-price="${product.price}"
   226|   226|          data-item-url="/product?p=${product.slug}"
   227|   227|          data-item-image="${product.image}"
   228|   228|          data-item-description="${product.description}">
   229|   229|          Add to Bag — €${product.price}
   230|   230|        </button>
   231|   231|
   232|   232|        <div class="meet-the-maker">
   233|   233|          <h4 class="maker-name">Meet ${product.makerName}</h4>
   234|   234|          <p class="maker-quote">"${product.makerQuote}"</p>
   235|   235|        </div>
   236|   236|      </div>
   237|   237|    </div>
   238|   238|  `;
   239|   239|}
   240|   240|
   241|   241|// Color swatch click → switch product image
   242|   242|function switchProductColor(swatchEl, colorKey, imageSrc) {
   243|   243|  // Update main image
   244|   244|  const mainImg = document.getElementById('gallery-main');
   245|   245|  if (mainImg) {
   246|   246|    mainImg.src = imageSrc;
   247|   247|    mainImg.alt = mainImg.alt.replace(/Cream|Fawn|Charcoal/g, 
   248|   248|      colorKey.charAt(0).toUpperCase() + colorKey.slice(1));
   249|   249|  }
   250|   250|
   251|   251|  // Update active state on swatches
   252|   252|  document.querySelectorAll('.color-swatch-large').forEach(s => s.classList.remove('is-selected'));
   253|   253|  swatchEl.classList.add('is-selected');
   254|   254|
   255|   255|  // Update color name label
   256|   256|  const label = document.getElementById('selected-color-name');
   257|   257|  if (label) {
   258|   258|    label.textContent = colorKey.charAt(0).toUpperCase() + colorKey.slice(1);
   259|   259|  }
   260|   260|
   261|   261|  // Update Snipcart image to match selected color
   262|   262|  const addBtn = document.querySelector('.snipcart-add-item');
   263|   263|  if (addBtn) {
   264|   264|    addBtn.setAttribute('data-item-image', imageSrc);
   265|   265|  }
   266|   266|}
   267|   267|window.switchProductColor = switchProductColor;
   268|   268|
   269|   269|// Shop grid color swatch → switch product card image
   270|   270|function switchGridColor(swatchEl, colorKey, imageSrc, productSlug) {
   271|   271|  // Update the card image
   272|   272|  const cardImg = document.getElementById('grid-img-' + productSlug);
   273|   273|  if (cardImg) {
   274|   274|    cardImg.src = imageSrc;
   275|   275|  }
   276|   276|
   277|   277|  // Update active state on swatches within this card
   278|   278|  const card = swatchEl.closest('.product-card');
   279|   279|  if (card) {
   280|   280|    card.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('is-selected'));
   281|   281|  }
   282|   282|  swatchEl.classList.add('is-selected');
   283|   283|
   284|   284|  // Update Snipcart add-to-bag button image
   285|   285|  if (card) {
   286|   286|    const addBtn = card.querySelector('.snipcart-add-item');
   287|   287|    if (addBtn) {
   288|   288|      addBtn.setAttribute('data-item-image', imageSrc);
   289|   289|    }
   290|   290|  }
   291|   291|}
   292|   292|window.switchGridColor = switchGridColor;
   293|   293|
   294|   294|window.PRODUCTS = PRODUCTS;
   295|   295|window.renderShopGrid = renderShopGrid;
   296|   296|window.renderProductPage = renderProductPage;
   297|   297|