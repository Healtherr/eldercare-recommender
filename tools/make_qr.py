from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
VENDOR = ROOT / ".vendor"
if VENDOR.exists():
    sys.path.insert(0, str(VENDOR))

try:
    import qrcode
    from qrcode.constants import ERROR_CORRECT_M
except ImportError:
    qrcode = None
    ERROR_CORRECT_M = None


VERSION = 5
SIZE = 17 + VERSION * 4
DATA_CODEWORDS = 108
ECC_CODEWORDS = 26
FORMAT_MASK = 0x5412
FORMAT_POLY = 0x537


def make_gf_tables() -> tuple[list[int], list[int]]:
    exp = [0] * 512
    log = [0] * 256
    x = 1
    for i in range(255):
        exp[i] = x
        log[x] = i
        x <<= 1
        if x & 0x100:
            x ^= 0x11D
    for i in range(255, 512):
        exp[i] = exp[i - 255]
    return exp, log


GF_EXP, GF_LOG = make_gf_tables()


def gf_mul(x: int, y: int) -> int:
    if x == 0 or y == 0:
        return 0
    return GF_EXP[GF_LOG[x] + GF_LOG[y]]


def poly_multiply(left: list[int], right: list[int]) -> list[int]:
    result = [0] * (len(left) + len(right) - 1)
    for i, left_value in enumerate(left):
        for j, right_value in enumerate(right):
            result[i + j] ^= gf_mul(left_value, right_value)
    return result


def rs_generator(degree: int) -> list[int]:
    result = [1]
    for i in range(degree):
        result = poly_multiply(result, [1, GF_EXP[i]])
    return result


def rs_remainder(data: list[int], degree: int) -> list[int]:
    generator = rs_generator(degree)
    result = [0] * degree
    for value in data:
        factor = value ^ result.pop(0)
        result.append(0)
        for i, coefficient in enumerate(generator[1:]):
            result[i] ^= gf_mul(coefficient, factor)
    return result


def append_bits(bits: list[int], value: int, length: int) -> None:
    for i in range(length - 1, -1, -1):
        bits.append((value >> i) & 1)


def encode_data(text: str) -> list[int]:
    payload = text.encode("utf-8")
    if len(payload) > 106:
        raise ValueError("Version 5-L QR can hold up to 106 UTF-8 bytes for byte mode.")

    bits: list[int] = []
    append_bits(bits, 0b0100, 4)
    append_bits(bits, len(payload), 8)
    for value in payload:
        append_bits(bits, value, 8)

    capacity_bits = DATA_CODEWORDS * 8
    append_bits(bits, 0, min(4, capacity_bits - len(bits)))
    while len(bits) % 8:
        bits.append(0)

    pad_bytes = [0xEC, 0x11]
    pad_index = 0
    while len(bits) < capacity_bits:
        append_bits(bits, pad_bytes[pad_index % 2], 8)
        pad_index += 1

    data_codewords = [
        sum(bits[i + j] << (7 - j) for j in range(8))
        for i in range(0, capacity_bits, 8)
    ]
    return data_codewords + rs_remainder(data_codewords, ECC_CODEWORDS)


class QRMatrix:
    def __init__(self) -> None:
        self.modules = [[False] * SIZE for _ in range(SIZE)]
        self.function = [[False] * SIZE for _ in range(SIZE)]

    def set_function(self, x: int, y: int, black: bool) -> None:
        if 0 <= x < SIZE and 0 <= y < SIZE:
            self.modules[y][x] = black
            self.function[y][x] = True

    def draw_finder(self, x: int, y: int) -> None:
        for dy in range(-1, 8):
            for dx in range(-1, 8):
                xx = x + dx
                yy = y + dy
                if not (0 <= xx < SIZE and 0 <= yy < SIZE):
                    continue
                black = (
                    0 <= dx <= 6
                    and 0 <= dy <= 6
                    and (dx in (0, 6) or dy in (0, 6) or (2 <= dx <= 4 and 2 <= dy <= 4))
                )
                self.set_function(xx, yy, black)

    def draw_alignment(self, center_x: int, center_y: int) -> None:
        for dy in range(-2, 3):
            for dx in range(-2, 3):
                black = max(abs(dx), abs(dy)) != 1
                self.set_function(center_x + dx, center_y + dy, black)

    def draw_function_patterns(self) -> None:
        self.draw_finder(0, 0)
        self.draw_finder(SIZE - 7, 0)
        self.draw_finder(0, SIZE - 7)
        self.draw_alignment(30, 30)

        for i in range(8, SIZE - 8):
            self.set_function(i, 6, i % 2 == 0)
            self.set_function(6, i, i % 2 == 0)

        self.set_function(8, 4 * VERSION + 9, True)
        self.reserve_format()

    def reserve_format(self) -> None:
        for x, y in format_positions():
            self.set_function(x, y, False)

    def draw_codewords(self, codewords: list[int]) -> None:
        bits: list[int] = []
        for value in codewords:
            append_bits(bits, value, 8)

        bit_index = 0
        upward = True
        right = SIZE - 1
        while right > 0:
            if right == 6:
                right -= 1
            rows = range(SIZE - 1, -1, -1) if upward else range(SIZE)
            for y in rows:
                for x in (right, right - 1):
                    if self.function[y][x]:
                        continue
                    bit = bits[bit_index] if bit_index < len(bits) else 0
                    self.modules[y][x] = bool(bit)
                    bit_index += 1
            upward = not upward
            right -= 2

    def masked(self, mask: int) -> list[list[bool]]:
        candidate = [row[:] for row in self.modules]
        for y in range(SIZE):
            for x in range(SIZE):
                if not self.function[y][x] and mask_bit(mask, x, y):
                    candidate[y][x] = not candidate[y][x]
        draw_format(candidate, mask)
        return candidate


