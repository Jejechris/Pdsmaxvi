# 🎓 PDSMAXVI - Website Perpisahan Angkatan

Website perpisahan interaktif untuk Angkatan XII dengan fitur quiz, timeline, awards, dan global leaderboard realtime menggunakan Firebase.

![PDSMAXVI](pdsmaxvi.jpg)

## ✨ Fitur

- 🎮 **Interactive Quiz** - 10 pertanyaan random dengan timer dan hearts system
- 🏆 **Global Leaderboard** - Realtime sync menggunakan Firebase Realtime Database
- 📅 **Timeline Kenangan** - Galeri foto dengan layout timeline
- 🏅 **Fun Awards** - Badge dan pencapaian seru
- 📜 **Surat Unik** - Pesan personal dengan kode unik
- 🎵 **Background Music** - Audio player dengan volume control
- 📱 **Responsive Design** - Mobile-friendly UI
- 🌙 **Modern UI** - Gradient, animations, dan smooth transitions

## 🚀 Quick Start

### Cara 1: Local Development (Recommended)

#### Dengan Node.js:
```bash
# Double-click file ini:
start-server-node.bat

# Atau via command line:
npx http-server -p 8000
```

#### Dengan Python:
```bash
# Double-click file ini:
start-server.bat

# Atau via command line:
python -m http.server 8000
```

#### Dengan VS Code:
```
1. Install extension "Live Server"
2. Klik kanan index.html
3. "Open with Live Server"
```

Lalu buka: **http://localhost:8000**

---

## 🔥 Firebase Setup

Website ini menggunakan Firebase Realtime Database untuk global leaderboard.

### Setup Firebase (5 menit):

1. **Buka Firebase Console:**
   ```
   https://console.firebase.google.com/
   ```

2. **Buat Project Baru atau gunakan existing**

3. **Setup Realtime Database:**
   - Sidebar → "Realtime Database"
   - Klik "Create Database"
   - Location: Asia Southeast (Singapore)
   - Security: Start in TEST MODE
   - Enable

4. **Update Config:**
   - Buka file `firebase-config.js`
   - Ganti config dengan config dari Firebase Console kamu
   - (Lihat FIREBASE_QUICKSTART.txt untuk detail)

5. **Setup Security Rules:**
   ```json
   {
     "rules": {
       "leaderboard": {
         ".read": true,
         ".write": true
       }
     }
   }
   ```

📖 **Panduan lengkap:** Baca `FIREBASE_SETUP.md` atau `FIREBASE_QUICKSTART.txt`

---

## 📁 Struktur File

```
pdsmaxvi1/
├── index.html              # Homepage
├── quiz.html               # Quiz game dengan leaderboard
├── galeri.html            # Timeline kenangan
├── awards.html            # Fun badges
├── estafet.html           # Dokumentasi & keberlanjutan
├── surat-unik.html        # Pesan personal dengan kode
├── pesan.html             # Pesan perpisahan
├── struktur.html          # Struktur pengurus
├── harapan.html           # Harapan untuk adik kelas
├── surat.html             # Surat-surat
├── style.css              # Global styles
├── app.js                 # Common JavaScript
├── firebase-config.js     # Firebase configuration
├── questions.json         # Quiz questions database
├── pdsmaxvi.jpg          # Main image
├── sw.js                  # Service Worker (PWA)
├── manifest.json          # PWA manifest
└── README.md             # This file
```

---

## 🎮 Fitur Quiz

### Features:
- ✅ Progress bar
- ✅ Timer per soal (20 detik)
- ✅ Hearts system (3 nyawa)
- ✅ Time-based scoring (base 10 + bonus)
- ✅ Multiple question types (MCQ, True/False, Multi-answer)
- ✅ Final summary dengan badges
- ✅ Share results (Web Share API / WhatsApp)
- ✅ Local leaderboard (localStorage)
- ✅ Global leaderboard (Firebase Realtime)
- ✅ Toggle Global/Local view

### Cara Kerja:
1. 10 soal random dari 14 soal di `questions.json`
2. Timer countdown 20 detik per soal
3. Skor = 10 (base) + bonus waktu tersisa
4. Salah jawab = kehilangan 1 heart
5. Game over jika hearts habis atau selesai semua soal
6. Submit nama untuk masuk leaderboard

