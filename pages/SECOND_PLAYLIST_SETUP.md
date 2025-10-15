🎵 SECOND PLAYLIST SETUP - MY PLAYLIST FOR YOU 🎵

📋 PLAYLIST KEDUA YANG DITAMBAHKAN:
- Playlist Spotify Anda sendiri
- Posisi: Di bawah playlist pertama, sebelum feed posts
- Nama: "My Playlist for You"
- Icon: 🎵 (music note)
- Message: "My Personal Playlist"

🔧 CARA SETUP PLAYLIST KEDUA:

1. BUAT PLAYLIST DI SPOTIFY:
   - Buka Spotify Web Player atau App
   - Klik "Create Playlist"
   - Beri nama playlist (contoh: "My Playlist for You")
   - Tambahkan lagu-lagu yang Anda pilih
   - Set playlist menjadi Public

2. DAPATKAN LINK PLAYLIST:
   - Klik "Share" pada playlist
   - Pilih "Copy link to playlist"
   - Link akan seperti: https://open.spotify.com/playlist/37i9dQZF1DX...

3. UPDATE LINK DI WEBSITE:
   - Buka file pages/untukmu.html
   - Cari baris: src="https://open.spotify.com/embed/playlist/YOUR_PLAYLIST_ID"
   - Ganti "YOUR_PLAYLIST_ID" dengan ID playlist Anda

🎨 DESIGN FEATURES:

1. LAYOUT:
   - Sama dengan playlist pertama
   - Posisi di bawah playlist pertama
   - Sebelum feed posts
   - Spacing yang konsisten

2. STYLING:
   - Background: var(--bg-color)
   - Border: var(--border-color)
   - Padding: 1rem
   - Margin: 0.5rem auto
   - Max-width: 500px

3. MESSAGE:
   - Icon: 🎵 (music note)
   - Title: "My Personal Playlist"
   - Subtitle: "Lagu-lagu yang aku buat khusus untuk kamu"
   - Background: Spotify green subtle

📱 RESPONSIVE DESIGN:

1. DESKTOP:
   - Max-width: 500px
   - Centered layout
   - Proper spacing
   - Touch-friendly controls

2. MOBILE:
   - Full-width dengan padding
   - Optimized height
   - Touch-friendly interface
   - Better accessibility

🔧 CUSTOMIZATION OPTIONS:

1. GANTI NAMA PLAYLIST:
   ```html
   <span>My Playlist for You</span>
   <!-- Ganti dengan nama yang diinginkan -->
   ```

2. GANTI ICON:
   ```html
   <div class="message-icon">🎵</div>
   <!-- Ganti dengan emoji lain -->
   <div class="message-icon">💖</div>
   <div class="message-icon">✨</div>
   ```

3. GANTI MESSAGE:
   ```html
   <p class="message-title">My Personal Playlist</p>
   <p class="message-subtitle">Lagu-lagu yang aku buat khusus untuk kamu</p>
   <!-- Ganti dengan pesan yang diinginkan -->
   ```

4. GANTI PLAYLIST ID:
   ```html
   src="https://open.spotify.com/embed/playlist/YOUR_PLAYLIST_ID"
   <!-- Ganti YOUR_PLAYLIST_ID dengan ID playlist Anda -->
   ```

🎯 LAYOUT STRUCTURE:

1. WELCOME SCREENS (4 steps)
2. STORIES SECTION
3. 🎵 PLAYLIST PERTAMA (Ur Playlist)
4. 🎵 PLAYLIST KEDUA (My Playlist for You) - NEW
5. FEED POSTS (4 posts)
6. MUSIC CONTROLS (di bawah)

✨ KEUNGGULAN DUA PLAYLIST:

1. PERSONALIZATION:
   - Playlist pertama: Lagu yang dia suka
   - Playlist kedua: Lagu yang Anda pilih
   - Dua perspektif yang berbeda
   - Lebih personal dan meaningful

2. USER EXPERIENCE:
   - Lebih banyak pilihan musik
   - Dua playlist dengan tema berbeda
   - Better music discovery
   - Enhanced emotional connection

3. VISUAL HIERARCHY:
   - Clear separation antara playlist
   - Consistent styling
   - Better content organization
   - Professional appearance

🔧 TECHNICAL DETAILS:

1. HTML STRUCTURE:
   ```html
   <!-- Playlist Pertama -->
   <div class="spotify-embed-section">
     <div class="playlist-header">Ur Playlist</div>
     <div class="spotify-player">...</div>
     <div class="playlist-message">...</div>
   </div>

   <!-- Playlist Kedua -->
   <div class="spotify-embed-section">
     <div class="playlist-header">My Playlist for You</div>
     <div class="spotify-player">...</div>
     <div class="playlist-message">...</div>
   </div>
   ```

2. CSS CLASSES:
   - .spotify-embed-section: Container untuk kedua playlist
   - .playlist-header: Header dengan icon dan nama
   - .spotify-player: Iframe container
   - .playlist-message: Message dengan icon dan text

3. RESPONSIVE:
   - Mobile: Full-width dengan proper spacing
   - Desktop: Max-width 500px centered
   - Touch-friendly controls
   - Optimized height

💡 TIPS MENGISI PLAYLIST:

1. PLAYLIST PERTAMA (Ur Playlist):
   - Lagu yang dia suka
   - Lagu yang mengingatkan pada dia
   - Lagu yang sering dia dengar
   - Lagu favorit dia

2. PLAYLIST KEDUA (My Playlist for You):
   - Lagu yang Anda pilih untuk dia
   - Lagu yang memiliki makna khusus
   - Lagu yang mengingatkan pada momen bersama
   - Lagu yang ingin Anda bagikan

3. KONTEN PLAYLIST:
   - 5-10 lagu per playlist
   - Atur urutan yang meaningful
   - Pilih lagu yang berkualitas
   - Pertimbangkan mood dan tempo

🎵 FINAL RESULT:
- Dua playlist dengan tema berbeda
- Personal touch yang lebih kuat
- Better music experience
- Enhanced emotional connection
