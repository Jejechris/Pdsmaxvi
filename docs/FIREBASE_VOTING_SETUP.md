# 🔥 Firebase Setup untuk Sistem Voting

## 📋 Overview

Tutorial ini akan memandu Anda untuk setup Firebase Realtime Database untuk sistem voting ketua dan wakil ketua PDSMAXVI.

---

## 🚀 Langkah 1: Buat Project Firebase

### 1.1 Buka Firebase Console
```
https://console.firebase.google.com/
```

### 1.2 Login dengan Google Account
- Gunakan akun Google yang sama dengan akun yang akan mengelola website

### 1.3 Buat Project Baru
```
1. Klik "Add project" / "Tambah project"
2. Nama project: pdsmaxvi-voting (atau nama lain yang Anda inginkan)
3. Disable Google Analytics (tidak perlu untuk voting)
4. Klik "Create project"
```

---

## 🗄️ Langkah 2: Setup Realtime Database

### 2.1 Aktifkan Realtime Database
```
1. Di sidebar kiri → "Realtime Database"
2. Klik "Create Database"
3. Pilih lokasi: Asia Southeast (Singapore)
4. Security rules: Pilih "Start in TEST MODE"
5. Klik "Enable"
```

### 2.2 Atur Security Rules (PENTING!)
```
1. Klik tab "Rules"
2. Ganti rules dengan:
```

```json
{
  "rules": {
    "votes": {
      ".read": true,
      ".write": true,
      "$userId": {
        ".validate": "newData.hasChildren(['ketua', 'wakil'])"
      }
    },
    "votingStatus": {
      ".read": true,
      ".write": true
    }
  }
}
```

```
3. Klik "Publish"
```

---

## ⚙️ Langkah 3: Dapatkan Firebase Config

### 3.1 Buat Web App
```
1. Klik icon ⚙️ (Settings) → "Project settings"
2. Scroll ke "Your apps" → Klik icon </> (Web)
3. App nickname: PDSMAXVI Voting
4. Jangan centang Firebase Hosting
5. Klik "Register app"
```

### 3.2 Copy Config
```
Copy semua config yang muncul, contoh:
```

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "pdsmaxvi-voting.firebaseapp.com",
  databaseURL: "https://pdsmaxvi-voting-default-rtdb.firebaseio.com",
  projectId: "pdsmaxvi-voting",
  storageBucket: "pdsmaxvi-voting.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

---

## 📝 Langkah 4: Update File firebase-config.js

### 4.1 Buka File Config
```
File: scripts/firebase-config.js
```

### 4.2 Ganti Config
```javascript
// Ganti bagian ini dengan config dari Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT.firebaseapp.com", 
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## 🧪 Langkah 5: Test Sistem Voting

### 5.1 Jalankan Website
```
1. Buka halaman voting: pages/voting.html
2. Tekan F12 untuk buka Console
3. Cari pesan: "✅ Firebase initialized successfully"
```

### 5.2 Test Voting
```
1. Pilih kandidat ketua
2. Pilih kandidat wakil
3. Cek di Firebase Console → Realtime Database
4. Harusnya muncul data di /votes/
```

### 5.3 Verifikasi Berhasil
```
✅ Console log: "Firebase initialized successfully"
✅ Console log: "Score saved to Firebase!"
✅ Data muncul di Firebase Console
✅ Hasil voting update real-time
```

---

## 🛠️ Langkah 6: Atur Status Voting

### 6.1 Buka Firebase Console
```
1. Realtime Database → Data tab
2. Klik "+" untuk add data
```

### 6.2 Tambah Status Voting
```
Key: votingStatus
Value: {
  "open": true,
  "message": "Voting Aktif"
}
```

### 6.3 Kontrol Voting
```
- Set "open": true → Voting dibuka
- Set "open": false → Voting ditutup
```

---

## 📊 Struktur Database

### Data yang Tersimpan:
```
/votes/
  /user_1234567890_abcdef/
    ketua: "ketua1"
    wakil: "wakil1"

/votingStatus/
  open: true
  message: "Voting Aktif"
```

---

## 🔐 Security Best Practices

### 1. Production Rules (Recommended)
```json
{
  "rules": {
    "votes": {
      ".read": true,
      ".write": true,
      "$userId": {
        ".validate": "newData.hasChildren(['ketua', 'wakil']) && 
                     newData.child('ketua').isString() && 
                     newData.child('wakil').isString()"
      }
    },
    "votingStatus": {
      ".read": true,
      ".write": false
    }
  }
}
```

### 2. Rate Limiting
- Implementasi rate limiting di aplikasi
- Satu user hanya bisa vote sekali

### 3. Admin Controls
- Hanya admin yang bisa ubah votingStatus
- Monitor aktivitas voting

---

## 🚨 Troubleshooting

### Error: "Firebase SDK not loaded"
```
✅ Pastikan ada internet connection
✅ Cek Firebase CDN ter-load di Network tab
✅ Pastikan firebase-config.js sudah benar
```

### Error: "Permission denied"
```
✅ Cek Security Rules di Firebase Console
✅ Pastikan mode = TEST MODE atau rules sudah benar
✅ Cek apakah databaseURL sudah benar
```

### Error: "Database URL not configured"
```
✅ Pastikan databaseURL di config sudah benar
✅ Format: https://project-id-default-rtdb.firebaseio.com
✅ Pastikan Realtime Database sudah aktif
```

### Data tidak muncul
```
✅ Cek apakah voting sudah berhasil (console log)
✅ Refresh Firebase Console
✅ Cek tab Network untuk error
✅ Pastikan Security Rules allow write
```

---

## 📈 Monitoring & Analytics

### 1. Firebase Console
```
- Realtime Database → Data tab
- Monitor jumlah votes
- Cek user activity
```

### 2. Voting Statistics
```
- Total votes per candidate
- Voting timeline
- User engagement
```

---

## 🔄 Backup & Maintenance

### 1. Backup Data
```
1. Firebase Console → Data tab
2. Klik Export JSON
3. Simpan backup secara berkala
```

### 2. Database Cleanup
```
- Hapus data lama jika perlu
- Archive hasil voting
- Monitor storage usage
```

---

## ✅ Checklist Setup

- [ ] Firebase project dibuat
- [ ] Realtime Database aktif
- [ ] Security rules dikonfigurasi
- [ ] Web app terdaftar
- [ ] firebase-config.js diupdate
- [ ] Test voting berhasil
- [ ] Data muncul di Firebase Console
- [ ] Status voting bisa dikontrol

---

## 🎉 Done!

Sistem voting Anda sudah siap! 

**Next Steps:**
1. Test dengan beberapa user
2. Monitor hasil voting
3. Set jadwal buka/tutup voting
4. Archive hasil setelah voting selesai

---

**Need Help?**
- Firebase Docs: https://firebase.google.com/docs
- Realtime Database Guide: https://firebase.google.com/docs/database