---

## 🎨 Customization

### Ubah Questions:
Edit file `questions.json`:
```json
{
  "questions": [
    {
      "type": "mcq",
      "category": "pengurus",
      "question": "Pertanyaan kamu...",
      "options": ["A", "B", "C", "D"],
      "answer": ["B"]
    }
  ]
}
```

### Ubah Colors:
Edit `style.css` di bagian `:root`:
```css
:root {
  --purple: #5c3c92;
  --purple-600: #4a2f75;
  --muted: #6b6b76;
  /* ... */
}
```

### Ubah Timer/Hearts:
Edit `quiz.html`:
```javascript
const TIME_LIMIT = 20;      // detik per soal
const TOTAL_QUESTIONS = 10; // jumlah soal per game
const MAX_HEARTS = 3;       // jumlah nyawa
```

---

## 📊 Database Management

### Lihat Data:
```
Firebase Console → Database → Data tab
```

### Hapus Data:
```
Klik /leaderboard → icon ⋮ → Delete
```

### Export Data:
```
Klik /leaderboard → icon ⋮ → Export JSON
```

📖 **Panduan lengkap:** Baca `FIREBASE_DATABASE_MANAGEMENT.md`

---

## 🌐 Deployment

### Opsi 1: Firebase Hosting (Recommended)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Opsi 2: Netlify
```
1. Buka https://app.netlify.com/
2. Drag & drop folder ini
3. Done!
```

### Opsi 3: GitHub Pages
```
1. Push ke GitHub
2. Settings → Pages → Enable
3. Source: main branch
```

### Opsi 4: Vercel
```
1. Buka https://vercel.com/
2. Import GitHub repo
3. Deploy
```

---

## 🔒 Security Notes

⚠️ **PENTING untuk Production:**

1. **Jangan push `firebase-config.js` ke public repo!**
   - Uncomment line di `.gitignore`
   - Atau gunakan Environment Variables

2. **Setup Security Rules yang proper:**
   ```json
   {
     "rules": {
       "leaderboard": {
         ".read": true,
         ".write": "auth != null",
         "$entry": {
           ".validate": "newData.hasChildren(['name', 'score'])"
         }
       }
     }
   }
   ```

3. **Enable App Check** untuk prevent abuse

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Firebase Realtime Database
- **Features:** 
  - AOS (Animate On Scroll)
  - Font Awesome Icons
  - Google Fonts (Poppins, Playfair Display)
  - PWA Support
  - Service Worker for offline

---

## 📝 To-Do (Optional Improvements)

- [ ] Add authentication untuk prevent spam
- [ ] Add admin panel untuk manage data
- [ ] Add filter by date/category di leaderboard
- [ ] Add notification saat ada score baru
- [ ] Add analytics (Google Analytics/Firebase)
- [ ] Add more question types
- [ ] Add achievements system
- [ ] Add multi-language support

---

## 🐛 Troubleshooting

### Quiz tidak muncul / CORS error:
- ❌ Jangan buka file langsung (file://)
- ✅ Gunakan web server (lihat Quick Start)

### Firebase error "Permission Denied":
- Cek Security Rules di Firebase Console
- Pastikan `.read` dan `.write` = `true`

### Data tidak sync:
- Cek `databaseURL` di firebase-config.js
- Hard refresh browser (Ctrl + Shift + R)
- Cek Console untuk error messages

---

## 📞 Support

**Documentation:**
- `FIREBASE_SETUP.md` - Firebase setup guide
- `FIREBASE_QUICKSTART.txt` - Quick 5-minute setup
- `DATABASE_QUICKREF.txt` - Database management reference
- `HOW_TO_RUN.txt` - How to run locally

**Issues?** Check Console (F12) for error messages.

---

## 📄 License

© 2025 PDSMAXVI Angkatan XII. All rights reserved.

---

## 🎉 Credits

**Developed for:** PDSMAXVI Angkatan 2025
**Purpose:** Farewell website untuk kakak-kakak angkatan

**Built with ❤️ by the PDSMAXVI Team**

---

**Happy coding! 🚀**




