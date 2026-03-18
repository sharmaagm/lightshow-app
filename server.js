const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Serve your HTML files from a folder named 'public'
app.use(express.static('public')); 

io.on('connection', (socket) => {
  console.log('A device connected!');

  // Listen for commands from your Admin page
  socket.on('send_light_command', (data) => {
    // Broadcast that exact command to EVERY connected audience member
    io.emit('light_command', data);
  });
});

http.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});