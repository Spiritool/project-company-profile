-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 15, 2025 at 01:04 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `company_profile`
--

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `id_album` int NOT NULL,
  `nama_album` varchar(255) NOT NULL,
  `jenis_album` enum('perkumpulan','ramadhan','pelatihan','acara') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `deskripsi_album` varchar(255) NOT NULL,
  `gambar_album` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`id_album`, `nama_album`, `jenis_album`, `deskripsi_album`, `gambar_album`) VALUES
(2, 'Pelatihan Damkar', 'pelatihan', 'Pelatihan RSI Garam oleh Pemadam Kebakaran', '1734069002096.jpg'),
(3, 'Pelaksanaan Acara', 'acara', 'Pelaksanaan acara rapat RSI Garam Kalianget', '1734069207687.jpg'),
(4, 'Gathering Tokoh Umum', 'perkumpulan', 'Gathering Tokoh Umum di RSI Garam Kalianget', '1734068872076.jpg'),
(5, 'Buka bersama', 'ramadhan', 'Buka bersama di masjid', '1734068694898.jpg'),
(6, 'Bakti Sosial', 'perkumpulan', 'Perkumpulan bakti sosial RSI Garam Kalianget', '1734068655223.jpg'),
(7, 'Bagi Takjil', 'ramadhan', 'Ini adalah momen di mana saat  ramadhan ada pembagian takjil\r\n', '1734068557488.jpg'),
(8, 'Pelatihan Internal', 'pelatihan', 'Pelatihan internal di RSI Garam Kalianget', '1734069053706.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `berita`
--

CREATE TABLE `berita` (
  `id_berita` int NOT NULL,
  `nama_berita` varchar(255) NOT NULL,
  `deskripsi_berita` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gambar_berita` varchar(255) NOT NULL,
  `tanggal_upload` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `berita`
--

INSERT INTO `berita` (`id_berita`, `nama_berita`, `deskripsi_berita`, `gambar_berita`, `tanggal_upload`) VALUES
(8, 'Manga Dungeon Meshi', 'Ksatria petualang Laios Touden memimpin sekelompok kecil melalui ruang bawah tanah yang tampaknya tak berujung, labirin bawah tanah yang penuh dengan monster berbahaya dan jebakan berbahaya. Melalui penggunaan sihir tingkat lanjut, seorang penjelajah terkadang dapat dibangkitkan, yang memungkinkan mereka untuk belajar dari kesalahan masa lalu dan mencoba menjelajahi ruang bawah tanah itu lagi. Namun, ketika seekor naga yang kuat memakan Falin, saudara perempuan Laios yang dapat merapal mantra, dia mengirim saudara laki-lakinya dan teman-temannya kembali ke awal untuk menyelamatkan mereka dari akhir yang permanen.\r\n\r\nMeskipun kekurangan uang dan peralatan, Laios memutuskan untuk berjuang melewati ruang bawah tanah dan menyelamatkan Falin sebelum dia dapat dicerna oleh naga itu. Meskipun beberapa sekutu Laios meninggalkannya, dua orang tetap berada di sisinya: penyihir elf Marcille Donato dan tukang kunci halfling Chilchuck Tims. Karena kekurangan dana, kelompok itu menghadapi prospek yang menakutkan untuk kelaparan sebelum dapat menyelesaikan misi mereka. Namun, mereka menemukan keselamatan di Senshi, seorang prajurit kurcaci dengan kegemaran memasak dan memakan monster yang kalah dengan aman.\r\n\r\nDengan keahlian kuliner Senshi, Laios dan teman-temannya berjuang melewati ruang bawah tanah sambil belajar tentang kuliner lezat—dan satu sama lain—di sepanjang perjalanan.', '1733810523519.jpg', '2024-12-10 06:02:03'),
(9, 'Daftar penyakit yang bikin BPJSTekor', 'Menteri Kesehatan Budi Gunadi Sadikin mengungkapkan penyakit yang membebani BPJS Kesehatan. Posisi pertama ditempati biaya untuk perawatan penyakit jantung kemudian stroke. Posisi ketiga pembiayaan terbesar adalah perawatan kanker.\r\n\"Kemudian kanker nomor tiga,\" ucapnya saat ditemui di RS Kanker Dharmais, Jakarta Barat, Jumat (3/3/2023).\r\n\r\nAdapun total biaya yang ditanggung BPJS Kesehatan untuk penyakit jantung dikatakan Menkes mencapai Rp 9 triliun. Sementara penyakit kanker sekitar dua sampai tiga triliun', '1734070312164.jpg', '2024-12-13 06:11:52'),
(10, 'Hal yang perlu diperhatikan oleh penderita Ginjal', 'Penderita ginjal perlu memperhatikan beberapa hal, di antaranya:\r\nPola makan: Hindari makanan tinggi garam, gula, dan lemak jenuh. Makanan olahan, makanan kaleng, saus, dan kecap juga perlu dibatasi karena umumnya mengandung garam yang tinggi. Sebaiknya, konsumsi garam tidak lebih dari 2.300 miligram atau sekitar satu sendok teh per hari. \r\nMinum air putih: Minum air putih yang cukup, yaitu sekitar delapan gelas atau dua liter per hari. \r\nBerat badan: Jaga berat badan dengan diet. \r\nTekanan darah: Jaga tekanan darah tetap stabil. \r\nObat dan suplemen: Konsumsi obat dan suplemen sesuai anjuran dokter. \r\nOlahraga: Berolahraga secara rutin. \r\nMerokok dan alkohol: Hindari merokok dan konsumsi alkohol berlebihan. \r\nFaktor risiko gangguan jantung: Kontrol ketat faktor risiko gangguan jantung, seperti diabetes dan kolesterol tinggi. ', '1734070443128.jpg', '2024-12-13 06:14:03'),
(11, 'Pentingnya Antibiotik', 'Antibiotik adalah obat yang digunakan untuk mengobati infeksi bakteri. Obat ini idealnya hanya boleh digunakan sesuai resep dan petunjuk dokter. Jika obat ini dikonsumsi sembarangan, penggunaannya bukan hanya menjadi tidak efektif, melainkan bisa berbahaya bagi kesehatan.\r\n\r\nObat antibiotik hanya efektif untuk mengobati infeksi bakteri, sehingga tidak bisa digunakan untuk mengatasi infeksi virus, jamur, atau cacing. Saat obat ini diresepkan, Anda perlu mengonsumsinya sampai habis atau sesuai anjuran dokter.', '1734070510773.jpg', '2024-12-13 06:15:10'),
(12, 'Penyebab Utama Kita Pikun', 'Masyarakat awam menganggap pikun sebagai hal yang wajar dialami oleh lansia akibat pertambahan usia. Padahal, pikun bisa saja disebabkan oleh demensia dan perlu segera diberikan penanganan. Yuk, simak pembahasan seputar pikun berikut ini.\r\n\r\nPikun umumnya diartikan sebagai kondisi berkurangnya daya ingat atau memori. Pikun kerap kali diidentikan sebagai efek penuaan. Hal ini karena kemampuan mengingat dan memproses sesuatu memang berkurang secara bertahap dari waktu ke waktu. Namun, tidak semua orang tua akan akan mengalami pikun.', '1734070553045.jpg', '2024-12-13 06:15:53');

-- --------------------------------------------------------

--
-- Table structure for table `buku`
--

CREATE TABLE `buku` (
  `id_buku` int NOT NULL,
  `nama_buku` varchar(255) NOT NULL,
  `deskripsi_buku` varchar(255) NOT NULL,
  `gambar_buku` varchar(255) NOT NULL,
  `file_buku` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `buku`
--

INSERT INTO `buku` (`id_buku`, `nama_buku`, `deskripsi_buku`, `gambar_buku`, `file_buku`) VALUES
(7, 'Say No to HIV!!', 'Buku ini tentang bahayanya HIV ', '1734069740134.jpg', '1734069740135.pdf'),
(8, 'Kesehatan Mental Remaja', 'Kesehatan mental remaja perlu dijaga dengan baik', '1734069839762.jpg', '1734069839763.pdf'),
(9, 'Health Care', 'Buku yang memberitahukan seberapa pentingnya menjaga kesehatan', '1734069929867.jpg', '1734069929868.docx');

-- --------------------------------------------------------

--
-- Table structure for table `dokter`
--

CREATE TABLE `dokter` (
  `id_dokter` int NOT NULL,
  `nama_dokter` varchar(255) NOT NULL,
  `no_hp` varchar(13) NOT NULL,
  `alamat_dokter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_keahlian` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gambar_dokter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dokter`
--

INSERT INTO `dokter` (`id_dokter`, `nama_dokter`, `no_hp`, `alamat_dokter`, `id_keahlian`, `gambar_dokter`) VALUES
(8, 'Dr. H Utomo', '0947223632322', 'Batuan', '6', '1730960836624.jpg'),
(10, 'Dr. Arya Rasyi', '082332761532', 'Pabian', '10', '1730960766953.jpg'),
(11, 'Dr, Budi Herlambang', '0882341241232', 'Sumenep', '11', '1730960750918.jpeg'),
(12, 'Dr. Fajar Harini', '0984837432', 'Batuan', '11', '1730961034811.jpg'),
(13, 'Dr. Fazarrahmah', '0947223632322', 'Kalianget', '11', '1730961084483.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `jadwal`
--

CREATE TABLE `jadwal` (
  `id_jadwal` int NOT NULL,
  `id_dokter` int NOT NULL,
  `senin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `selasa` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `rabu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `kamis` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `jumat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sabtu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `minggu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jadwal`
--

INSERT INTO `jadwal` (`id_jadwal`, `id_dokter`, `senin`, `selasa`, `rabu`, `kamis`, `jumat`, `sabtu`, `minggu`) VALUES
(81, 10, '07:30 - 15:00', '-', '09:00', '-', '08:40', '-', '-'),
(82, 11, '07:30 - 14:00', '-', '09:00', '08:30', '10:30', '-', '-');

--
-- Triggers `jadwal`
--
DELIMITER $$
CREATE TRIGGER `set_default_days_insert` BEFORE INSERT ON `jadwal` FOR EACH ROW BEGIN
    IF NEW.senin = '' THEN
        SET NEW.senin = '-';
    END IF;
    IF NEW.selasa = '' THEN
        SET NEW.selasa = '-';
    END IF;
    IF NEW.rabu = '' THEN
        SET NEW.rabu = '-';
    END IF;
    IF NEW.kamis = '' THEN
        SET NEW.kamis = '-';
    END IF;
    IF NEW.jumat = '' THEN
        SET NEW.jumat = '-';
    END IF;
    IF NEW.sabtu = '' THEN
        SET NEW.sabtu = '-';
    END IF;
    IF NEW.minggu = '' THEN
        SET NEW.minggu = '-';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `keahlian`
--

CREATE TABLE `keahlian` (
  `id_keahlian` int NOT NULL,
  `keahlian` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `keahlian`
--

INSERT INTO `keahlian` (`id_keahlian`, `keahlian`) VALUES
(6, 'Spesialis Gizi'),
(10, 'Spesilis Mata'),
(11, 'Spesialis Umum');

-- --------------------------------------------------------

--
-- Table structure for table `layanan`
--

CREATE TABLE `layanan` (
  `id_layanan` int NOT NULL,
  `nama_layanan` varchar(255) NOT NULL,
  `subnama_layanan` varchar(255) NOT NULL,
  `deskripsi_layanan` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gambar_layanan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `layanan`
--

INSERT INTO `layanan` (`id_layanan`, `nama_layanan`, `subnama_layanan`, `deskripsi_layanan`, `gambar_layanan`) VALUES
(3, 'Rawat Inap', 'Ruang Shofa (VIP)', 'Ruang rawat inap adalah ruang tempat pasien dirawat. Ruangan ini dulunya sering hanya berupa bangsal yang dihuni oleh banyak orang sekaligus. Saat ini, ruang rawat inap di banyak rumah sakit sudah sangat mirip dengan kamar-kamar hotel.', '1730962371303.jpg'),
(4, 'IGD 24 Jam', 'Instalasi Gawat Darurat', 'Instalasi Emergensi/Instalasi Gawat Darurat (IGD) adalah salah satu bagian di dalam sebuah rumah sakit yang menyediakan penanganan awal bagi pasien yang menderita sakit dan cedera, yang dapat mengancam kelangsungan hidupnya. Di IGD terdapat dokter dari berbagai spesialisasi bersama sejumlah perawat dan dokter jaga', '1730962697610.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_users` int NOT NULL,
  `nama_users` varchar(255) NOT NULL,
  `alamat_users` varchar(255) NOT NULL,
  `no_telp_users` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email_users` varchar(255) NOT NULL,
  `password_users` varchar(255) NOT NULL,
  `gambar_users` varchar(255) NOT NULL,
  `level_users` enum('1','2') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `nama_users`, `alamat_users`, `no_telp_users`, `email_users`, `password_users`, `gambar_users`, `level_users`) VALUES
(1, 'Shobri', 'Sumenep', '08995744932', 'shobri45@gmail.com', '$2b$10$3NP88wQK1mM4k/E3jItdue9OPV8xWdJUOa61R7cYKcIS8Bc/3AQ0e', '1721699570340.jpeg', '1'),
(2, 'Raihan Gaming', 'Talango', '0823782373', 'shobri45@gmail.com', '$2b$10$jxX58wMLraxwporO6G4bNeRv8wkQNIdoJe1G640THyBY4gAM9/zE2', '1722061430472.jpg', '1'),
(3, 'Aldy Hari Putra', 'Sumenep', '09987343231', 'aldy86@gmail.com', '$2b$10$RH9N7iK6kYOs/lTunkYFcOJDnuuRS/9JXfCbkyovej0tYqyOT/TmS', '1722061639346.jpg', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id_album`);

--
-- Indexes for table `berita`
--
ALTER TABLE `berita`
  ADD PRIMARY KEY (`id_berita`),
  ADD UNIQUE KEY `nama_berita` (`nama_berita`);

--
-- Indexes for table `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id_buku`);

--
-- Indexes for table `dokter`
--
ALTER TABLE `dokter`
  ADD PRIMARY KEY (`id_dokter`),
  ADD KEY `keahlian_dokter` (`id_keahlian`);

--
-- Indexes for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD PRIMARY KEY (`id_jadwal`),
  ADD KEY `id_dokter` (`id_dokter`);

--
-- Indexes for table `keahlian`
--
ALTER TABLE `keahlian`
  ADD PRIMARY KEY (`id_keahlian`);

--
-- Indexes for table `layanan`
--
ALTER TABLE `layanan`
  ADD PRIMARY KEY (`id_layanan`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `album`
--
ALTER TABLE `album`
  MODIFY `id_album` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `berita`
--
ALTER TABLE `berita`
  MODIFY `id_berita` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `buku`
--
ALTER TABLE `buku`
  MODIFY `id_buku` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `dokter`
--
ALTER TABLE `dokter`
  MODIFY `id_dokter` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `jadwal`
--
ALTER TABLE `jadwal`
  MODIFY `id_jadwal` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `keahlian`
--
ALTER TABLE `keahlian`
  MODIFY `id_keahlian` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `layanan`
--
ALTER TABLE `layanan`
  MODIFY `id_layanan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
