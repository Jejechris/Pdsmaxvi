# 🚀 Quick Start - Email Scheduler

## ⚡ Setup dalam 10 Menit!

### Web App dengan Spreadsheet - Advanced Solution

UI cantik dengan backend terstruktur. Data tersimpan di Google Spreadsheet.

---

## 📋 Langkah Setup:

### 1. Buat Google Spreadsheet
1. Buka [Google Sheets](https://sheets.google.com)
2. Klik **+ Blank** (buat spreadsheet baru)
3. Beri nama: **"Email Scheduler"**

### 2. Buka Apps Script dari Spreadsheet
1. Di Spreadsheet, klik menu **Extensions** → **Apps Script**
2. Akan terbuka Apps Script Editor
3. **Delete semua kode default** yang ada

### 3. Copy File Code.gs
1. **Copy seluruh isi file `Code.gs`** (backend script)
2. **Paste** ke Apps Script Editor
3. **Save** (Ctrl+S atau ikon disk 💾)

### 4. Tambah File WebApp.html
1. Di Apps Script Editor, klik **+** di sebelah "Files"
2. Pilih **HTML**
3. Beri nama: **WebApp** (tanpa .html)
4. **Copy seluruh isi file `WebApp.html`**
5. **Paste** ke file HTML ini
6. **Save** (Ctrl+S)

### 5. Setup Trigger Otomatis
1. Di Apps Script Editor, pilih function **`setupTrigger`** dari dropdown
2. Klik **Run** (▶️)
3. **Allow permissions** jika muncul popup:
   - Klik **Review Permissions**
   - Pilih akun Google Anda
   - Klik **Advanced** → **Go to Email Scheduler (unsafe)**
   - Klik **Allow**
4. Tunggu sampai selesai ✅

### 6. Deploy Web App
1. Klik **Deploy** → **New deployment**
2. Klik ⚙️ di sebelah **"Select type"** → pilih **Web app**
3. **PENTING** - Setting:
   - **Description**: Email Scheduler v1
   - **Execute as**: **Me (your_email@gmail.com)**
   - **Who has access**: **Anyone**
4. Klik **Deploy**
5. Klik **Authorize access** jika diminta
6. **Copy Web App URL** yang muncul
7. Selesai! 🎉

### 7. Buka Web App
1. Paste URL di browser baru
2. Aplikasi siap digunakan!
3. **Bookmark URL** untuk akses cepat

---

## ✉️ Cara Jadwalkan Email:

### Via Web App (Mudah!)
1. Buka **Web App URL** yang sudah Anda copy
2. Isi form:
   - **Email Tujuan**: contoh@gmail.com
   - **Subject**: Subject email Anda
   - **Pesan**: Isi pesan yang ingin dikirim
3. **Pilih waktu** dengan klik quick button:
   - 10 menit, 1 jam, 6 jam, 1 hari
   - 1 minggu, 1 bulan, **1 tahun**
   - Atau klik "Custom" untuk pilih tanggal spesifik
4. Klik **🚀 Jadwalkan Email**
5. Klik **📋 Lihat Email Terjadwal** untuk lihat daftar

### Via Script Manual (Advanced)
1. Di Apps Script, pilih function **`testScheduleEmail`**
2. Klik **Run**
3. Email test akan dijadwalkan 1 jam dari sekarang
4. Pilih **`viewScheduledEmails`** → **Run** untuk lihat di Logs

---

## 🎯 Fitur Web App:

### Quick Buttons
- **10 menit** - Kirim segera (testing)
- **1 jam** - Reminder cepat
- **6 jam** - Reminder hari ini
- **1 hari** - Reminder besok
- **1 minggu** - Follow-up mingguan
- **1 bulan** - Reminder bulanan
- **1 tahun** - Reminder tahunan
- **Custom** - Pilih tanggal & waktu spesifik

### Status Email
- **Pending** 🟡 - Menunggu waktu kirim
- **Terkirim** 🟢 - Sudah terkirim
- **Error** 🔴 - Gagal kirim (cek log)

---

## 🔧 Troubleshooting:

### Web App tidak bisa dibuka?
- Pastikan setting deployment: "Who has access" = **Anyone**
- Clear browser cache (Ctrl+Shift+Delete)
- Coba buka di Incognito mode (Ctrl+Shift+N)

### Email tidak terkirim?
- Klik **📋 Lihat Email Terjadwal** di web app untuk cek status
- Di Apps Script: View → Executions untuk lihat log
- Run manual: pilih `checkAndSendEmails` → Run

### Trigger tidak jalan?
1. Apps Script → Klik ikon ⏰ (Triggers) di sidebar
2. Pastikan ada trigger `checkAndSendEmails` (runs every 10 minutes)
3. Jika tidak ada, run ulang function `setupTrigger`

### Error "Bad Request 400"?
- Re-deploy web app dengan version baru:
  - Deploy → Manage deployments
  - Edit → New version → Deploy

---

## 💡 Tips:

1. **Bookmark Web App**: Simpan URL di browser favorites
2. **Mobile Access**: Web app bisa dibuka di HP!
3. **Lihat History**: Klik "Lihat Email Terjadwal" untuk cek status
4. **Lihat Logs**: Apps Script → View → Executions untuk debug
5. **Cleanup Old Emails**: Run function `cleanupOldEmails` untuk hapus email lama (>1 bulan)

---

## 🎉 Selesai!

Email akan dicek dan dikirim otomatis setiap 10 menit!

**Tidak perlu browser terbuka, tidak perlu komputer menyala!** ☁️


