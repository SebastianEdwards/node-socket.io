'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';
const ADMIN = '/admin.html';
const PLAYING = '/playing.html';

const server = express()
  .get('/admin', (req, res) => res.sendFile(ADMIN, { root: __dirname }))
  .post('/admin', (req, res) => {
    io.emit('play')
    console.log('Playing song')
    res.sendFile(PLAYING, { root: __dirname })
  })
  .get('/', (req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});
