# 🔥 Firebase Database Management Guide

## 📊 Cara Kelola Database Firebase

### 1. Akses Firebase Console
```
https://console.firebase.google.com/project/pdsmaxvi-ac5fc/database
```

---

## 📖 MELIHAT DATA

### Cara 1: Firebase Console (Web Interface)
1. Buka: https://console.firebase.google.com/project/pdsmaxvi-ac5fc/database
2. Pilih tab **"Data"**
3. Klik path: `/leaderboard`
4. Akan muncul semua entry seperti:
   ```
   leaderboard/
     -NqR7xyzABC123:
       name: "Jesen"
       score: 150
       correctCount: 8
       avgTime: 12.5
       hearts: 2
       timestamp: 1704876543210
       date: "2025-01-03T10:30:45.678Z"
   ```

---

## 🗑️ MENGHAPUS DATA

### Opsi 1: Hapus Entry Tertentu
1. **Di Firebase Console → Database → Data tab**
2. **Hover pada entry yang mau dihapus**
3. **Klik icon ❌ (delete)** di sebelah kanan
4. **Confirm delete**

### Opsi 2: Hapus Semua Data Leaderboard
1. **Di Firebase Console → Database → Data tab**
2. **Klik path `/leaderboard`**
3. **Klik icon ⋮ (three dots)**
4. **Pilih "Delete"**
5. **Confirm delete**
6. **Semua data leaderboard akan terhapus!**

### Opsi 3: Hapus Data via Rules (Auto-Delete After X Days)
Edit Security Rules:
```json
{
  "rules": {
    "leaderboard": {
      ".read": true,
      ".write": true,
      "$entry": {
        ".validate": "newData.hasChildren(['name', 'score', 'timestamp'])",
        ".write": "!data.exists() || data.child('timestamp').val() > (now - 2592000000)"
      }
    }
  }
}
```
☝️ Ini akan auto-delete data lebih dari 30 hari (2592000000 ms)

---

## ✏️ MENGEDIT DATA

### Edit Manual di Console:
1. **Klik entry yang mau diedit**
2. **Klik icon ✏️ (edit)**
3. **Ubah value (misalnya nama atau score)**
4. **Klik Save/✓**

### Edit via Code (Add Delete Button di Website):
Tambahkan fungsi ini di `firebase-config.js`:

```javascript
// Delete specific entry
async function deleteLeaderboardEntry(entryId) {
  if (!leaderboardRef) return false;
  try {
    await leaderboardRef.child(entryId).remove();
    console.log('✅ Entry deleted!');
    return true;
  } catch (error) {
    console.error('Error deleting:', error);
    return false;
  }
}

// Clear all leaderboard
async function clearAllLeaderboard() {
  if (!leaderboardRef) return false;
  try {
    await leaderboardRef.remove();
    console.log('✅ All leaderboard data cleared!');
    return true;
  } catch (error) {
    console.error('Error clearing:', error);
    return false;
  }
}
```

---

## 📊 EXPORT DATA

### Export ke JSON:
1. **Di Firebase Console → Database → Data tab**
2. **Klik icon ⋮ (three dots) pada `/leaderboard`**
3. **Pilih "Export JSON"**
4. **Data akan di-download sebagai file .json**

### Export ke CSV (via Script):
Bisa pakai tools online atau script Node.js untuk convert JSON → CSV

---

## 🔒 SECURITY RULES

### Lihat/Edit Rules:
1. **Di Firebase Console → Database**
2. **Pilih tab "Rules"**
3. **Edit rules dan klik "Publish"**

### Rules Recommended untuk Production:

#### Basic (Read: Public, Write: Anyone):
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

#### Advanced (Prevent Cheating):
```json
{
  "rules": {
    "leaderboard": {
      ".read": true,
      ".write": true,
      "$entry": {
        ".validate": "newData.hasChildren(['name', 'score', 'timestamp']) && newData.child('score').isNumber() && newData.child('score').val() >= 0 && newData.child('score').val() <= 300",
        ".write": "!data.exists()"
      }
    }
  }
}
```
☝️ Ini mencegah:
- Score > 300 (max possible)
- Score negatif
- Edit entry yang sudah ada (hanya bisa add new)

---

## 📈 MONITORING

### Lihat Usage & Stats:
1. **Firebase Console → Database**
2. **Tab "Usage"**
3. Lihat:
   - Total data stored
   - Download bytes
   - Connections
   - Storage used

### Quota Gratis Firebase:
- **Storage:** 1 GB
- **Download:** 10 GB/month
- **Concurrent connections:** 100

Untuk quiz kecil ini, **LEBIH DARI CUKUP!**

---

## 🚨 TROUBLESHOOTING

### "Permission Denied" saat write:
- Cek Security Rules
- Pastikan `.write: true` untuk testing

### Data tidak muncul:
- Cek di Console → Database → Data tab
- Pastikan path `/leaderboard` ada
- Refresh browser

### Data duplikat:
- Setiap submit create new entry dengan unique ID
- Ini normal! Bukan bug.
- Bisa filter by name di code jika perlu

---

## 🎯 QUICK ACTIONS

### Reset Leaderboard untuk Event Baru:
```
1. Firebase Console → Database → Data
2. Klik /leaderboard → Delete
3. Done! Database kosong siap event baru
```

### Backup Sebelum Event:
```
1. Export JSON (steps di atas)
2. Save file .json
3. Bisa restore nanti jika perlu
```

### Disable Database Setelah Event:
```
1. Firebase Console → Database
2. Settings → Delete database
3. Atau ubah rules jadi locked:
   {
     "rules": {
       ".read": false,
       ".write": false
     }
   }
```

---

## 📞 Need Help?

**Firebase Documentation:**
https://firebase.google.com/docs/database

**Common Commands:**
- **View data:** Console → Database → Data tab
- **Delete data:** Hover → Click ❌
- **Export data:** ⋮ menu → Export JSON
- **Edit rules:** Rules tab → Edit → Publish

---

**Happy Managing! 🔥**




