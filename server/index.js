const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// Socket.io logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('chat message', (msg) => {
  const messageData = {
    id: socket.id,
    text: msg,
  };
  io.emit('chat message', messageData);
});


  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
