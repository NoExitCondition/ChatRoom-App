const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

//Route handler
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
  
server.listen(3000, () => {
    console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    //socket.broadcast.emit('hi');
    io.emit('chat message', msg);
  });
});

/* let socket = io();
      let form = document.getElementById('form');
      let input = document.getElementById('input');
      let messages = document.getElementById('messages');

      form.addEventListener('submit', function(e){
        e.preventDefault();
        if(input.value){
          socket.emit('chat message', input.value);
          input.value = '';
        }
      });

      socket.on('chat message', function(msg){
        let item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
      }); */