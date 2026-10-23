# Proposal — `pantun` (npm package)

## Apa
Package npm TypeScript **zero-dependency** bernama `pantun`: validator dan generator
pantun Bahasa Indonesia.

- `cekPantun(teks)` — menilai apakah sebuah teks adalah pantun yang benar:
  cek 4 baris, hitung suku kata per baris (ideal 8–12), cek rima a-b-a-b,
  keluar skor 0–100 + daftar masalah yang spesifik per baris.
- `hitungSukuKata(teks)`, `berima(a, b)`, `skorRima(a, b)` — util publik.
- `buatPantun(isi)` — pengguna memberi 2 baris ISI, package mencarikan 2 baris
  SAMPIRAN dari bank data yang rimanya paling nyambung (baris 1≈3, 2≈4).
- `acakPantun(tema)` / `acakSampiran(tema)` — pantun acak per tema
  (pembuka, nasihat, cinta, lucu, perpisahan, semangat).
- CLI `pantun`: subcommand `cek`, `acak`, `buat`, `suku`.

## Kenapa
Orang Indonesia butuh pantun terus-menerus: MC acara, sambutan, kawinan,
presentasi, caption. Bikin pantun yang rimanya benar itu susah; kebanyakan
orang nekat saja dan rimanya berantakan. Tidak ada package npm yang serius
menangani ini (pencarian registry 2026-10-23: nihil — hanya paket tak terkait
yang kebetulan mengandung kata "pantun").

## Efek kejut
"kok kepikiran sih" — package yang bisa **menilai pantunmu kayak juri** dan
**membuatkan sampiran yang rimanya pas dengan isi karanganmu**. Bukan template
kaku: algoritma rima-nya mencocokkan suku kata akhir. Ini hal yang tidak ada
di package `terbilang`/`angka-kata` mana pun (arah maju terbilang sudah ramai
10+ package; arah mundur pun sudah ada `to-numbers` — pantun adalah lahan kosong).

## Kenapa bentuk npm package
- Masalahnya adalah masalah *developer/writer tooling*: dipakai di form,
  bot, web MC, tugas sekolah. Bentuk library paling pas.
- Zero dependency, jalan di Node, Bun, Deno, dan browser (ESM+CJS dual).
- API kecil dan elegan: satu masalah (pantun benar) diselesaikan tuntas.

## Kenapa tanpa backend
Tidak butuh. Semua komputasi (hitung suku kata, skor rima, pencocokan
sampiran) deterministik dan ringan — murni client-side. Backend hanya menambah
biaya tanpa guna.

## Kepatuhan
- Kode Bahasa Inggris, copy/dokumentasi Bahasa Indonesia natural (anti-AI-slop).
- IP check: SELURUH bank sampiran/isi ditulis original untuk package ini.
  Tidak mengutip pantun modern berhak cipta; pantun rakyat yang sangat umum
  (folklor, public domain) dipakai seperlunya dan ditulis ulang dengan gaya sendiri.
- Ikut `CODE_STANDARDS.md` (Airbnb-based, Prettier: 2-space, single quotes,
  semicolons) dan `ARCHITECTURE.md` (modul kecil per tanggung jawab, tanpa file
  >300 baris, tanpa duplikasi logika).
- Aturan keras: tidak ada credential dalam bentuk apa pun di repo ini.

## Persetujuan
Disetujui sendiri oleh Vex pada 2026-10-23 atas otoritas penuh scheduler
"1 Hari 1 Project" (tanpa gate approval). Lanjut ke Apply.
