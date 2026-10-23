import type { Tema } from '../generator.js';

/**
 * Bank isi (dua baris pesan pantun) per tema.
 * Seluruh baris original, ditulis untuk package ini.
 * Tiap pasangan berima internal (a-a); rima silangnya dicocokkan 1:1
 * dengan pasangan sampiran setema (lihat verifikasi bank.test.ts).
 *
 * Dua pengecualian sadar (near-rhyme 0.7, bukan 1.0) karena tidak ada kata
 * Indonesia lain dengan suku akhir persis "hdu"/"njauh":
 * cinta#3 "rindu" (vs "syahdu") dan perpisahan#1 "teguh" (vs "menjauh").
 * Kata akhir yang berbeda dinilai lebih baik daripada pengulangan kata.
 */
export const ISI: Record<Tema, [string, string][]> = {
  pembuka: [
    ['Sambut acara yang kini terkarang', 'Dengan tekad yang bulat dan matang'],
    ['Songsong pagi tegak mandiri', 'Mengejar mimpi terus berlari'],
    ['Kita berkumpul laksana rumpun serai', 'Hadirin gagah bagai singa bersurai'],
    ['Sejenak kita merenung', 'Acara sarat makna yang dikandung'],
    ['Hati gembira sungguh terasa puas', 'Panji acara pun ikut mengibas'],
    ['Tampil percaya diri dan gagah', 'Pemuda harapan rajin berkuliah'],
    ['Niat suci sejernih air terjernih', 'Terima kasih untuk para pembersih'],
    ['Melangkah pasti jangan sampai silap', 'Masa depan cerah gemilang berkilap'],
  ],
  nasihat: [
    ['Nasib baik datang terkadang', 'Jangan menyerah sebelum matang'],
    ['Ilmu yang dalam jangan sampai terkubur', 'Jadilah insan pemakmur'],
    ['Pernahkah engkau bertanya siapakah', 'Hiduplah menjadi sebuah markah'],
    ['Tajam tekad laksana mata panah', 'Segala lelah terbayar telah'],
    ['Berani mengakui salah', 'Jangan sampai dikuasai marah'],
    ['Hati yang baik laksana taman berbunga', 'Tutur kata yang santun harus dijaga'],
    ['Kemalasan putuskan rantai', 'Masa depan cerah akan terurai'],
    ['Nasihat ibu yang paling tersyahdu', 'Simpan di hati sebagai yang termerdu'],
  ],
  cinta: [
    ['Namamu hadir dalam setiap kenang', 'Waktu berlalu, rasa tetap matang'],
    ['Badai datang, cintaku takkan mati', 'Selamanya dirimu yang kunanti'],
    ['Kita melangkah menuju janji nikah', 'Dua hati menyatu dalam syirkah'],
    ['Biar dunia tahu aku rindu', 'Menjagamu bagai lentera di gardu'],
    ['Rindu ini kian hari kian berat', 'Namun cintaku padamu tetap erat'],
    ['Bersamamu hidup terasa berseri', 'Takkan kulepas genggaman jemari'],
    ['Di bawah langit malam yang berangin', 'Kudekap erat tubuhmu yang dingin'],
    ['Cintaku seluas samudra dalam', 'Kirimkan salam rindu yang mendalam'],
  ],
  lucu: [
    ['Perutnya buncit tapi tetap segar', 'Makan lima piring hatinya tegar'],
    ['Telat bangun, malu tak terkendali', 'Sambil ngupil, ia nyanyi tak peduli'],
    ['Ternyata ia pandai gaya renang', 'Sambil tertawa ia pun pulang'],
    ['Kodoknya kaget lalu menjerit', 'Untung ekornya cuma kejepit'],
    ['Kutunya pesta sampai menyala', 'Katanya kutu juga perlu dibela'],
    ['Suaranya bikin kuping jadi biru', 'Pemiliknya malah sibuk berburu'],
    ['Sok selebriti di tengah acara', 'Penonton ngakak tak henti sementara'],
    ['Kambingnya doyan makan nasi padang', 'Sampai lupa pulang saking sayang'],
  ],
  perpisahan: [
    ['Semoga hatimu tetap teguh', 'Biar hati ini tetap patuh'],
    ['Terbanglah jauh ke seberang lautan', 'Selamat jalan di setiap jalanan'],
    ['Bagai daun luruh berhamburan', 'Iringi doa tiap kepergian'],
    ['Pendam rindu dalam-dalam', 'Menemani sepi setiap malam'],
    ['Jadikan rindu sebuah rantai', 'Sampai jumpa, kita kan berlambai'],
    ['Berat melangkah penuh jerih', 'Kenangan pahit laksana sirih'],
    ['Air mata jatuh tak terasa', 'Doa kami pada Yang Kuasa'],
    ['Semoga doa jadi pelabuhan', 'Namamu abadi dalam angan'],
  ],
  semangat: [
    ['Asa dan mimpi siap dijemur', 'Semangatmu tak terukur'],
    ['Hadapi tantangan dan berperang', 'Masa depan kan gemilang'],
    ['Kepakkan sayap penuh kuasa', 'Jadilah pribadi luar biasa'],
    ['Mulai langkahmu dari sekarang', 'Berjuanglah dengan tenang'],
    ['Percaya diri gapai jaya', 'Langkah mantap penuh daya'],
    ['Fokus pada tujuan yang tepat', 'Usahamu berbuah lebat'],
    ['Arus deras terus menghilir', 'Cahaya harapan di balik kelir'],
    ['Dongak ke atas, bukan ke bawah', 'Tancapkan tekad pada markah'],
  ],
};
