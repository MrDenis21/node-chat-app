const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require("socket.io");
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = 3000 || process.env.PORT ; 
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welkome to the chat message'));

    socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (newMessage, callback) =>{
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback('This is from server');
    });

    socket.on('disconnect',()=>{
        console.log('User is disconnected');
    })
})

server.listen(3000, () => {
    console.log("server is started on port 3000");
});