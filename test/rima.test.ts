import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { skorRima, berima } from '../src/rima.js';

describe('skorRima', () => {
  it('1.0 bila suku kata akhir sama persis', () => {
    assert.equal(skorRima('kapal karam tenggelam', 'menyelam makin dalam'), 1);
  });

  it('0.7 bila dua huruf terakhir sama', () => {
    assert.equal(skorRima('pergi makan', 'berjalan-jalan'), 0.7);
  });

  it('0.4 bila satu huruf terakhir sama', () => {
    assert.equal(skorRima('anak lari', 'bangun pagi'), 0.4);
  });

  it('0 bila tidak ada kecocokan', () => {
    assert.equal(skorRima('pergi makan', 'langit biru'), 0);
  });

  it('0 bila salah satu baris kosong', () => {
    assert.equal(skorRima('', 'langit biru'), 0);
    assert.equal(skorRima('langit biru', ''), 0);
  });

  it('perbandingan case-insensitive', () => {
    assert.equal(skorRima('PERGI MAKAN', 'Berjalan-Jalan'), 0.7);
  });
});

describe('berima', () => {
  it('true bila skor >= 0.7', () => {
    assert.equal(berima('kapal karam tenggelam', 'menyelam makin dalam'), true);
    assert.equal(berima('pergi makan', 'berjalan-jalan'), true);
  });

  it('false bila skor < 0.7', () => {
    assert.equal(berima('anak lari', 'bangun pagi'), false);
    assert.equal(berima('pergi makan', 'langit biru'), false);
  });
});
