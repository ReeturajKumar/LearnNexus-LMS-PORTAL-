import {Server as SocketIOServer} from 'socket.io';
import http from 'http';

export const initSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server);
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for 'notification' event from the client
    socket.on('notification', (data) => {
      // Emit 'notification' event to all connected clients
      io.emit('newNotification', data);
    });

    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};