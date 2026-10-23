# Design — `pantun` v1.0.0

## Stack
- TypeScript 5 (strict), target ES2020, modul ganda: ESM (`dist/esm`) + CJS
  (`dist/cjs`) via dua tsconfig; `node16` moduleResolution dengan `exports`.
- **Zero runtime dependency.** Dev-dep hanya `typescript`.
- Test: `node:test` bawaan Node (test ditulis TS, dikompilasi ke `dist/test`,
  dijalankan via `node --test`). Tanpa framework test eksternal.
- Lint/format: mengikuti gaya Airbnb/Prettier secara manual (2-space, single
  quotes, semicolons, trailing commas, named exports, `===`); tidak ada
  eslint-config-airbnb karena package non-React kecil — gaya ditegakkan saat
  review kode manual + contoh konsisten.

## Struktur (per-tanggung-jawab, tiap file <300 baris)
```
src/
  index.ts        # public API: re-export + tipe publik
  sukuKata.ts     # hitungSukuKata, ekstrakSukuAkhir (pure functions)
  rima.ts         # skorRima, berima (tergantung sukuKata.ts)
  cek.ts          # cekPantun (tergantung sukuKata.ts, rima.ts)
  generator.ts    # buatPantun, acakPantun, acakSampiran, daftarTema
                  # (tergantung rima.ts + data/)
  data/
    sampiran.ts   # SAMPIRAN: Record<Tema, [string, string][]>
    isi.ts        # ISI: Record<Tema, [string, string][]>
  cli.ts          # entry bin: parse argv tipis → panggil API → cetak
test/
  sukuKata.test.ts  rima.test.ts  cek.test.ts  generator.test.ts
```
Alur dependensi satu arah: `data/` → `generator.ts`; `sukuKata.ts` →
`rima.ts` → `cek.ts`. Tidak ada cyclic import. Tidak ada barrel file bermasalah
(index.ts adalah public API package — wajar untuk library, bukan Vite app).

## Algoritma inti
1. **Suku kata**: normalisasi (lowercase, hanya a-z), pecah per kata, hitung
   gugus vokal `[aiueo]+` dengan regex yang menggabungkan diftong
   `(ai|au|oi)` sebagai satu gugus. Kata tanpa vokal (mis. "krn") = 0 —
   didokumentasikan sebagai estimasi heuristik.
2. **Rima**: kata terakhir tiap baris → `ekstrakSukuAkhir` → bandingkan
   (sama persis 1.0 / 2 huruf akhir sama 0.7 / 1 huruf akhir sama 0.4 / 0).
3. **Cek**: penalti aditif dari 100 (25 jumlah baris, 8/baris di luar 8–12,
   12/pasangan rima gagal). Threshold valid = tanpa masalah.
4. **Generator**: brute force atas bank sampiran (≤ ~60 kandidat × 2 pasangan
   rima — trivial), pilih skor tertinggi. Deterministik untuk isi yang sama.

## CLI
`bin/pantun` → `dist/cjs/cli.js` (shebang node). Parsing argv manual
(zero-dep; tidak perlu commander untuk 4 subcommand). stdin dibaca bila
argumen `cek` kosong dan stdin bukan TTY.

## State buckets (ARCHITECTURE.md §2)
Tidak relevan — library murni tanpa state: semua fungsi pure, tanpa global
mutable, tanpa I/O kecuali CLI (edge). Data bank bersifat `readonly`.

## Batasan jujur
- Hitung suku kata adalah **estimasi heuristik** (diftong/serapan bisa meleset
  1 suku kata) — ditulis eksplisit di README, bukan diklaim sempurna.
- `buatPantun` hanya sebagus bank sampirannya; `kecocokanRima` dikembalikan
  agar pemanggil bisa memutuskan threshold sendiri.
