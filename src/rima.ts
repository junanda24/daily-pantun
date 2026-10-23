/**
 * Penilaian rima antar dua baris pantun berdasarkan suku kata akhir
 * dari kata terakhir masing-masing baris.
 */
import { ekstrakSukuAkhir, kataTerakhirDariBaris } from './sukuKata.js';

export const AMBANG_RIMA = 0.7;

/**
 * Skor kecocokan rima 0–1:
 * 1.0 = suku kata akhir sama persis ("dalam"/"tenggelam")
 * 0.7 = dua huruf terakhir sama ("baru"/"biru" -> "ru")
 * 0.4 = satu huruf terakhir sama
 * 0.0 = tidak cocok / salah satu baris kosong
 */
export function skorRima(barisA: string, barisB: string): number {
  const kataA = kataTerakhirDariBaris(barisA);
  const kataB = kataTerakhirDariBaris(barisB);
  if (kataA === '' || kataB === '') return 0;
  const sukuA = ekstrakSukuAkhir(kataA);
  const sukuB = ekstrakSukuAkhir(kataB);
  if (sukuA === sukuB) return 1;
  const akhir2A = sukuA.slice(-2);
  const akhir2B = sukuB.slice(-2);
  if (akhir2A.length === 2 && akhir2A === akhir2B) return 0.7;
  if (sukuA.slice(-1) === sukuB.slice(-1)) return 0.4;
  return 0;
}

/** True bila dua baris dianggap berima (skor >= 0.7). */
export function berima(barisA: string, barisB: string): boolean {
  return skorRima(barisA, barisB) >= AMBANG_RIMA;
}
