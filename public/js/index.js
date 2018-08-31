let socket = io();
        
socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from:'MY_FROEND@gmailcom',
    //     text:'Hello my dear friend',
    //     createdAt: 444
    // });

});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});


socket.on('newMessage', function (message) {
    console.log("new message", message);
});