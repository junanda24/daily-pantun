import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  acakPantun,
  acakSampiran,
  buatPantun,
  daftarTema,
} from '../src/generator.js';
import { SAMPIRAN } from '../src/data/sampiran.js';
import { skorRima } from '../src/rima.js';

describe('daftarTema', () => {
  it('mengembalikan keenam tema', () => {
    assert.deepEqual(daftarTema(), [
      'pembuka',
      'nasihat',
      'cinta',
      'lucu',
      'perpisahan',
      'semangat',
    ]);
  });
});

describe('acakSampiran', () => {
  it('mengembalikan satu pasangan dari tema yang diminta', () => {
    const pasangan = acakSampiran('cinta');
    assert.equal(pasangan.length, 2);
    assert.ok(SAMPIRAN.cinta.some((p) => p[0] === pasangan[0] && p[1] === pasangan[1]));
  });
});

describe('acakPantun', () => {
  it('struktur 2+2 baris dan tema valid', () => {
    const p = acakPantun();
    assert.equal(p.teks.split('\n').length, 4);
    assert.ok(daftarTema().includes(p.tema));
    assert.ok(p.kecocokanRima >= 0 && p.kecocokanRima <= 1);
  });

  it('menghormati tema yang diberikan', () => {
    const p = acakPantun('lucu');
    assert.equal(p.tema, 'lucu');
  });

  it('isi yang dipilih berima baik dengan sampiran', () => {
    // Karena isi dipilih yang paling nyambung, kecocokan rima acakPantun
    // mestinya tidak pernah 0 untuk bank yang sehat.
    for (let i = 0; i < 10; i += 1) {
      const p = acakPantun();
      assert.ok(p.kecocokanRima > 0, `kecocokan ${p.kecocokanRima}`);
    }
  });
});

describe('buatPantun', () => {
  const isi: [string, string] = [
    'Anak nelayan pergi melaut',
    'Membawa bekal nasi dan lauk',
  ];

  it('memilih sampiran dengan skor rima tertinggi', () => {
    const hasil = buatPantun(isi);
    let skorTerbaik = -1;
    let pasanganTerbaik: [string, string] | undefined;
    for (const t of daftarTema()) {
      for (const pasangan of SAMPIRAN[t]) {
        const skor =
          (skorRima(pasangan[0], isi[0]) + skorRima(pasangan[1], isi[1])) / 2;
        if (skor > skorTerbaik) {
          skorTerbaik = skor;
          pasanganTerbaik = pasangan;
        }
      }
    }
    assert.deepEqual(hasil.sampiran, pasanganTerbaik);
    assert.equal(hasil.kecocokanRima, Math.round(skorTerbaik * 100) / 100);
    assert.equal(hasil.teks, [...hasil.sampiran, ...isi].join('\n'));
  });

  it('membatasi pencarian ke tema yang diberikan', () => {
    const hasil = buatPantun(isi, { tema: 'lucu' });
    assert.equal(hasil.tema, 'lucu');
    assert.ok(
      SAMPIRAN.lucu.some(
        (p) => p[0] === hasil.sampiran[0] && p[1] === hasil.sampiran[1],
      ),
    );
  });

  it('deterministik untuk isi yang sama', () => {
    const a = buatPantun(isi);
    const b = buatPantun(isi);
    assert.deepEqual(a, b);
  });
});
