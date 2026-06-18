#!/usr/bin/env python3
"""Generate 6 natural-color product photos via Replicate Flux Pro"""
import replicate
import requests
import os
import time
import sys

OUT_DIR = "/opt/koracashmere/img/products"
os.makedirs(OUT_DIR, exist_ok=True)

# 3 Natural cashmere colors
COLORS = {
    'cream':    {'name': 'Cream', 'hex': '#F5F0E8', 'desc': 'natural undyed cream white cashmere'},
    'fawn':     {'name': 'Fawn', 'hex': '#C4A882', 'desc': 'natural light camel tan brown cashmere'},
    'charcoal': {'name': 'Charcoal', 'hex': '#4A4A4A', 'desc': 'natural dark grey cashmere'},
}

PRODUCTS = [
    {'slug': 'vneck',     'name': 'Cashmere V-Neck Sweater',    'color': 'cream',    'item': 'fine-knit V-neck cashmere sweater'},
    {'slug': 'crewneck',  'name': 'Cashmere Crewneck Sweater',  'color': 'fawn',     'item': 'classic crewneck cashmere sweater'},
    {'slug': 'turtleneck','name': 'Cashmere Turtleneck Sweater', 'color': 'charcoal', 'item': 'chunky turtleneck cashmere sweater'},
    {'slug': 'scarf',     'name': 'Cashmere Scarf',             'color': 'cream',    'item': 'long cashmere scarf'},
    {'slug': 'gloves',    'name': 'Cashmere Gloves',            'color': 'fawn',     'item': 'fine-knit cashmere gloves'},
    {'slug': 'socks',     'name': 'Cashmere Socks',             'color': 'charcoal', 'item': 'ribbed cashmere bed socks'},
]

for i, product in enumerate(PRODUCTS):
    c = COLORS[product['color']]
    out_path = os.path.join(OUT_DIR, f"shop-{product['slug']}.jpg")
    
    prompt = (
        f"Professional luxury e-commerce product photograph. "
        f"A {product['item']} in {c['desc']}, "
        f"draped elegantly on raw natural linen fabric, "
        f"soft diffused window light from left, "
        f"subtle shadows, shallow depth of field, "
        f"35mm film photography, shot on Kodak Portra 400, "
        f"warm natural tones, editorial fashion quality. "
        f"No human, no face, no hands, no model, no mannequin. "
        f"No text, no logos, no watermarks. "
        f"Clean minimalist composition, fills 85% of frame."
    )
    
    print(f"[{i+1}/{len(PRODUCTS)}] {product['name']} ({c['name']})...", flush=True)
    
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
        
        # output is a FileOutput object
        if hasattr(output, 'read'):
            img_data = output.read()
            with open(out_path, 'wb') as f:
                f.write(img_data)
            size_kb = len(img_data) // 1024
            print(f"  ✅ Saved {size_kb}KB → {out_path}", flush=True)
        else:
            # Could be a URL string
            print(f"  ⚠️ Unexpected output type: {type(output)}", flush=True)
            
    except Exception as e:
        print(f"  ❌ Failed: {e}", flush=True)
    
    # Rate limit: wait 8 seconds between generations
    if i < len(PRODUCTS) - 1:
        time.sleep(8)

print("\n=== DONE ===")
print("Files generated:", flush=True)
for p in PRODUCTS:
    path = os.path.join(OUT_DIR, f"shop-{p['slug']}.jpg")
    exists = os.path.exists(path)
    size = os.path.getsize(path) // 1024 if exists else 0
    print(f"  {p['slug']:15s} {'✅' if exists else '❌'} {size}KB")
