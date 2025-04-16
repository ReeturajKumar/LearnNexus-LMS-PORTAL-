"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocketServer = void 0;
const socket_io_1 = require("socket.io");
const initSocketServer = (server) => {
    const io = new socket_io_1.Server(server);
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
exports.initSocketServer = initSocketServer;
