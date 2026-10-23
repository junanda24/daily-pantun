# Tasks — `pantun` v1.0.0

- [ ] 1. Scaffold: `package.json` (name `pantun`, v1.0.0, MIT, exports ESM+CJS,
  bin, files, scripts), `tsconfig.json` + `tsconfig.cjs.json`, `.gitignore`
  (.env*, *.pem, *.key, credentials*), `LICENSE` (MIT), `CHANGELOG.md`.
- [ ] 2. `src/sukuKata.ts`: `hitungSukuKata`, `ekstrakSukuAkhir` (pure, tanpa dep).
- [ ] 3. `src/rima.ts`: `skorRima`, `berima` (dep: sukuKata).
- [ ] 4. `src/cek.ts`: `cekPantun` + tipe `HasilCek`/`Masalah`/`RincianBaris`/
  `RincianRima` (dep: sukuKata, rima).
- [ ] 5. `src/data/sampiran.ts` + `src/data/isi.ts`: bank original, 6 tema,
  8 sampiran & 8 isi per tema, rima internal a-a + rima silang 1:1 setema.
- [ ] 6. `src/generator.ts`: `buatPantun`, `acakPantun`, `acakSampiran`,
  `daftarTema` + tipe `Tema`, `PantunDibuat` (dep: rima, data).
- [ ] 7. `src/index.ts`: public API + export tipe.
- [ ] 8. `src/cli.ts`: subcommand cek/acak/buat/suku, stdin fallback, error
  Bahasa Indonesia, exit code benar.
- [ ] 9. Test (4 file): SHALL-10 — semua skenario, `npm test` hijau.
- [ ] 10. `README.md` lengkap (SHALL-11) + contoh kode yang benar-benar jalan.
- [ ] 11. Verify: `npm test` hijau, `npm pack --dry-run` sukses, install dari
  tarball di folder terpisah dan coba API + CLI, trace SHALL-01..11 → kode.
- [ ] 12. Archive openspec + git init/commit + buat repo `junanda24/daily-pantun`
  + push + verifikasi via API + catat BUILT.md + update profile README.
