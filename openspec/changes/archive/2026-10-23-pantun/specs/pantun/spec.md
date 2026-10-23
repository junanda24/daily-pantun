# Spec — capability `pantun`

## SHALL-01 — Hitung suku kata
Fungsi `hitungSukuKata(teks: string): number` SHALL mengembalikan estimasi
jumlah suku kata Bahasa Indonesia dengan aturan:
- WHEN teks mengandung gugus vokal (a/i/u/e/o) THEN tiap gugus dihitung 1 suku kata.
- WHEN ada diftong `ai`, `au`, `oi` THEN dihitung 1 suku kata (mis. "pulau" = 2,
  "pantai" = 2, "kalau" = 2).
- WHEN kata mengandung "ia"/"ua" (bukan diftong) THEN dihitung 2 suku kata
  (mis. "dia" = 2, "buah" = 2).
- WHEN teks kosong THEN mengembalikan 0.
- WHEN teks multi-kata THEN menjumlahkan semua kata ("jalan jalan" = 4).

## SHALL-02 — Ekstrak suku kata akhir
Fungsi `ekstrakSukuAkhir(kata: string): string` SHALL mengembalikan suku kata
terakhir sebuah kata (dari gugus vokal terakhir sampai akhir kata).
- WHEN kata = "tenggelam" THEN "lam".
- WHEN kata = "biru" THEN "ru".
- WHEN kata kosong THEN "".

## SHALL-03 — Skor rima
Fungsi `skorRima(barisA: string, barisB: string): number` SHALL mengembalikan
0–1 berdasarkan kecocokan suku kata akhir kata terakhir tiap baris:
- WHEN suku akhir sama persis THEN 1.
- WHEN 2 huruf terakhir sama THEN 0.7.
- WHEN 1 huruf terakhir sama THEN 0.4.
- WHEN tidak ada kecocokan THEN 0.
- WHEN salah satu baris kosong THEN 0.
Fungsi `berima(a, b): boolean` SHALL true iff `skorRima(a, b) >= 0.7`.
Perbandingan SHALL case-insensitive.

## SHALL-04 — Cek pantun
Fungsi `cekPantun(teks: string): HasilCek` SHALL:
- WHEN teks tidak terdiri dari tepat 4 baris non-kosong THEN menambahkan masalah
  `jumlah-baris` dan skor dipotong 25.
- WHEN suatu baris memiliki <8 atau >12 suku kata THEN menambahkan masalah
  `suku-kata` untuk baris itu (pesan menyebut angka aktual) dan skor dipotong 8
  per baris.
- WHEN pasangan baris (1,3) atau (2,4) tidak berima THEN menambahkan masalah
  `rima` untuk pasangan itu dan skor dipotong 12 per pasangan.
- SHALL mengembalikan `skor` 0–100 (mulai 100, dikurangi penalti, min 0),
  `valid` true iff tidak ada masalah, `nilai` ("Sempurna" ≥90, "Bagus" ≥70,
  "Lumayan" ≥50, "Belum pantun" <50), rincian per baris, dan rincian rima
  kedua pasangan.

## SHALL-05 — Bank data original
Modul data SHALL menyediakan minimal 8 pasangan sampiran dan 6 pasangan isi
per tema untuk 6 tema: `pembuka`, `nasihat`, `cinta`, `lucu`, `perpisahan`,
`semangat`. SELURUH baris SHALL original (ditulis untuk package ini), tanpa
menyalin karya berhak cipta. Tiap pasangan sampiran/isi SHALL berima internal
(a-a) agar hasil acak tetap enak dibaca. Keputusan desain: 8 pasangan isi
per tema (di atas minimal 6), dengan rima silang dicocokkan 1:1 terhadap
pasangan sampiran setema (skorRima 1.0 untuk kedua pasangan silang), agar
`acakPantun` selalu menghasilkan pantun a-b-a-b yang benar.

## SHALL-06 — Buat pantun dari isi
Fungsi `buatPantun(isi: [string, string], opts?: { tema?: Tema }): PantunDibuat`
SHALL:
- WHEN tema diberikan THEN hanya mencari sampiran dari tema itu; WHEN tidak
  diberikan THEN mencari di semua tema.
- SHALL memilih pasangan sampiran dengan `skorRima(s[0], isi[0]) +
  skorRima(s[1], isi[1])` tertinggi.
- SHALL mengembalikan `{ sampiran, isi, teks, kecocokanRima, tema }` di mana
  `teks` adalah 4 baris digabung `\n` dan `kecocokanRima` 0–1 (rata-rata dua
  pasangan, dibulatkan 2 desimal).

## SHALL-07 — Pantun acak
Fungsi `acakPantun(tema?: Tema): PantunDibuat` SHALL mengembalikan satu pantun
lengkap (sampiran + isi acak dari bank data; tema acak bila tidak diberikan).
Fungsi `acakSampiran(tema?: Tema): [string, string]` SHALL mengembalikan satu
pasangan sampiran acak. Fungsi `daftarTema(): Tema[]` SHALL mengembalikan
keenam tema.

## SHALL-08 — Public API & dual module
Package SHALL mengekspos via `src/index.ts`: `hitungSukuKata`,
`ekstrakSukuAkhir`, `skorRima`, `berima`, `cekPantun`, `buatPantun`,
`acakPantun`, `acakSampiran`, `daftarTema`, plus tipe `Tema`, `HasilCek`,
`PantunDibuat`, `Masalah`, `RincianBaris`, `RincianRima`.
Build SHALL menghasilkan ESM (`dist/esm`) dan CJS (`dist/cjs`) + type
definitions, dengan `exports` yang benar untuk `import` dan `require`.

## SHALL-09 — CLI
Binary `pantun` SHALL menyediakan:
- WHEN `pantun cek "<teks>"` THEN mencetak nilai, skor, dan daftar masalah
  (atau "pantun sempurna" bila valid). WHEN argumen tidak diberikan THEN membaca
  dari stdin.
- WHEN `pantun acak [--tema <tema>]` THEN mencetak satu pantun acak.
- WHEN `pantun buat --isi "baris3 | baris4" [--tema <tema>]` THEN mencetak
  pantun hasil `buatPantun`.
- WHEN `pantun suku "<teks>"` THEN mencetak jumlah suku kata.
- WHEN tema tidak dikenal THEN keluar dengan kode 1 dan pesan error Bahasa
  Indonesia yang jelas.

## SHALL-10 — Test hijau
`npm test` SHALL hijau: mencakup hitung suku kata (diftong, kata kosong,
multi-kata), skor rima (4 tingkat), cekPantun (pantun sempurna → valid;
baris kurang → masalah jumlah-baris; suku kata berlebih → masalah suku-kata;
rima rusak → masalah rima), buatPantun (memilih sampiran dengan rima terbaik;
tema terfilter), dan acakPantun/acakSampiran (struktur 2+2 baris, tema valid).

## SHALL-11 — Tanpa secret & tanpa placeholder
Repo SHALL memiliki `.gitignore` yang mengecualikan `.env*`, `*.pem`, `*.key`,
`credentials*`. Tidak ada fungsi mati, tidak ada lorem ipsum. README SHALL
lengkap: judul + masalah, kenapa dipilih, fitur, cara install & pakai + contoh
kode, cara develop, tech stack, struktur folder, catatan build.
