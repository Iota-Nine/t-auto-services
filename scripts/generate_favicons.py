"""Generate PNG/ICO favicons for Google Search (48px+ square)."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"

BG = (10, 10, 10)
YELLOW = (245, 197, 24)


def _font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for name in ("arialbd.ttf", "Arial Bold.ttf", "arial.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def render(size: int) -> Image.Image:
    img = Image.new("RGB", (size, size), BG)
    draw = ImageDraw.Draw(img)
    r = max(2, round(size * 6 / 32))
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=r, fill=BG)

    t_size = max(12, round(size * 20 / 32))
    font = _font(t_size)
    t_x = round(size * 10 / 32) - round(size * 2 / 32)
    t_y = round(size * 4 / 32)
    draw.text((t_x, t_y), "T", fill=YELLOW, font=font)

    bar_x = round(size * 18 / 32)
    bar_y = round(size * 18 / 32)
    bar_w = round(size * 12 / 32)
    bar_h = max(2, round(size * 6 / 32))
    draw.rectangle((bar_x, bar_y, bar_x + bar_w, bar_y + bar_h), fill=YELLOW)
    return img


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)
    sizes = {48: "favicon-48.png", 192: "apple-touch-icon.png"}
    icons: list[Image.Image] = []
    for px, name in sizes.items():
        im = render(px)
        im.save(ASSETS / name, format="PNG", optimize=True)
        icons.append(im)
        print(f"Wrote {ASSETS / name} ({px}x{px})")

    ico_path = ROOT / "favicon.ico"
    render(48).save(ico_path, format="ICO")
    print(f"Wrote {ico_path}")


if __name__ == "__main__":
    main()
