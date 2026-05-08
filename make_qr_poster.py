from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
QR_PATH = ROOT / "assets" / "website-qr.png"
POSTER_PATH = ROOT / "assets" / "website-qr-poster.png"


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/Library/Fonts/Arial Unicode.ttf",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size=size, index=1 if bold else 0)
    return ImageFont.load_default()


def center_text(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, font: ImageFont.ImageFont, fill: str) -> None:
    x, y = xy
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    draw.text((x - text_width / 2, y), text, font=font, fill=fill)


def main() -> None:
    qr = Image.open(QR_PATH).convert("RGB")
    qr = qr.resize((620, 620), Image.Resampling.NEAREST)

    canvas = Image.new("RGB", (1080, 1440), "#f4f7f6")
    draw = ImageDraw.Draw(canvas)

    draw.rounded_rectangle((70, 70, 1010, 1370), radius=28, fill="#ffffff", outline="#d8e1de", width=3)
    draw.rounded_rectangle((122, 122, 958, 470), radius=24, fill="#102724")
    draw.rounded_rectangle((152, 152, 232, 232), radius=18, fill="#0f766e")

    mark_font = load_font(48, bold=True)
    title_font = load_font(68, bold=True)
    subtitle_font = load_font(31)
    body_font = load_font(27)
    small_font = load_font(23)

    center_text(draw, (192, 164), "稳", mark_font, "#ffffff")
    draw.text((262, 155), "稳退规划", font=title_font, fill="#f8fffd")
    draw.text((264, 252), "养老金融产品推荐系统", font=subtitle_font, fill="#d7ebe6")
    draw.text((152, 356), "面向 35-60 岁未退休人群", font=body_font, fill="#f8fffd")
    draw.text((152, 402), "测一测你的储蓄、理财、基金、保险配置组合", font=body_font, fill="#d7ebe6")

    qr_box = (230, 555, 850, 1175)
    draw.rounded_rectangle((190, 515, 890, 1215), radius=28, fill="#f7faf9", outline="#d8e1de", width=2)
    canvas.paste(qr, qr_box[:2])

    center_text(draw, (540, 1256), "扫码开始测评", subtitle_font, "#16211f")
    center_text(draw, (540, 1305), "结果用于养老规划演示，不构成具体投资建议", small_font, "#60706c")

    canvas.save(POSTER_PATH)


if __name__ == "__main__":
    main()