def format_positions() -> list[tuple[int, int]]:
    positions: list[tuple[int, int]] = []
    positions.extend((8, i) for i in range(6))
    positions.extend([(8, 7), (8, 8), (7, 8)])
    positions.extend((14 - i, 8) for i in range(9, 15))
    positions.extend((SIZE - 1 - i, 8) for i in range(8))
    positions.extend((8, SIZE - 15 + i) for i in range(8, 15))
    return positions


def format_bits(mask: int) -> int:
    data = (1 << 3) | mask  # Error correction L = 01.
    remainder = data
    for _ in range(10):
        remainder = (remainder << 1) ^ (((remainder >> 9) & 1) * FORMAT_POLY)
    return ((data << 10) | remainder) ^ FORMAT_MASK


def draw_format(matrix: list[list[bool]], mask: int) -> None:
    bits = format_bits(mask)
    for i in range(6):
        matrix[i][8] = bool((bits >> i) & 1)
    matrix[7][8] = bool((bits >> 6) & 1)
    matrix[8][8] = bool((bits >> 7) & 1)
    matrix[8][7] = bool((bits >> 8) & 1)
    for i in range(9, 15):
        matrix[8][14 - i] = bool((bits >> i) & 1)
    for i in range(8):
        matrix[8][SIZE - 1 - i] = bool((bits >> i) & 1)
    for i in range(8, 15):
        matrix[SIZE - 15 + i][8] = bool((bits >> i) & 1)
    matrix[SIZE - 8][8] = True


def mask_bit(mask: int, x: int, y: int) -> bool:
    if mask == 0:
        return (x + y) % 2 == 0
    if mask == 1:
        return y % 2 == 0
    if mask == 2:
        return x % 3 == 0
    if mask == 3:
        return (x + y) % 3 == 0
    if mask == 4:
        return (x // 3 + y // 2) % 2 == 0
    if mask == 5:
        return (x * y) % 2 + (x * y) % 3 == 0
    if mask == 6:
        return ((x * y) % 2 + (x * y) % 3) % 2 == 0
    if mask == 7:
        return ((x + y) % 2 + (x * y) % 3) % 2 == 0
    raise ValueError(f"Invalid mask: {mask}")


def penalty_score(matrix: list[list[bool]]) -> int:
    penalty = 0
    lines = matrix + [[matrix[y][x] for y in range(SIZE)] for x in range(SIZE)]

    for line in lines:
        run_color = line[0]
        run_length = 1
        for color in line[1:]:
            if color == run_color:
                run_length += 1
            else:
                if run_length >= 5:
                    penalty += 3 + (run_length - 5)
                run_color = color
                run_length = 1
        if run_length >= 5:
            penalty += 3 + (run_length - 5)

    for y in range(SIZE - 1):
        for x in range(SIZE - 1):
            color = matrix[y][x]
            if matrix[y][x + 1] == color and matrix[y + 1][x] == color and matrix[y + 1][x + 1] == color:
                penalty += 3

    patterns = ([True, False, True, True, True, False, True, False, False, False, False],
                [False, False, False, False, True, False, True, True, True, False, True])
    for line in lines:
        for i in range(SIZE - 10):
            window = line[i : i + 11]
            if window == list(patterns[0]) or window == list(patterns[1]):
                penalty += 40

    dark = sum(1 for row in matrix for value in row if value)
    total = SIZE * SIZE
    penalty += (abs(dark * 20 - total * 10) // total) * 10
    return penalty


def build_qr(text: str) -> list[list[bool]]:
    qr = QRMatrix()
    qr.draw_function_patterns()
    qr.draw_codewords(encode_data(text))
    candidates = [(penalty_score(qr.masked(mask)), mask, qr.masked(mask)) for mask in range(8)]
    return min(candidates, key=lambda item: item[0])[2]


def save_png(matrix: list[list[bool]], output_path: Path, scale: int = 14, border: int = 4) -> None:
    modules = SIZE + border * 2
    image = Image.new("RGB", (modules * scale, modules * scale), "#ffffff")
    draw = ImageDraw.Draw(image)
    for y, row in enumerate(matrix):
        for x, value in enumerate(row):
            if value:
                x0 = (x + border) * scale
                y0 = (y + border) * scale
                draw.rectangle((x0, y0, x0 + scale - 1, y0 + scale - 1), fill="#000000")
    image.save(output_path)


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: python3 make_qr.py <text> <output.png>")

    text = sys.argv[1]
    output_path = Path(sys.argv[2])
    output_path.parent.mkdir(parents=True, exist_ok=True)

    if qrcode is not None:
        qr = qrcode.QRCode(error_correction=ERROR_CORRECT_M, box_size=14, border=4)
        qr.add_data(text)
        qr.make(fit=True)
        image = qr.make_image(fill_color="black", back_color="white").convert("RGB")
        image.save(output_path)
        return

    save_png(build_qr(text), output_path)


if __name__ == "__main__":
    main()
