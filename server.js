/**
 * Servidor de chat em tempo real com a menor complexidade possível.
 *
 * Tecnologias:
 * - Express: servidor HTTP e arquivos estáticos.
 * - Socket.IO: comunicação em tempo real (WebSocket + fallback).
 */
const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = http.createServer(app);

// Instância do Socket.IO anexada ao mesmo servidor HTTP do Express.
const io = new Server(httpServer);

const PORT = 3000;

// Pasta pública com o frontend (index.html, css, etc.).
const publicDirectory = path.join(__dirname, 'public');
app.use(express.static(publicDirectory));

/**
 * Fluxo do chat:
 * 1) Cliente conecta;
 * 2) Cliente envia uma mensagem;
 * 3) Servidor retransmite para todos os clientes.
 */
io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  // Recebe mensagem enviada por um cliente.
  socket.on('chat:message', (textMessage) => {
    // Validação simples para evitar mensagens vazias.
    if (typeof textMessage !== 'string' || !textMessage.trim()) {
      return;
    }

    const messageData = {
      senderId: socket.id,
      text: textMessage.trim(),
      sentAt: new Date().toISOString(),
    };

    // Envia a mensagem para TODOS os clientes conectados, incluindo o remetente.
    io.emit('chat:message', messageData);
  });

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor online em http://localhost:${PORT}`);
});
