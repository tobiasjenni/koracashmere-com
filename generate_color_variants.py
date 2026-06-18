#!/usr/bin/env python3
"""Generate missing color variants for each product — 12 photos total"""
import replicate
import os
import time

OUT_DIR = "/opt/koracashmere/img/products"

COLORS = {
    'cream':    {'name': 'Cream', 'desc': 'natural undyed cream white cashmere'},
    'fawn':     {'name': 'Fawn', 'desc': 'natural light camel tan brown cashmere'},
    'charcoal': {'name': 'Charcoal', 'desc': 'natural dark grey cashmere'},
}

ITEMS = {
    'vneck':      'fine-knit V-neck cashmere sweater',
    'crewneck':   'classic crewneck cashmere sweater',
    'turtleneck': 'chunky turtleneck cashmere sweater',
    'scarf':      'long cashmere scarf',
    'gloves':     'fine-knit cashmere gloves',
    'socks':      'ribbed cashmere bed socks',
}

# Each product already has one color; generate the other 2
NEEDED = [
    ('vneck', 'fawn'),
    ('vneck', 'charcoal'),
    ('crewneck', 'cream'),
    ('crewneck', 'charcoal'),
    ('turtleneck', 'cream'),
    ('turtleneck', 'fawn'),
    ('scarf', 'fawn'),
    ('scarf', 'charcoal'),
    ('gloves', 'cream'),
    ('gloves', 'charcoal'),
    ('socks', 'cream'),
    ('socks', 'fawn'),
]

for i, (slug, color) in enumerate(NEEDED):
    c = COLORS[color]
    item = ITEMS[slug]
    out_path = os.path.join(OUT_DIR, f"shop-{slug}-{color}.jpg")
    
    # Skip if already exists
    if os.path.exists(out_path):
        print(f"[{i+1}/{len(NEEDED)}] SKIP {slug} {color} — already exists", flush=True)
        continue
    
    prompt = (
        f"Professional luxury e-commerce product photograph. "
        f"A {item} in {c['desc']}, "
        f"draped elegantly on raw natural linen fabric, "
        f"soft diffused window light from left, "
        f"subtle shadows, shallow depth of field, "
        f"35mm film photography, shot on Kodak Portra 400, "
        f"warm natural tones, editorial fashion quality. "
        f"No human, no face, no hands, no model, no mannequin. "
        f"No text, no logos, no watermarks. "
        f"Clean minimalist composition, fills 85% of frame."
    )
    
    print(f"[{i+1}/{len(NEEDED)}] {slug} → {color} ({c['name']})...", flush=True)
    
    try:
        output = replicate.run(
            "black-forest-labs/flux-1.1-pro",
            input={
                "prompt": prompt,
                "aspect_ratio": "4:5",
                "output_format": "jpg",
                "output_quality": 95,
            }
        )
        img_data = output.read()
        with open(out_path, 'wb') as f:
            f.write(img_data)
        print(f"  ✅ {len(img_data)//1024}KB → {out_path}", flush=True)
    except Exception as e:
        print(f"  ❌ {e}", flush=True)
    
    time.sleep(8)

print("\n=== DONE ===")
