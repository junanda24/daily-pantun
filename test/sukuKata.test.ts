import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { hitungSukuKata, ekstrakSukuAkhir } from '../src/sukuKata.js';

describe('hitungSukuKata', () => {
  it('menghitung gugus vokal tiap kata', () => {
    assert.equal(hitungSukuKata('jalan jalan'), 4);
    assert.equal(hitungSukuKata('tenggelam'), 3);
  });

  it('diftong ai/au/oi dihitung satu suku kata', () => {
    assert.equal(hitungSukuKata('pulau'), 2);
    assert.equal(hitungSukuKata('pantai'), 2);
    assert.equal(hitungSukuKata('kalau'), 2);
  });

  it('vokal berurutan selain diftong dipecah dua', () => {
    assert.equal(hitungSukuKata('dia'), 2);
    assert.equal(hitungSukuKata('buah'), 2);
    assert.equal(hitungSukuKata('seekor'), 3);
  });

  it('teks kosong mengembalikan 0', () => {
    assert.equal(hitungSukuKata(''), 0);
    assert.equal(hitungSukuKata('   '), 0);
  });
});

describe('ekstrakSukuAkhir', () => {
  it('mengambil suku kata terakhir yang sebenarnya', () => {
    assert.equal(ekstrakSukuAkhir('tenggelam'), 'lam');
    assert.equal(ekstrakSukuAkhir('biru'), 'ru');
    assert.equal(ekstrakSukuAkhir('dalam'), 'lam');
  });

  it('kata satu suku kata dikembalikan utuh', () => {
    assert.equal(ekstrakSukuAkhir('lah'), 'lah');
  });

  it('kata kosong mengembalikan string kosong', () => {
    assert.equal(ekstrakSukuAkhir(''), '');
  });
});
