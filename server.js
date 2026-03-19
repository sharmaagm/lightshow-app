const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public')); 

let connectedUsers = 0;

io.on('connection', (socket) => {
  // Add 1 when a device connects and broadcast the new total
  connectedUsers++;
  io.emit('user_count', connectedUsers);

  // Listen for commands from your Admin page
  socket.on('send_light_command', (data) => {
    io.emit('light_command', data);
  });

  // Subtract 1 when someone closes their browser/phone goes to sleep
  socket.on('disconnect', () => {
    connectedUsers--;
    io.emit('user_count', connectedUsers);
  });
});

// Use Render's required port, or default to 3000 locally
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
