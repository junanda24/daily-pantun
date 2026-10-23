import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { cekPantun } from '../src/cek.js';

const PANTUN_SEMPURNA = [
  'Pagi hari pergi ke pasar',
  'Membeli mangga yang sangat segar',
  'Jangan pernah berhenti belajar',
  'Agar hidup menjadi lebih tegar',
].join('\n');

describe('cekPantun', () => {
  it('pantun sempurna: valid, skor 100, nilai Sempurna', () => {
    const hasil = cekPantun(PANTUN_SEMPURNA);
    assert.equal(hasil.valid, true);
    assert.equal(hasil.skor, 100);
    assert.equal(hasil.nilai, 'Sempurna');
    assert.equal(hasil.masalah.length, 0);
    assert.equal(hasil.baris.length, 4);
    assert.deepEqual(
      hasil.rima.map((r) => r.cocok),
      [true, true],
    );
  });

  it('baris kurang dari 4: masalah jumlah-baris, skor dipotong 25', () => {
    const hasil = cekPantun(
      'Pagi hari pergi ke pasar\n' +
        'Membeli mangga yang sangat segar\n' +
        'Jangan pernah berhenti belajar',
    );
    assert.equal(hasil.valid, false);
    assert.ok(hasil.masalah.some((m) => m.kode === 'jumlah-baris'));
    assert.equal(hasil.skor, 75);
    assert.equal(hasil.nilai, 'Bagus');
  });

  it('baris dengan suku kata berlebih: masalah suku-kata, skor dipotong 8', () => {
    const teks = [
      'Pagi hari pergi ke pasar membeli ikan dan sayur untuk belajar',
      'Membeli mangga yang sangat segar',
      'Jangan pernah berhenti belajar',
      'Agar hidup menjadi lebih tegar',
    ].join('\n');
    const hasil = cekPantun(teks);
    const masalah = hasil.masalah.filter((m) => m.kode === 'suku-kata');
    assert.equal(masalah.length, 1);
    assert.equal(masalah[0].baris, 1);
    assert.match(masalah[0].pesan, /22 suku kata/);
    assert.equal(hasil.skor, 92);
  });

  it('rima rusak: masalah rima, skor dipotong 12 per pasangan', () => {
    const teks = [
      'Pagi hari pergi ke pasar',
      'Membeli mangga yang sangat segar',
      'Jangan pernah berhenti bermain',
      'Agar hidup menjadi lebih tegar',
    ].join('\n');
    const hasil = cekPantun(teks);
    const masalah = hasil.masalah.filter((m) => m.kode === 'rima');
    assert.equal(masalah.length, 1);
    assert.match(masalah[0].pesan, /1-3/);
    assert.equal(hasil.skor, 88);
    assert.equal(hasil.rima[0].cocok, false);
    assert.equal(hasil.rima[1].cocok, true);
  });

  it('skor tidak pernah negatif dan nilai terendah "Belum pantun"', () => {
    const hasil = cekPantun('a\nb\nc\nd\ne');
    assert.ok(hasil.skor >= 0);
    assert.equal(hasil.nilai, 'Belum pantun');
    assert.equal(hasil.valid, false);
  });

  it('rincian baris memuat teks dan jumlah suku kata', () => {
    const hasil = cekPantun(PANTUN_SEMPURNA);
    assert.equal(hasil.baris[0].teks, 'Pagi hari pergi ke pasar');
    assert.equal(hasil.baris[0].sukuKata, 9);
    assert.equal(hasil.baris[0].sukuKataIdeal, true);
  });
});
