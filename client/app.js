const socket = io(); // Connect to server

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

// Send message to server
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

// Receive message from server
socket.on('chat message', (data) => {
  const item = document.createElement('div');
  item.classList.add('message');
  item.innerHTML = `<strong>User:</strong> ${data.id.slice(0, 5)}<br>${data.text}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

