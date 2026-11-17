#!/usr/bin/env python3
"""Lav en diskret GIF af Mettes *originale* Læseblik-portræt.

Der genereres ikke et nyt ansigt, hår, tøj eller nye ansigtsudtryk:
hver eneste frame er det originale portræt flyttet og drejet ganske let.
Det sikrer genkendelighed frem for en fri AI-fortolkning.
"""
from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageOps
from math import pi, sin

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/mette-portraet.webp"
OUTPUT = ROOT / "assets/mette-original-animeret.gif"
OUTPUT_WEBP = ROOT / "assets/mette-original-animeret.webp"

if not SOURCE.is_file():
    raise FileNotFoundError(f"Kan ikke finde originalportrættet: {SOURCE}")

image = Image.open(SOURCE).convert("RGBA")
assert image.width >= 500 and image.height >= 500, "Kun originalportrættet i fuld størrelse må bruges"

# Bevar hele håret og ansigtet; undgå en kunstig, indzoomet beskæring.
portrait = ImageOps.contain(image, (162, 174), Image.Resampling.LANCZOS)
W, H = 194, 196
FRAMES = 20
duration_ms = 190
frames_rgba = []
for i in range(FRAMES):
    phase = 2 * pi * i / FRAMES
    tilt = 1.6 * sin(phase)
    up = round(3 * (0.5 - 0.5 * __import__("math").cos(phase)))
    side = round(2 * sin(phase))
    transformed = portrait.rotate(
        tilt, resample=Image.Resampling.BICUBIC, expand=True
    )
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    x = (W - transformed.width) // 2 + side
    y = H - transformed.height - 5 - up
    canvas.alpha_composite(transformed, (x, y))
    frames_rgba.append(canvas)

# Animeret WebP bevarer den originale fotos farver og bløde, gennemsigtige kanter.
frames_rgba[0].save(
    OUTPUT_WEBP, format="WEBP", save_all=True,
    append_images=frames_rgba[1:], duration=duration_ms,
    loop=0, quality=80, method=6, lossless=False
)

# GIF til brugeren: palet med en fast reserveret transparent farve (indeks 255).
gif_frames = []
for rgba in frames_rgba:
    alpha = rgba.getchannel("A")
    pal = rgba.convert("RGB").quantize(colors=255, method=Image.Quantize.MEDIANCUT)
    colors = pal.getpalette()[:255 * 3]
    colors.extend([0, 0, 0])
    pal.putpalette(colors)
    # GIF er kun 1-bit transparent; bibehold alle synlige portrætpixels.
    transparent = alpha.point(lambda a: 255 if a < 85 else 0)
    pal.paste(255, (0, 0, W, H), transparent)
    pal.info["transparency"] = 255
    gif_frames.append(pal)
gif_frames[0].save(
    OUTPUT, format="GIF", save_all=True,
    append_images=gif_frames[1:], duration=duration_ms,
    loop=0, disposal=2, transparency=255, optimize=False
)

check = Image.open(OUTPUT)
assert getattr(check, "n_frames", 1) >= 10, "GIF skal have flere billedtrin"
check_webp = Image.open(OUTPUT_WEBP)
assert getattr(check_webp, "n_frames", 1) >= 10
print(f"Mettes originalportræt animeret: {check.n_frames} GIF-billeder / "
      f"{OUTPUT.stat().st_size // 1024} kB; "
      f"{check_webp.n_frames} WebP-billeder / {OUTPUT_WEBP.stat().st_size // 1024} kB.")
