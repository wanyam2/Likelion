import firebase from 'firebase/app';
import 'firebase/messaging';

// Firebase 구성 객체
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firebase 메시징 객체 가져오기
const messaging = firebase.messaging();

export { messaging };
