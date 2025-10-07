# 🔥 Firebase Setup - Global Leaderboard

## Cara Setup Firebase untuk Leaderboard Realtime

### Step 1: Buat Project Firebase (5 menit)

1. **Buka Firebase Console**
   - Pergi ke: https://console.firebase.google.com/
   - Login dengan Google Account kamu

2. **Create New Project**
   - Klik "Add project" atau "Tambah project"
   - Nama project: `pdsmaxvi-quiz` (atau terserah)
   - Disable Google Analytics (opsional, tidak perlu untuk ini)
   - Klik "Create project"

### Step 2: Setup Realtime Database

1. **Di sidebar kiri, pilih: "Realtime Database"**

2. **Klik "Create Database"**

3. **Pilih lokasi:**
   - Asia Southeast (Singapore) - `asia-southeast1`
   - Atau pilih yang paling dekat dengan lokasi kamu

4. **Security Rules - Pilih "Start in TEST MODE"**
   - Ini akan aktif 30 hari (cukup untuk event perpisahan)
   - Nanti bisa diganti ke production rules

5. **Klik "Enable"**

### Step 3: Dapatkan Configuration Keys

1. **Di Firebase Console, klik icon ⚙️ (Settings) > Project settings**

2. **Scroll ke bawah, di bagian "Your apps"**
   - Klik icon `</>` (Web)
   - App nickname: `PDSMAXVI Quiz Web`
   - **JANGAN** centang Firebase Hosting
   - Klik "Register app"

3. **Copy Firebase Config**
   - Akan muncul kode seperti ini:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "pdsmaxvi-quiz.firebaseapp.com",
     databaseURL: "https://pdsmaxvi-quiz-default-rtdb.firebaseio.com",
     projectId: "pdsmaxvi-quiz",
     storageBucket: "pdsmaxvi-quiz.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:xxxxxxxxxxxxx"
   };
   ```

4. **Paste ke file `firebase-config.js`**
   - Buka file `firebase-config.js`
   - Ganti bagian ini dengan config kamu:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY_HERE",  // ← Ganti ini
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // ← dan ini
     // ... dst
   };
   ```

### Step 4: Setup Security Rules (Opsional tapi Recommended)

1. **Di Realtime Database Console, pilih tab "Rules"**

2. **Ganti rules dengan ini:**
   ```json
   {
     "rules": {
       "leaderboard": {
         ".read": true,
         ".write": true,
         "$entry": {
           ".validate": "newData.hasChildren(['name', 'score', 'timestamp'])"
         }
       }
     }
   }
   ```

3. **Klik "Publish"**

### Step 5: Test!

1. **Buka `quiz.html` di browser**
2. **Buka Console (F12)**
3. **Cari pesan:**
   - ✅ "Firebase initialized successfully!"
   - ✅ "Listening to Firebase leaderboard updates"

4. **Main quiz dan submit**
5. **Cek di Firebase Console > Realtime Database**
   - Harusnya muncul data baru di `/leaderboard`

---

## Troubleshooting

### Error: "Firebase SDK not loaded"
- Pastikan internet tersambung
- Firebase CDN ter-load dengan benar

### Error: "Permission denied"
- Cek Security Rules di Firebase Console
- Pastikan `.read` dan `.write` = `true` untuk testing

### Data tidak muncul
- Cek Console untuk error messages
- Pastikan `databaseURL` benar di config
- Cek di Firebase Console apakah data masuk

---

## Fitur yang Sudah Ditambahkan

✅ **Global Leaderboard** - Semua device share leaderboard yang sama
✅ **Realtime Updates** - Auto refresh saat ada score baru
✅ **Top 20 Display** - Menampilkan 20 skor tertinggi
✅ **Persistent Data** - Data tersimpan selamanya di cloud
✅ **Fallback to Local** - Jika Firebase gagal, pakai localStorage
✅ **Timestamp** - Setiap entry punya waktu submit

---

## Setelah Event Selesai

Jika sudah tidak dipakai, bisa:
1. Disable Realtime Database
2. Delete Firebase Project
3. Export data dulu kalau mau disimpan

---

**Butuh bantuan?** Check console error messages atau tanya lagi! 🔥

