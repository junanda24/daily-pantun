import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { SAMPIRAN } from '../src/data/sampiran.js';
import { ISI } from '../src/data/isi.js';
import { daftarTema } from '../src/generator.js';
import { hitungSukuKata } from '../src/sukuKata.js';
import { berima } from '../src/rima.js';

/**
 * Penjaga mutu bank data: SEMUA baris 8–12 suku kata, SEMUA pasangan
 * berima internal, tidak ada baris duplikat. Kalau puisi baru ditambahkan
 * dan melanggar aturan, test ini yang pertama protes.
 */
describe('bank data', () => {
  it('6 tema, 8 sampiran & 8 isi per tema', () => {
    assert.equal(daftarTema().length, 6);
    for (const t of daftarTema()) {
      assert.equal(SAMPIRAN[t].length, 8, `sampiran ${t}`);
      assert.equal(ISI[t].length, 8, `isi ${t}`);
    }
  });

  it('semua baris 8–12 suku kata', () => {
    for (const t of daftarTema()) {
      for (const [i, pasangan] of SAMPIRAN[t].entries()) {
        for (const [j, baris] of pasangan.entries()) {
          const n = hitungSukuKata(baris);
          assert.ok(
            n >= 8 && n <= 12,
            `sampiran ${t}#${i} baris ${j}: ${n} suku kata — "${baris}"`,
          );
        }
      }
      for (const [i, pasangan] of ISI[t].entries()) {
        for (const [j, baris] of pasangan.entries()) {
          const n = hitungSukuKata(baris);
          assert.ok(
            n >= 8 && n <= 12,
            `isi ${t}#${i} baris ${j}: ${n} suku kata — "${baris}"`,
          );
        }
      }
    }
  });

  it('semua pasangan berima internal (a-a)', () => {
    for (const t of daftarTema()) {
      for (const [i, pasangan] of SAMPIRAN[t].entries()) {
        assert.ok(
          berima(pasangan[0], pasangan[1]),
          `sampiran ${t}#${i} tidak berima: "${pasangan[0]}" / "${pasangan[1]}"`,
        );
      }
      for (const [i, pasangan] of ISI[t].entries()) {
        assert.ok(
          berima(pasangan[0], pasangan[1]),
          `isi ${t}#${i} tidak berima: "${pasangan[0]}" / "${pasangan[1]}"`,
        );
      }
    }
  });

  it('tidak ada baris yang duplikat', () => {
    const semua: string[] = [];
    for (const t of daftarTema()) {
      for (const pasangan of [...SAMPIRAN[t], ...ISI[t]]) {
        semua.push(...pasangan);
      }
    }
    const unik = new Set(semua.map((b) => b.toLowerCase()));
    assert.equal(unik.size, semua.length, 'ada baris duplikat di bank data');
  });
});
