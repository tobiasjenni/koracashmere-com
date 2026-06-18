#!/usr/bin/env python3
"""Generate 6 cream product images matching fawn/charcoal style."""
import replicate, os, time, sys

# Source API key
api_key = None
with open('/opt/data/.env') as f:
    for line in f:
        if line.startswith('REPLICATE_API_TOKEN='):
            api_key = line.split('=', 1)[1].strip().strip('"').strip("'")
            break
os.environ['REPLICATE_API_TOKEN'] = api_key

out_dir = '/opt/koracashmere/img/products'
os.makedirs(out_dir, exist_ok=True)

base_prompt_fmt = """Professional e-commerce product photograph. A cream cashmere {garment}, 
draped artfully on a warm beige raw linen fabric surface. The fabric background is intentionally bunched 
with soft rolling folds creating hills and valleys of shadow. 
Warm golden sunlight streams from top-left at 45 degrees, casting defined but warm-tinted shadows.
The garment is positioned diagonally across the frame with gentle pushed-in folds 
that reveal the fine knit texture and give the piece volume and shape. 
Hybrid draped flat lay, casually elegant, lived-in quality. Very warm white balance, 
golden hour feel, 3500K color temperature. The cream cashmere contrasts subtly 
against the slightly darker warm beige fabric background.
High-end fashion catalog style. Product fills 80% of frame. 
No text, no logos, no watermarks, no human, no face."""

products = [
    {
        "filename": "shop-vneck-new.jpg",
        "garment": "V-neck sweater with a soft draping neckline, visible ribbed collar, cuffs and hem"
    },
    {
        "filename": "shop-crewneck-new.jpg",
        "garment": "crewneck sweater with a clean round neckline, visible ribbed collar, cuffs and hem"
    },
    {
        "filename": "shop-turtleneck-new.jpg",
        "garment": "turtleneck sweater with a tall folded double-layer turtleneck collar, ribbed cuffs and hem"
    },
    {
        "filename": "shop-scarf-new.jpg",
        "garment": "long rectangular scarf with raw fringed edges at both ends, softly rippled along its length"
    },
    {
        "filename": "shop-gloves-new.jpg",
        "garment": "pair of elegant long-fingered gloves, one flat and one gently curled, soft ribbed cuffs"
    },
    {
        "filename": "shop-socks-new.jpg",
        "garment": "pair of crew-length socks, one flat and one softly folded, fine ribbed texture at cuffs"
    },
]

for i, p in enumerate(products):
    prompt = base_prompt_fmt.format(garment=p['garment'])
    out_path = os.path.join(out_dir, p['filename'])
    
    print(f"[{i+1}/6] Generating {p['filename']}...", end=" ", flush=True)
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
        data = output.read()
        with open(out_path, 'wb') as f:
            f.write(data)
        print(f"OK ({len(data)//1024}KB)")
    except Exception as e:
        print(f"FAILED: {e}")
    
    if i < len(products) - 1:
        time.sleep(8)

print("\nDone! All 6 cream product images generated.")
