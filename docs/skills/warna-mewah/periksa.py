#!/usr/bin/env python3
"""Pemeriksa palet "mewah atau tidak" untuk skill warna-mewah.

Pakai:
  python3 periksa.py gelap=#6b1d24 terang=#f3eadb aksen=#8a9a82 emas=#b8975a
  python3 periksa.py --teks gelap:terang --teks terang:gelap gelap=#.. terang=#..

Peran yang dikenali: gelap (jangkar), terang (netral/latar), aksen, emas (logam), teks, lain.
Hasil: skor 0-100, putusan, dan alasan per aturan. Hanya Python standar, tanpa pustaka luar.
"""
import math
import sys


def hex_rgb(h):
    h = h.strip().lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


def linear(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def oklch(hexc):
    # sRGB -> OKLab (Ottosson) -> OKLCH. L 0-1, C ~0-0.37, h derajat
    r, g, b = (linear(c) for c in hex_rgb(hexc))
    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l_, m_, s_ = (math.copysign(abs(x) ** (1 / 3), x) for x in (l, m, s))
    L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
    A = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
    B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
    C = math.hypot(A, B)
    H = math.degrees(math.atan2(B, A)) % 360
    return L, C, H


def luminance(hexc):
    r, g, b = (linear(c) for c in hex_rgb(hexc))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def kontras(a, b):
    x, y = sorted((luminance(a), luminance(b)), reverse=True)
    return (x + 0.05) / (y + 0.05)


def beda_hue(a, b):
    d = abs(a - b) % 360
    return min(d, 360 - d)


def periksa(palet, pasangan_teks):
    temuan = []  # (poin dikurangi, tingkat, pesan)
    info = {}
    for peran, hx in palet:
        info[(peran, hx)] = oklch(hx)

    for (peran, hx), (L, C, H) in info.items():
        nama = f"{peran} {hx}"
        # 1. Neon / terang mencolok: jenuh DAN terang = kesan murah
        if C > 0.20 and L > 0.55:
            temuan.append((25, "BURUK", f"{nama}: neon/terlalu mencolok (C={C:.2f}, L={L:.2f}). Turunkan saturasi atau gelapkan."))
        elif C > 0.15 and L > 0.6 and peran != "emas":
            temuan.append((15, "BURUK", f"{nama}: terang dan jenuh (C={C:.2f}). Warna mewah lebih kalem; pakai versi dusty/muted."))
        # 2. Warna dasar (gelap/terang) terlalu jenuh
        if peran == "terang" and C > 0.05:
            temuan.append((10, "CATATAN", f"{nama}: latar terang terlalu berwarna (C={C:.2f}). Netral kaya (gading/krem) idealnya C 0.005-0.04."))
        if peran == "gelap" and C > 0.17:
            temuan.append((10, "CATATAN", f"{nama}: jangkar gelap terlalu jenuh (C={C:.2f}). Nada permata yang mewah biasanya C 0.04-0.15."))
        # 3. Putih murni & hitam murni
        if L > 0.985 and C < 0.006:
            temuan.append((8, "CATATAN", f"{nama}: putih murni terasa dingin dan 'murah'. Pakai gading/putih tulang (sedikit hangat)."))
        if L < 0.13 and C < 0.006:
            temuan.append((5, "CATATAN", f"{nama}: hitam murni terasa datar. Pakai hitam hangat (sedikit cokelat/hijau/biru)."))
        # 4. Emas kuning datar
        if peran == "emas":
            if 60 <= H <= 110 and C > 0.15:
                temuan.append((20, "BURUK", f"{nama}: emas kuning terang (C={C:.2f}) terlihat seperti mainan. Emas mewah = antik/sampanye: C 0.06-0.13, L 0.6-0.82."))
            elif not (0.55 <= L <= 0.86):
                temuan.append((6, "CATATAN", f"{nama}: emas terlalu {'gelap' if L < 0.55 else 'pucat'} (L={L:.2f}); idealnya L 0.6-0.82."))
            if not (40 <= H <= 110):
                temuan.append((6, "CATATAN", f"{nama}: rona emas tidak wajar (h={H:.0f}°); emas berada di rona 50-100°."))

    # 5. Jumlah warna dan keluarga rona
    if len(palet) > 5:
        temuan.append((10, "CATATAN", f"Palet {len(palet)} warna. Palet mewah 3-4 warna: 1 jangkar gelap, 1-2 netral, 1 aksen logam."))
    berwarna = [(H, peran) for (peran, hx), (L, C, H) in info.items() if C >= 0.04 and peran != "emas"]
    keluarga = []
    for H, _ in berwarna:
        if not any(beda_hue(H, k) < 35 for k in keluarga):
            keluarga.append(H)
    if len(keluarga) > 2:
        temuan.append((12, "CATATAN", f"{len(keluarga)} keluarga rona berwarna (di luar netral & emas). Batasi ke 1-2 agar terasa terkendali."))

    # 6. Struktur: harus ada jangkar gelap/dalam dan netral terang yang kaya
    ada_gelap = any(L < 0.42 for (L, C, H) in info.values())
    ada_netral = any(L > 0.88 and C < 0.05 for (L, C, H) in info.values())
    if not ada_gelap:
        temuan.append((12, "CATATAN", "Tidak ada jangkar gelap/dalam (L<0.42). Kemewahan butuh satu nada dalam sebagai bobot."))
    if not ada_netral:
        temuan.append((8, "CATATAN", "Tidak ada netral terang yang kaya (gading/krem) untuk ruang bernapas."))

    # 7. Kontras teks
    for a, b in pasangan_teks:
        k = kontras(a, b)
        if k < 4.5:
            temuan.append((10, "BURUK", f"Kontras teks {a} di atas {b} hanya {k:.2f}:1 (minimal 4.5:1)."))

    skor = max(0, 100 - sum(p for p, _, _ in temuan))
    putusan = "MEWAH" if skor >= 85 else "CUKUP, PERLU DIRAPIKAN" if skor >= 65 else "TIDAK MEWAH"
    return skor, putusan, temuan, info


def main(argv):
    palet, teks = [], []
    args = iter(argv)
    for a in args:
        if a == "--teks":
            teks.append(next(args))
        elif "=" in a:
            peran, hx = a.split("=", 1)
            palet.append((peran.strip().lower(), hx.strip()))
    if not palet:
        print(__doc__)
        return 1
    peta = dict(palet)
    pasangan = []
    for t in teks:
        a, b = t.split(":")
        pasangan.append((peta.get(a, a), peta.get(b, b)))
    skor, putusan, temuan, info = periksa(palet, pasangan)
    print(f"Skor: {skor}/100  ->  {putusan}")
    for (peran, hx), (L, C, H) in info.items():
        print(f"  {peran:7} {hx}  L={L:.2f} C={C:.3f} h={H:.0f}°")
    if temuan:
        print("Temuan:")
        for p, t, m in temuan:
            print(f"  [-{p:2}] {t:7} {m}")
    else:
        print("Tidak ada temuan.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
