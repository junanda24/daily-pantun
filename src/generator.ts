/**
 * Generator pantun: carikan sampiran yang rimanya paling nyambung dengan isi,
 * atau rangkai satu pantun acak dari bank data.
 */
import { skorRima } from './rima.js';
import { SAMPIRAN } from './data/sampiran.js';
import { ISI } from './data/isi.js';

/** Tema pantun yang tersedia di bank data. */
export type Tema =
  | 'pembuka'
  | 'nasihat'
  | 'cinta'
  | 'lucu'
  | 'perpisahan'
  | 'semangat';

const SEMUA_TEMA: readonly Tema[] = [
  'pembuka',
  'nasihat',
  'cinta',
  'lucu',
  'perpisahan',
  'semangat',
];

export interface PantunDibuat {
  sampiran: [string, string];
  isi: [string, string];
  /** Empat baris pantun digabung dengan newline. */
  teks: string;
  /** 0–1: rata-rata skor rima pasangan (1,3) & (2,4), dibulatkan 2 desimal. */
  kecocokanRima: number;
  /** Tema asal sampiran yang terpilih. */
  tema: Tema;
}

/** Daftar semua tema yang tersedia di bank data. */
export function daftarTema(): Tema[] {
  return [...SEMUA_TEMA];
}

function acakDari<T>(daftar: readonly T[]): T {
  return daftar[Math.floor(Math.random() * daftar.length)];
}

function bulatkan2(n: number): number {
  return Math.round(n * 100) / 100;
}

function skorPasangan(
  sampiran: readonly [string, string],
  isi: readonly [string, string],
): number {
  return (skorRima(sampiran[0], isi[0]) + skorRima(sampiran[1], isi[1])) / 2;
}

/**
 * Carikan sampiran yang rimanya paling nyambung dengan dua baris isi.
 * Brute force atas seluruh bank (≤60 kandidat — trivial), deterministik:
 * isi yang sama selalu menghasilkan sampiran yang sama. Bila `tema`
 * diberikan, pencarian dibatasi ke tema itu saja.
 */
export function buatPantun(
  isi: [string, string],
  opts?: { tema?: Tema },
): PantunDibuat {
  const cakupan: readonly Tema[] = opts?.tema ? [opts.tema] : SEMUA_TEMA;
  let pemenang: { pasangan: [string, string]; tema: Tema } = {
    pasangan: SAMPIRAN[cakupan[0]][0],
    tema: cakupan[0],
  };
  let skorTerbaik = -1;
  for (const t of cakupan) {
    for (const pasangan of SAMPIRAN[t]) {
      const skor = skorPasangan(pasangan, isi);
      if (skor > skorTerbaik) {
        skorTerbaik = skor;
        pemenang = { pasangan, tema: t };
      }
    }
  }
  const sampiran: [string, string] = [pemenang.pasangan[0], pemenang.pasangan[1]];
  return {
    sampiran,
    isi: [isi[0], isi[1]],
    teks: [sampiran[0], sampiran[1], isi[0], isi[1]].join('\n'),
    kecocokanRima: bulatkan2(skorTerbaik),
    tema: pemenang.tema,
  };
}

/**
 * Satu pasangan sampiran acak dari bank data (tema acak bila tidak diberikan).
 */
export function acakSampiran(tema?: Tema): [string, string] {
  const t = tema ?? acakDari(SEMUA_TEMA);
  const pasangan = acakDari(SAMPIRAN[t]);
  return [pasangan[0], pasangan[1]];
}

/**
 * Satu pantun lengkap: sampiran diambil acak, lalu isi dipilih yang rimanya
 * paling nyambung dengan sampiran itu. Sengaja tidak "isi acak murni":
 * pantun acak yang rima silangnya berantakan bukan pantun yang benar,
 * dan package ini menolak menghasilkan yang seperti itu.
 */
export function acakPantun(tema?: Tema): PantunDibuat {
  const t = tema ?? acakDari(SEMUA_TEMA);
  const sampiran = acakDari(SAMPIRAN[t]);
  // Acak urutan kandidat dulu supaya seri skor tidak selalu menang yang sama.
  const kandidat = [...ISI[t]].sort(() => Math.random() - 0.5);
  let isiTerbaik = kandidat[0];
  let skorTerbaik = -1;
  for (const isi of kandidat) {
    const skor = skorPasangan(sampiran, isi);
    if (skor > skorTerbaik) {
      skorTerbaik = skor;
      isiTerbaik = isi;
    }
  }
  const sampiranOut: [string, string] = [sampiran[0], sampiran[1]];
  const isiOut: [string, string] = [isiTerbaik[0], isiTerbaik[1]];
  return {
    sampiran: sampiranOut,
    isi: isiOut,
    teks: [sampiranOut[0], sampiranOut[1], isiOut[0], isiOut[1]].join('\n'),
    kecocokanRima: bulatkan2(skorTerbaik),
    tema: t,
  };
}
