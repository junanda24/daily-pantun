import type { Tema } from '../generator.js';

/**
 * Bank sampiran (dua baris pembuka pantun) per tema.
 * Seluruh baris original, ditulis untuk package ini.
 * Tiap pasangan berima internal (a-a).
 */
export const SAMPIRAN: Record<Tema, [string, string][]> = {
  pembuka: [
    ['Mentari pagi bersinar terang', 'Sambutan hangat bagi yang datang'],
    ['Embun pagi berkilau berseri', 'Kupu-kupu ikut menari'],
    ['Ombak pantai memecah berderai', 'Langkah semangat takkan terurai'],
    ['Kabut tipis menyelimuti gunung', 'Angin membawa aroma mendung'],
    ['Bunga mekar di taman yang luas', 'Harum semerbak tertiup angin bebas'],
    ['Langit biru membentang megah', 'Sambutan tulus menyambut meriah'],
    ['Sungai mengalir airnya jernih', 'Pagi yang cerah udara pun bersih'],
    ['Kunang-kunang terbang di gelap', 'Desa pun mulai terlelap'],
  ],
  nasihat: [
    ['Hujan turun membasahi ladang', 'Petani tersenyum menanti yang datang'],
    ['Pohon beringin tumbuh subur', 'Tempat berteduh yang sungguh makmur'],
    ['Melati putih sedang merekah', 'Harumnya membawa berkah'],
    ['Akar pohon menghunjam ke tanah', 'Daunnya rindang menaungi yang lelah'],
    ['Semut kecil tak kenal lelah', 'Memikul beban tak pernah menyerah'],
    ['Kumbang hinggap di kuntum bunga', 'Lebah pun datang mencari madu juga'],
    ['Ombak memecah di tepi pantai', 'Buih putihnya terbang berderai'],
    ['Bulan purnama bersinar syahdu', 'Bintang-bintang berkelip merdu'],
  ],
  cinta: [
    ['Senja merona di langit yang tenang', 'Bayang wajahmu selalu datang'],
    ['Bulan purnama menyinari hati', 'Rindu yang dalam selalu menanti'],
    ['Mawar merah sedang merekah', 'Kumbang datang membawa berkah'],
    ['Malam sunyi terasa syahdu', 'Bintang pun seakan ikut merdu'],
    ['Senja merona di ufuk barat', 'Burung pulang memberi isyarat'],
    ['Melati mekar di pagi hari', 'Kupu-kupu menari-nari'],
    ['Layar terkembang ditiup angin', 'Rasa di hati semakin ingin'],
    ['Bintang bertaburan di langit malam', 'Rembulan pun seakan tenggelam'],
  ],
  lucu: [
    ['Kucing oren tidur di atas pagar', 'Bangun tidur badannya bugar'],
    ['Ayam berkokok kencang sekali', 'Pemiliknya masih tidur kembali'],
    ['Bebek berenang di kolam tenang', 'Tiba-tiba saja ia menghilang'],
    ['Kodok hijau melompat di parit', 'Ekornya malah jadi terjepit'],
    ['Monyet menggaruk-garuk kepala', 'Ternyata kutunya sudah gila'],
    ['Burung beo pandai meniru', 'Tapi ucapannya selalu keliru'],
    ['Ikan mas bergaya depan kamera', 'Ekornya goyang tampak gembira'],
    ['Kambing makan rumput di ladang', 'Jenggotnya ikut bergoyang'],
  ],
  perpisahan: [
    ['Perahu kecil semakin menjauh', 'Air mata tak terasa jatuh'],
    ['Burung camar terbang ke selatan', 'Sayapnya lelah menempuh perjalanan'],
    ['Daun kering jatuh berguguran', 'Hati yang pilu menahan kerinduan'],
    ['Bulan redup tertutup awan kelam', 'Seakan ikut tenggelam'],
    ['Ombak surut meninggalkan pantai', 'Lambaian tangan semakin melambai'],
    ['Angin malam berdesah lirih', 'Seakan ikut merasa perih'],
    ['Kabut pagi menyelimuti desa', 'Suasana sunyi luar biasa'],
    ['Langkah kaki menjauh perlahan', 'Meninggalkan sejuta kenangan'],
  ],
  semangat: [
    ['Fajar menyingsing di ufuk timur', 'Sambut pagi dengan penuh syukur'],
    ['Ombak besar menghantam karang', 'Tetap berdiri tak terhalang'],
    ['Elang terbang menembus angkasa', 'Sayapnya kuat gagah perkasa'],
    ['Api unggun menyala terang', 'Pantang menyerah sebelum menang'],
    ['Mentari pagi memancarkan cahaya', 'Hari ini pasti akan berjaya'],
    ['Kuda pacu melesat cepat', 'Langkahnya mantap sungguh hebat'],
    ['Sungai deras mengalir ke hilir', 'Tak pernah berhenti mengalir'],
    ['Padi menguning di sawah', 'Siap dipanen penuh berkah'],
  ],
};
