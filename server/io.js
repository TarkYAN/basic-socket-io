const http = require('http');
const {Server} = require('socket.io');

let io;

const socketSetup = (app) => {
    const server = http.createServer(app);
    io = new Server(server);

    const handleChatMessage = (data) => {
        io.emit(data.channel, data.message);
    };

    //Socket = my servers connection to a specific person
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });

        socket.on('chat message', handleChatMessage);
    })

    return server;
};

module.exports = socketSetup;
