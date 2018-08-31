let socket = io();
        
socket.on('connect', function () {
    console.log('Connected to server');

});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});


socket.on('newMessage', function (message) {
    console.log("new message", message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.emit('createMessage', {
    from:'Vlad',
    text:'Hi'
}, async function (data){
    await console.log(data);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    console.log("ddd");

    socket.emit('createMessage', {
        from: 'user',
        text: jQuery('[name=message]').val()
    }, function (){

    });
});