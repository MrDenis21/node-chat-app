const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require("socket.io");

const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = 3000 || process.env.PORT ; 
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');


    socket.on('join', (params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room are required!');
        }
        socket.join(params.room);
        //users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        
        socket.emit('newMessage', generateMessage('Admin', 'Welkome to the chat message'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} is joined `));
        
        callback();
    });

    socket.on('createMessage', (newMessage, callback) =>{
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback();
    });

    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude))
    })

    socket.on('disconnect',()=>{
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left chat`));

        }
    })
})

server.listen(3000, () => {
    console.log("server is started on port 3000");
});