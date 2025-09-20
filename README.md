# Exam Maker - Admin & Candidate Portal

Aplikasi web untuk sistem ujian online dengan fitur admin dan candidate yang lengkap.

## 📁 Struktur File

```
Exam Maker/
├── index.html              # Dashboard utama
├── exam.html               # Halaman manajemen ujian
├── questions.html          # Bank soal
├── participants.html       # Manajemen peserta
├── proctoring.html         # Live proctoring
├── reports.html            # Laporan dan analitik
├── settings.html           # Pengaturan sistem
├── candidate.html          # Portal peserta ujian
├── css/
│   └── common.css          # CSS umum untuk semua halaman
├── js/
│   ├── common.js           # JavaScript umum
│   ├── exam.js             # JavaScript khusus halaman exam
│   ├── questions.js        # JavaScript khusus halaman questions
│   ├── participants.js     # JavaScript khusus halaman participants
│   ├── proctoring.js       # JavaScript khusus halaman proctoring
│   ├── reports.js          # JavaScript khusus halaman reports
│   ├── settings.js         # JavaScript khusus halaman settings
│   └── candidate.js        # JavaScript khusus halaman candidate
└── README.md               # Dokumentasi ini
```

## 🚀 Cara Menggunakan

1. **Buka file `index.html`** di browser untuk mengakses dashboard admin
2. **Navigasi** menggunakan sidebar untuk berpindah antar halaman
3. **Fitur Admin:**

   - Dashboard dengan statistik
   - Manajemen ujian dengan wizard 4 langkah
   - Bank soal dengan filter dan pencarian
   - Manajemen peserta dengan import CSV
   - Live proctoring dengan monitoring real-time
   - Laporan dan analitik
   - Pengaturan sistem

4. **Fitur Candidate:**
   - Akses melalui `candidate.html`
   - Pre-check webcam
   - Interface ujian dengan timer
   - Auto-save progress
   - Navigasi antar soal

## 🎨 Fitur Utama

### Admin Features

- **Dashboard**: Statistik lengkap dan tabel ujian terbaru
- **Manajemen Ujian**:
  - Wizard pembuatan ujian 4 langkah
  - Pengaturan proctoring dan keamanan
  - Editor soal terintegrasi
- **Bank Soal**:
  - Filter berdasarkan tipe, kesulitan, topik
  - Pencarian real-time
  - Bulk operations
- **Manajemen Peserta**:
  - Import CSV batch
  - Assignment ujian
  - Tracking progress
- **Live Proctoring**:
  - Monitoring real-time
  - Flagging system
  - Emergency controls
- **Laporan**: Filter dan export data
- **Pengaturan**: Konfigurasi sistem

### Candidate Features

- **Pre-check**: Verifikasi webcam dan persetujuan
- **Interface Ujian**:
  - Timer countdown dengan auto-submit
  - Navigasi soal yang mudah
  - Auto-save setiap 30 detik
  - Review jawaban

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **Bootstrap 5** - Framework CSS
- **Bootstrap Icons** - Icon set
- **Vanilla JavaScript** - Interaktivitas
- **localStorage** - Penyimpanan data sementara

## 📱 Responsive Design

Aplikasi ini fully responsive dan dapat diakses dari:

- Desktop
- Tablet
- Mobile phone

## 🔧 Kustomisasi

### Mengubah Warna Tema

Edit file `css/common.css` dan ubah variabel CSS:

```css
.sidebar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Menambah Halaman Baru

1. Buat file HTML baru
2. Copy struktur sidebar dari file existing
3. Buat file JS khusus untuk halaman tersebut
4. Include file JS di HTML

### Integrasi Backend

Ganti fungsi mock di `js/common.js` dengan API calls:

```javascript
// Contoh: Ganti mockExams dengan API call
async function loadExams() {
  const response = await fetch("/api/exams");
  return await response.json();
}
```

## 📊 Mock Data

Aplikasi menggunakan mock data yang dapat ditemukan di `js/common.js`:

- `mockExams` - Data ujian
- `mockQuestions` - Data soal
- `mockParticipants` - Data peserta

## 🔒 Keamanan

Untuk implementasi production, tambahkan:

- Autentikasi dan autorisasi
- Validasi server-side
- Enkripsi data sensitif
- Rate limiting
- CSRF protection

## 📈 Performance

- Lazy loading untuk halaman besar
- Debouncing untuk search
- Local caching untuk data
- Optimized images

## 🐛 Troubleshooting

### Webcam tidak berfungsi

- Pastikan browser mendukung getUserMedia
- Check permission webcam
- Gunakan HTTPS untuk production

### Data tidak tersimpan

- Check localStorage support
- Clear browser cache
- Check console untuk error

## 📝 Lisensi

Project ini dibuat untuk demonstrasi dan dapat digunakan untuk keperluan edukasi.

## 🤝 Kontribusi

Silakan fork dan submit pull request untuk perbaikan atau fitur baru.

## 📞 Support

Untuk pertanyaan atau bantuan, silakan buat issue di repository ini.
