// Firebase Configuration
// INSTRUKSI: Ganti dengan API key dari Firebase Console kamu
// Cara mendapatkan: Lihat file FIREBASE_SETUP.md

const firebaseConfig = {
    apiKey: "AIzaSyB3UzjOPcI7fn-u9x_qR7pXzw6EvcDzASU",
    authDomain: "pdsmaxvi-ac5fc.firebaseapp.com",
    databaseURL: "https://pdsmaxvi-ac5fc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pdsmaxvi-ac5fc",
    storageBucket: "pdsmaxvi-ac5fc.firebasestorage.app",
    messagingSenderId: "171752700719",
    appId: "1:171752700719:web:5ae803138b320edc1f3fda",
    measurementId: "G-DHC6S3XQH7"
  };

// Initialize Firebase (akan di-load di quiz.html)
let firebaseApp = null;
let database = null;
let leaderboardRef = null;

function initFirebase() {
  try {
    // Check if Firebase is loaded
    if (typeof firebase === 'undefined') {
      console.warn('Firebase SDK not loaded. Using local storage only.');
      return false;
    }

    // Check if config is set
    if (firebaseConfig.apiKey === "YOUR_API_KEY_HERE") {
      console.warn('Firebase not configured. Using local storage only.');
      console.log('To enable global leaderboard, follow instructions in FIREBASE_SETUP.md');
      return false;
    }

    // Initialize Firebase
    firebaseApp = firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    leaderboardRef = database.ref('leaderboard');
    
    console.log('✅ Firebase initialized successfully!');
    return true;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return false;
  }
}

// Save score to Firebase
async function saveScoreToFirebase(name, score, details) {
  if (!leaderboardRef) return false;
  
  try {
    const newEntry = {
      name: name,
      score: score,
      correctCount: details.correctCount || 0,
      totalQuestions: details.totalQuestions || 10,
      avgTime: details.avgTime || 0,
      hearts: details.hearts || 0,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      date: new Date().toISOString()
    };

    await leaderboardRef.push(newEntry);
    console.log('✅ Score saved to Firebase!');
    return true;
  } catch (error) {
    console.error('Error saving to Firebase:', error);
    return false;
  }
}

// Listen to leaderboard updates (realtime)
function listenToLeaderboard(callback, limit = 20) {
  if (!leaderboardRef) return null;

  try {
    // Listen for realtime updates, ordered by score (descending)
    const query = leaderboardRef.orderByChild('score').limitToLast(limit);
    
    query.on('value', (snapshot) => {
      const entries = [];
      snapshot.forEach((childSnapshot) => {
        entries.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      
      // Sort descending by score
      entries.sort((a, b) => b.score - a.score);
      
      callback(entries);
    });

    console.log('✅ Listening to Firebase leaderboard updates');
    return query;
  } catch (error) {
    console.error('Error listening to Firebase:', error);
    return null;
  }
}

// Stop listening
function stopListeningToLeaderboard(query) {
  if (query) {
    query.off();
  }
}

