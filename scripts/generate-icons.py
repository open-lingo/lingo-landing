#!/usr/bin/env python3
"""
Generate the favicon / PWA / Apple-touch icon set from the brand mark.

Source of truth is `public/icon.ico`, which is the same asset the app header
masks. Its ink is pure white on transparent — it was drawn to be a CSS mask,
so used directly as a favicon it is invisible on a light tab strip. Every icon
here therefore composites the mark onto the brand brick red, which also gives
it contrast on both light and dark browser chrome.

The largest bitmap inside the .ico is 128px, so 180/192/512 involve an upscale.
The mark is a flat two-colour silhouette, which upscales far better than a
photo would, but if a vector ever turns up it should replace this source.

Run: python3 scripts/generate-icons.py
"""
from PIL import Image, ImageDraw
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

BRICK = (156, 44, 44, 255)  # --color-accent, light theme
SOURCE_SIZE = 128


def load_mark() -> Image.Image:
    """The mark as an RGBA image, white ink on transparent."""
    im = Image.open(PUBLIC / "icon.ico")
    im.size = (SOURCE_SIZE, SOURCE_SIZE)
    im.load()
    return im.convert("RGBA")


def rounded_mask(size: int, radius_ratio: float) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, size - 1, size - 1), radius=int(size * radius_ratio), fill=255
    )
    return mask


def tile(size: int, inset_ratio: float, radius_ratio: float) -> Image.Image:
    """Brand-coloured tile with the mark centred inside it."""
    mark = load_mark()

    # Trim to the mark's actual ink so the inset is measured from the glyph,
    # not from whatever padding the .ico happens to carry.
    bbox = mark.getbbox()
    if bbox:
        mark = mark.crop(bbox)

    inner = max(1, int(size * (1 - 2 * inset_ratio)))
    w, h = mark.size
    scale = inner / max(w, h)
    mark = mark.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)

    canvas = Image.new("RGBA", (size, size), BRICK)
    canvas.alpha_composite(mark, ((size - mark.width) // 2, (size - mark.height) // 2))

    if radius_ratio > 0:
        canvas.putalpha(rounded_mask(size, radius_ratio))
    return canvas


def main() -> None:
    # favicon.ico — 16/32/48 in one file. No rounding: at 16px a radius is
    # indistinguishable from noise and eats ink.
    base = tile(64, inset_ratio=0.10, radius_ratio=0)
    base.save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    # Modern browsers prefer a PNG when offered one.
    tile(32, 0.10, 0).save(PUBLIC / "favicon-32x32.png")
    tile(16, 0.06, 0).save(PUBLIC / "favicon-16x16.png")

    # iOS: square, fully opaque — the OS applies its own corner radius, and a
    # transparent icon gets composited onto black.
    tile(180, 0.16, 0).convert("RGB").save(PUBLIC / "apple-touch-icon.png")

    # PWA / Android.
    tile(192, 0.14, 0.18).save(PUBLIC / "icon-192.png")
    tile(512, 0.14, 0.18).save(PUBLIC / "icon-512.png")

    # Maskable: Android crops to arbitrary shapes, so keep the mark inside the
    # 80% safe zone and let the colour bleed to the edges.
    tile(512, 0.22, 0).save(PUBLIC / "icon-maskable-512.png")

    for f in sorted(PUBLIC.glob("*.png")) + [PUBLIC / "favicon.ico"]:
        print(f"  {f.name:<28} {f.stat().st_size:>7,}B")


if __name__ == "__main__":
    main()
