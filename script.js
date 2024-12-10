// Firebase 초기화
const firebaseConfig = {
  apiKey: "AIzaSyAGjgrtj2bIuS7wCVe5vqDIyJrYHhy1mOs",
  authDomain: "digitalguestbook-cb442.firebaseapp.com",
  databaseURL: "https://digitalguestbook-cb442-default-rtdb.firebaseio.com",
  projectId: "digitalguestbook-cb442",
  storageBucket: "digitalguestbook-cb442.firebasestorage.app",
  messagingSenderId: "113065383721",
  appId: "1:113065383721:web:e146c20637abc15ab9c938",
};

// Firebase 앱과 데이터베이스 초기화
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);

// DOM 요소 가져오기
const messageForm = document.getElementById('message-form');
const messagesDiv = document.getElementById('messages');

// 메시지 추가 이벤트
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // Firebase에 메시지 저장
    db.ref('messages').push({
        name: name,
        message: message,
        timestamp: Date.now()
    });

    messageForm.reset();
});

// Firebase에서 메시지 실시간 불러오기
db.ref('messages').on('value', (snapshot) => {
    const messages = snapshot.val();
    messagesDiv.innerHTML = '';
    for (const key in messages) {
        const { name, message } = messages[key];
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${name}: ${message}`;
        messagesDiv.appendChild(messageDiv);
    }
});
