/**
 * pantun — validator & generator pantun Bahasa Indonesia.
 *
 * Zero dependency. Jalan di Node, Bun, Deno, dan browser (ESM + CJS).
 *
 * @example
 * import { cekPantun, buatPantun, acakPantun } from 'pantun';
 *
 * const hasil = cekPantun('Pagi hari pergi ke pasar\n...');
 * console.log(hasil.nilai, hasil.skor);
 *
 * const p = buatPantun(['Belajar rajin setiap hari', 'Agar cita-cita tercapai']);
 * console.log(p.teks);
 */
export { hitungSukuKata, ekstrakSukuAkhir } from './sukuKata.js';
export { skorRima, berima } from './rima.js';
export { cekPantun } from './cek.js';
export type { HasilCek, Masalah, RincianBaris, RincianRima } from './cek.js';
export { buatPantun, acakPantun, acakSampiran, daftarTema } from './generator.js';
export type { PantunDibuat, Tema } from './generator.js';
