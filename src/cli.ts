#!/usr/bin/env node
/**
 * CLI `pantun`: cek / acak / buat / suku.
 * Zero dependency — parsing argv manual.
 */
import { cekPantun } from './cek.js';
import { hitungSukuKata } from './sukuKata.js';
import {
  acakPantun,
  buatPantun,
  daftarTema,
} from './generator.js';
import type { Tema } from './generator.js';

const VERSI = '1.0.0';

function bantuan(): string {
  return [
    `pantun v${VERSI} — validator & generator pantun Bahasa Indonesia`,
    '',
    'Penggunaan:',
    '  pantun cek "<teks>"            Nilai sebuah teks sebagai pantun',
    '                                 (tanpa argumen: baca dari stdin)',
    '  pantun acak [--tema <tema>]    Tampilkan satu pantun acak',
    '  pantun buat --isi "a | b" [--tema <tema>]',
    '                                 Buatkan sampiran untuk 2 baris isi',
    '  pantun suku "<teks>"           Hitung suku kata sebuah teks',
    '',
    `Tema: ${daftarTema().join(', ')}`,
    '',
    'Contoh:',
    '  pantun acak --tema lucu',
    '  pantun buat --isi "Belajar rajin setiap hari | Agar cita-cita tercapai"',
    '  echo "Pagi hari pergi ke pasar" | pantun cek',
  ].join('\n');
}

function ambilFlag(args: string[], nama: string): string | undefined {
  const i = args.indexOf(`--${nama}`);
  if (i === -1 || i + 1 >= args.length) return undefined;
  return args[i + 1];
}

function pastikanTema(nilai: string | undefined): Tema | undefined {
  if (nilai === undefined) return undefined;
  if (!(daftarTema() as string[]).includes(nilai)) {
    console.error(
      `Tema "${nilai}" tidak dikenal. Pilihan: ${daftarTema().join(', ')}.`,
    );
    process.exit(1);
  }
  return nilai as Tema;
}

function bacaStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk: string) => {
      data += chunk;
    });
    process.stdin.on('end', () => resolve(data));
    process.stdin.on('error', reject);
  });
}

async function perintahCek(args: string[]): Promise<void> {
  let teks = args[0];
  if (teks === undefined) {
    if (process.stdin.isTTY) {
      console.error('Berikan teks pantun sebagai argumen atau lewat stdin.\n');
      console.error(bantuan());
      process.exit(1);
    }
    teks = await bacaStdin();
  }
  if (teks.trim() === '') {
    console.error('Teks kosong — tidak ada yang bisa dinilai.');
    process.exit(1);
  }
  const hasil = cekPantun(teks);
  console.log(`Nilai: ${hasil.nilai} (skor ${hasil.skor}/100)`);
  console.log('');
  hasil.baris.forEach((b, i) => {
    const status = b.sukuKataIdeal ? 'ideal' : 'di luar 8–12';
    console.log(`Baris ${i + 1} [${b.sukuKata} suku kata, ${status}]: ${b.teks}`);
  });
  console.log('');
  hasil.rima.forEach((r) => {
    const status = r.cocok ? 'cocok' : 'TIDAK cocok';
    console.log(`Rima baris ${r.pasangan}: ${status} (skor ${r.skor.toFixed(2)})`);
  });
  if (hasil.masalah.length === 0) {
    console.log('\nSelamat — ini pantun yang sempurna!');
  } else {
    console.log('\nMasalah:');
    hasil.masalah.forEach((m) => {
      const lokasi = m.baris > 0 ? `baris ${m.baris}` : 'umum';
      console.log(`- [${m.kode} · ${lokasi}] ${m.pesan}`);
    });
  }
}

function perintahAcak(args: string[]): void {
  const tema = pastikanTema(ambilFlag(args, 'tema'));
  const p = acakPantun(tema);
  console.log(p.teks);
  console.log(`\n(tema: ${p.tema} · kecocokan rima: ${p.kecocokanRima.toFixed(2)})`);
}

function perintahBuat(args: string[]): void {
  const isiFlag = ambilFlag(args, 'isi');
  if (isiFlag === undefined) {
    console.error('Wajib: --isi "baris 1 | baris 2" (dua baris isi, dipisah |).');
    process.exit(1);
  }
  const potong = isiFlag
    .split('|')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  if (potong.length !== 2) {
    console.error('Format --isi salah: berikan tepat 2 baris, dipisah tanda |.');
    process.exit(1);
  }
  const tema = pastikanTema(ambilFlag(args, 'tema'));
  const p = buatPantun([potong[0], potong[1]], tema ? { tema } : undefined);
  console.log(p.teks);
  console.log(
    `\n(tema sampiran: ${p.tema} · kecocokan rima: ${p.kecocokanRima.toFixed(2)})`,
  );
}

function perintahSuku(args: string[]): void {
  const teks = args[0];
  if (teks === undefined) {
    console.error('Berikan teks sebagai argumen.');
    process.exit(1);
  }
  console.log(`Jumlah suku kata: ${hitungSukuKata(teks)}`);
}

async function main(): Promise<void> {
  const [, , perintah, ...args] = process.argv;
  switch (perintah) {
    case 'cek':
      await perintahCek(args);
      break;
    case 'acak':
      perintahAcak(args);
      break;
    case 'buat':
      perintahBuat(args);
      break;
    case 'suku':
      perintahSuku(args);
      break;
    case '--help':
    case '-h':
    case undefined:
      console.log(bantuan());
      break;
    case '--version':
    case '-v':
      console.log(VERSI);
      break;
    default:
      console.error(`Perintah "${perintah}" tidak dikenal.\n`);
      console.error(bantuan());
      process.exit(1);
  }
}

main().catch((err: unknown) => {
  console.error('Terjadi kesalahan:', err instanceof Error ? err.message : err);
  process.exit(1);
});
