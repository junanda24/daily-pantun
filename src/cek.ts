/**
 * Penilai pantun: cek struktur 4 baris, jumlah suku kata per baris (ideal
 * 8–12), dan rima a-b-a-b (baris 1≈3, baris 2≈4).
 */
import { hitungSukuKata } from './sukuKata.js';
import { berima, skorRima } from './rima.js';

export const SUKU_KATA_MIN = 8;
export const SUKU_KATA_MAX = 12;
export const PENALTI_JUMLAH_BARIS = 25;
export const PENALTI_SUKU_KATA = 8;
export const PENALTI_RIMA = 12;

export interface RincianBaris {
  teks: string;
  sukuKata: number;
  sukuKataIdeal: boolean;
}

export interface RincianRima {
  pasangan: '1-3' | '2-4';
  skor: number;
  cocok: boolean;
}

export interface Masalah {
  /** Kode mesin: 'jumlah-baris' | 'suku-kata' | 'rima' */
  kode: string;
  /** Nomor baris (1-based); 0 bila masalah umum. */
  baris: number;
  /** Penjelasan Bahasa Indonesia yang bisa ditindaklanjuti. */
  pesan: string;
}

export interface HasilCek {
  valid: boolean;
  /** 0–100 */
  skor: number;
  nilai: 'Sempurna' | 'Bagus' | 'Lumayan' | 'Belum pantun';
  baris: RincianBaris[];
  rima: RincianRima[];
  masalah: Masalah[];
}

function nilaiDariSkor(skor: number): HasilCek['nilai'] {
  if (skor >= 90) return 'Sempurna';
  if (skor >= 70) return 'Bagus';
  if (skor >= 50) return 'Lumayan';
  return 'Belum pantun';
}

/**
 * Menilai sebuah teks sebagai pantun. Mengembalikan skor, nilai,
 * rincian per baris & rima, dan daftar masalah yang spesifik.
 */
export function cekPantun(teks: string): HasilCek {
  const barisTeks = teks
    .split(/\r?\n/)
    .map((b) => b.trim())
    .filter((b) => b.length > 0);

  const masalah: Masalah[] = [];
  let skor = 100;

  if (barisTeks.length !== 4) {
    masalah.push({
      kode: 'jumlah-baris',
      baris: 0,
      pesan: `Pantun harus terdiri dari 4 baris, teks ini punya ${barisTeks.length} baris.`,
    });
    skor -= PENALTI_JUMLAH_BARIS;
  }

  const baris: RincianBaris[] = barisTeks.map((t) => {
    const sukuKata = hitungSukuKata(t);
    const ideal = sukuKata >= SUKU_KATA_MIN && sukuKata <= SUKU_KATA_MAX;
    return { teks: t, sukuKata, sukuKataIdeal: ideal };
  });

  baris.forEach((b, i) => {
    if (!b.sukuKataIdeal) {
      masalah.push({
        kode: 'suku-kata',
        baris: i + 1,
        pesan:
          `Baris ${i + 1} punya ${b.sukuKata} suku kata — ` +
          `idealnya ${SUKU_KATA_MIN}–${SUKU_KATA_MAX}.`,
      });
      skor -= PENALTI_SUKU_KATA;
    }
  });

  const rima: RincianRima[] = [];
  const pasangan: Array<[number, number, RincianRima['pasangan']]> = [
    [0, 2, '1-3'],
    [1, 3, '2-4'],
  ];
  pasangan.forEach(([a, b, nama]) => {
    if (a >= barisTeks.length || b >= barisTeks.length) return;
    const s = skorRima(barisTeks[a], barisTeks[b]);
    const cocok = berima(barisTeks[a], barisTeks[b]);
    rima.push({ pasangan: nama, skor: s, cocok });
    if (!cocok) {
      masalah.push({
        kode: 'rima',
        baris: 0,
        pesan:
          `Baris ${nama} tidak berima ` +
          `(akhiran "${barisTeks[a].split(/\s+/).pop()}" vs ` +
          `"${barisTeks[b].split(/\s+/).pop()}").`,
      });
      skor -= PENALTI_RIMA;
    }
  });

  const skorAkhir = Math.max(0, skor);
  return {
    valid: masalah.length === 0,
    skor: skorAkhir,
    nilai: nilaiDariSkor(skorAkhir),
    baris,
    rima,
    masalah,
  };
}
