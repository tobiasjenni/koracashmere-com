// KORA Cashmere — Product Catalog
const PRODUCTS = [
  {
    id: 'vneck-sweater',
    name: 'Cashmere V-Neck Sweater',
    category: 'Sweaters',
    price: 380.00,
    description: 'The essential. A V-neck cashmere pullover in natural, undyed oat. Relaxed fit — worn alone over skin or layered over a shirt. This is the piece you reach for every morning, every season, every year.',
    details: ['100% Himalayan Cashmere', 'V-neck, relaxed fit', 'Naturally undyed oat', 'Ribbed cuffs & hem', 'Hand-spun in Kathmandu', '350g'],
    slug: 'vneck-sweater',
    img: 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=600&q=85&fit=crop'
  },
  {
    id: 'crewneck-sweater',
    name: 'Cashmere Crewneck Sweater',
    category: 'Sweaters',
    price: 380.00,
    description: 'The classic crewneck. Clean lines. No distractions. All the warmth of Himalayan cashmere in a timeless silhouette. Mineral-dyed charcoal.',
    details: ['100% Himalayan Cashmere', 'Crew neck, tailored fit', 'Mineral-dyed charcoal', 'Ribbed cuffs & hem', 'Hand-spun in Kathmandu', '350g'],
    slug: 'crewneck-sweater',
    img: 'https://plus.unsplash.com/premium_photo-1671460921793-e5e99d795819?w=600&q=85&fit=crop'
  },
  {
    id: 'turtleneck-sweater',
    name: 'Cashmere Turtleneck Sweater',
    category: 'Sweaters',
    price: 420.00,
    description: 'Full turtleneck. The warmest piece in the collection. Double-layer knit at the neck — soft enough for bare skin, structured enough to hold its shape all day. Natural cream, undyed.',
    details: ['100% Himalayan Cashmere', 'Turtleneck, relaxed fit', 'Naturally undyed cream', 'Double-layer neck knit', 'Hand-spun in Kathmandu', '400g'],
    slug: 'turtleneck-sweater',
    img: 'https://images.unsplash.com/photo-1601379327928-bedfaf9da2d0?w=600&q=85&fit=crop'
  },
  {
    id: 'classic-scarf',
    name: 'Cashmere Scarf',
    category: 'Accessories',
    price: 120.00,
    description: 'Our signature piece. Pure Himalayan cashmere in its natural, undyed state. Hand-rolled edges. 180cm × 30cm.',
    details: ['100% Himalayan Cashmere', 'Hand-spun & hand-woven', '180cm × 30cm', 'Undyed natural fibre', 'Hand-rolled edges', '200g'],
    slug: 'classic-scarf',
    img: 'https://plus.unsplash.com/premium_photo-1695603438043-1b9ab6ebe1a8?w=600&q=85&fit=crop'
  },
  {
    id: 'cashmere-gloves',
    name: 'Cashmere Gloves',
    category: 'Accessories',
    price: 85.00,
    description: 'Full cashmere gloves with touchscreen-compatible fingertips. Indigo-dyed with Himalayan mineral pigments.',
    details: ['100% Himalayan Cashmere', 'Touchscreen fingertips', 'Indigo mineral-dyed', 'Ribbed cuff', 'One size', '70g'],
    slug: 'cashmere-gloves',
    img: 'https://images.unsplash.com/photo-1611690889004-c009a7e03712?w=600&q=85&fit=crop'
  },
  {
    id: 'cashmere-socks',
    name: 'Cashmere Socks',
    category: 'Accessories',
    price: 75.00,
    description: 'Three pairs: Natural, Indigo, Charcoal. The most requested item from our artisan families for themselves.',
    details: ['100% Himalayan Cashmere', '3 pairs: Natural, Indigo, Charcoal', 'Ribbed ankle', 'One size (EU 39–44)', '90g total'],
    slug: 'cashmere-socks',
    img: 'https://images.unsplash.com/photo-1615486364462-ef6363adbc18?w=600&q=85&fit=crop'
  }
];

function renderProductCard(product, linkToProduct) {
  const link = linkToProduct ? `href="/product?p=${product.slug}"` : '';
  const tag = linkToProduct ? 'a' : 'div';
  return `
    <${tag} class="product-card" ${link} data-category="${product.category.toLowerCase()}">
      <div class="product-card-image">
        <img src="${product.img}" alt="${product.name}" loading="lazy"
             onerror="var p=this.nextElementSibling;this.style.display='none';if(p)p.style.display='flex'">
        <div class="placeholder-img">${product.category}</div>
      </div>
      <div class="product-card-category">${product.category}</div>
      <div class="product-card-name">${product.name}</div>
      <div class="product-card-price">€${product.price.toFixed(0)}</div>
    </${tag}>
  `;
}
