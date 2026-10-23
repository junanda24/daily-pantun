/**
 * Estimasi jumlah suku kata Bahasa Indonesia.
 *
 * Aturan: tiap gugus vokal = 1 suku kata. Diftong "ai", "au", "oi" dihitung
 * 1 gugus; gugus vokal lain yang berurutan dipecah ("dia" = di-a = 2,
 * "buah" = bu-ah = 2, "seekor" = se-e-kor = 3).
 *
 * Ini heuristik — kata serapan, singkatan tanpa vokal ("krn"), atau angka
 * bisa meleset. Keterbatasan ini didokumentasikan, bukan disembunyikan.
 */

const GUGUS_VOKAL = /(ai|au|oi|[aiueo])/g;

function bersihkan(teks: string): string {
  return teks.toLowerCase().replace(/[^a-z ]/g, ' ');
}

function hitungSukuKataPerKata(kata: string): number {
  const cocok = kata.match(GUGUS_VOKAL);
  return cocok ? cocok.length : 0;
}

/**
 * Estimasi jumlah suku kata dalam sebuah teks (kata, frasa, atau kalimat).
 * Contoh: hitungSukuKata("jalan jalan") === 4, hitungSukuKata("pulau") === 2,
 * hitungSukuKata("dia") === 2.
 */
export function hitungSukuKata(teks: string): number {
  const bersih = bersihkan(teks);
  if (bersih.trim() === '') return 0;
  return bersih
    .split(/\s+/)
    .filter((kata) => kata.length > 0)
    .reduce((total, kata) => total + hitungSukuKataPerKata(kata), 0);
}

function kataTerakhir(baris: string): string {
  const kata = bersihkan(baris).trim().split(/\s+/).filter((k) => k.length > 0);
  return kata.length === 0 ? '' : kata[kata.length - 1];
}

/**
 * Suku kata terakhir sebuah kata: dari akhir gugus vokal *sebelum* terakhir
 * sampai akhir kata. Contoh: "tenggelam" -> "lam", "biru" -> "ru",
 * "pulau" -> "lau". Kata satu suku kata dikembalikan utuh ("lah" -> "lah").
 */
export function ekstrakSukuAkhir(kata: string): string {
  const bersih = bersihkan(kata).replace(/\s+/g, '');
  if (bersih === '') return '';
  const gugus = [...bersih.matchAll(GUGUS_VOKAL)];
  if (gugus.length === 0) return bersih;
  if (gugus.length === 1) return bersih;
  const sebelumTerakhir = gugus[gugus.length - 2];
  const awal = (sebelumTerakhir.index ?? 0) + sebelumTerakhir[0].length;
  return bersih.slice(awal);
}

/** Kata terakhir dari sebuah baris (sudah dibersihkan). Diekspor untuk rima. */
export function kataTerakhirDariBaris(baris: string): string {
  return kataTerakhir(baris);
}
