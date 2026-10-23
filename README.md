# pantun

Validator & generator pantun Bahasa Indonesia. Zero dependency.

Orang Indonesia butuh pantun terus-menerus: MC acara, sambutan, kawinan,
presentasi, caption media sosial. Bikin pantun yang rimanya benar itu susah;
kebanyakan orang nekat saja dan rimanya berantakan. Package ini menilai
pantunmu kayak juri — dan bisa membuatkan sampiran yang rimanya nyambung
dengan isi karanganmu.

```bash
npm i github:junanda24/daily-pantun
# (segera: npm i pantun — nama sudah diamankan di registry, belum di-publish)
```

## Kenapa package ini

Tidak ada package npm yang serius menangani pantun (cek registry: nihil).
Yang ini bukan template kaku: algoritma rimanya mencocokkan suku kata akhir,
jadi sampiran yang dibuatkan benar-benar "bunyi" dengan isimu. Efek kejutnya:
`buatPantun` — kasih dua baris isi, terima dua baris sampiran yang rimanya pas.

## Fitur

- **`cekPantun(teks)`** — nilai sebuah teks sebagai pantun: cek 4 baris,
  hitung suku kata per baris (ideal 8–12), cek rima a-b-a-b. Keluar skor
  0–100, nilai (`Sempurna`/`Bagus`/`Lumayan`/`Belum pantun`), rincian per
  baris & rima, plus daftar masalah yang spesifik dan bisa ditindaklanjuti.
- **`buatPantun(isi, { tema })`** — beri 2 baris isi, terima pantun lengkap
  4 baris dengan sampiran yang rimanya paling nyambung (deterministik).
  Mengembalikan juga `kecocokanRima` 0–1 supaya kamu bisa pasang threshold
  sendiri.
- **`acakPantun(tema?)` / `acakSampiran(tema?)`** — pantun/sampiran acak dari
  bank data. `acakPantun` sengaja memilih isi yang rimanya paling nyambung
  dengan sampiran acaknya — pantun acak yang rima silangnya berantakan bukan
  pantun yang benar.
- **`hitungSukuKata(teks)`**, **`ekstrakSukuAkhir(kata)`**, **`skorRima(a, b)`**,
  **`berima(a, b)`** — util publik.
- **CLI `pantun`** — subcommand `cek`, `acak`, `buat`, `suku`.
- **Bank data original** — 6 tema (`pembuka`, `nasihat`, `cinta`, `lucu`,
  `perpisahan`, `semangat`), tiap tema 8 pasangan sampiran + 8 pasangan isi
  yang rima silangnya dicocokkan 1:1,
  seluruhnya ditulis untuk package ini. Dijaga otomatis oleh test:
  tiap baris 8–12 suku kata, tiap pasangan berima internal, tanpa duplikat.
- **Zero dependency.** ESM + CJS + type definitions. Jalan di Node, Bun,
  Deno, dan browser.

## Cara pakai

```ts
import { cekPantun, buatPantun, acakPantun } from 'pantun';

// 1. Nilai pantunmu
const hasil = cekPantun(
  'Pagi hari pergi ke pasar\n' +
    'Membeli mangga yang sangat segar\n' +
    'Jangan pernah berhenti belajar\n' +
    'Agar hidup menjadi lebih tegar',
);
console.log(hasil.nilai); // "Sempurna"
console.log(hasil.skor); // 100

// 2. Pantunmu dinilai jelek? Lihat masalahnya
const jelek = cekPantun('Halo semuanya\nApa kabar');
console.log(jelek.masalah);
// [
//   { kode: 'jumlah-baris', ... },
//   { kode: 'suku-kata', baris: 1, pesan: 'Baris 1 punya 5 suku kata — idealnya 8–12.' },
//   ...
// ]

// 3. Buatkan sampiran untuk isimu
const p = buatPantun(
  ['Belajar rajin setiap hari', 'Agar cita-cita tercapai'],
  { tema: 'nasihat' },
);
console.log(p.teks);
// <2 baris sampiran yang rimanya nyambung>
// Belajar rajin setiap hari
// Agar cita-cita tercapai
console.log(p.kecocokanRima); // mis. 0.85

// 4. Pantun acak buat MC dadakan
console.log(acakPantun('lucu').teks);
```

### CLI

```bash
# Nilai sebuah pantun
pantun cek "Pagi hari pergi ke pasar
Membeli mangga yang sangat segar
Jangan pernah berhenti belajar
Agar hidup menjadi lebih tegar"

# ...atau lewat stdin
cat pantunku.txt | pantun cek

# Pantun acak
pantun acak --tema cinta

# Buatkan sampiran untuk isimu
pantun buat --isi "Belajar rajin setiap hari | Agar cita-cita tercapai"

# Hitung suku kata
pantun suku "Indonesia tanah airku"
```

## Cara develop

```bash
git clone https://github.com/junanda24/daily-pantun.git
cd daily-pantun
npm install
npm test        # build ESM+CJS lalu jalanin semua test (node:test)
npm run build   # kompilasi ke dist/esm + dist/cjs
```

Struktur:

```
src/
  index.ts        # public API
  sukuKata.ts     # hitungSukuKata, ekstrakSukuAkhir (pure)
  rima.ts         # skorRima, berima
  cek.ts          # cekPantun + tipe HasilCek/Masalah/dll
  generator.ts    # buatPantun, acakPantun, acakSampiran, daftarTema
  data/
    sampiran.ts   # bank sampiran per tema (8 pasangan/tema)
    isi.ts        # bank isi per tema (8 pasangan/tema, rima silang 1:1 dgn sampiran)
  cli.ts          # entry point binary `pantun`
test/
  sukuKata.test.ts  rima.test.ts  cek.test.ts
  generator.test.ts  bank.test.ts   # bank.test.ts = penjaga mutu puisi
```

## Batasan jujur

- **Hitung suku kata adalah estimasi heuristik.** Bahasa Indonesia punya
  diftong dan kata serapan yang kadang meleset 1 suku kata. Didokumentasikan
  di sini, bukan diklaim sempurna.
- **`buatPantun` hanya sebagus bank sampirannya.** `kecocokanRima`
  dikembalikan apa adanya — kalau di bawah 0.7, anggap sarannya kurang pas
  dan coba tema lain.
- Bank data ditulis original untuk package ini; bukan kutipan karya berhak
  cipta.

## Catatan build (2026-10-23)

- `ekstrakSukuAkhir` sempat mengembalikan "am" untuk "tenggelam" (dari gugus
  vokal terakhir saja); spec menuntut "lam" — diperbaiki jadi suku kata
  terakhir yang sebenarnya (dari akhir gugus vokal *sebelum* terakhir).
- Regex gugus vokal sempat pakai quantifier `+` yang menggabungkan "ia"/"ua"
  ("dia" kehitung 1); spec menuntut 2 — quantifier dicabut, diftong
  "ai"/"au"/"oi" tetap 1 gugus via alternation.
- `acakPantun` awalnya dirancang "isi acak murni", tapi itu menghasilkan
  pantun dengan rima silang berantakan. Keputusan sadar: isi dipilih yang
  rimanya paling nyambung dengan sampiran acak (seri diputus acak), supaya
  keluarannya selalu pantun a-b-a-b yang benar.

## Lisensi

MIT.
