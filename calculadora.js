'use strict';
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname,'index.html');
const math = require('mathjs');
var devolverResultado;

const server = express().use((req, res) => res.sendFile(INDEX)).listen(PORT);
const io = socketIO(server);

io.on('connection', socket => {
  socket.on('calcular', function(parametros) {
    try {
      devolverResultado = math.eval(parametros);
    } catch (error) {
      io.emit('alCliente',true);
      return;
    }
    if (devolverResultado === Infinity) {
        io.emit('alCliente',true);
    } else {
      io.emit('alCliente',devolverResultado);
    }
  });
});
