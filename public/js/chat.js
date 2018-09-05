let socket = io();

function scrollToButtom (){
    //selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');

    //height 
    let clientHeight = messages.prop('clientHeight'); 
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight(); 

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }

}
        
socket.on('connect', function () {
    console.log('Connected to server');

});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});


socket.on('newMessage', function (message) {
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: message.createdAt
    });

    jQuery('#messages').append(html);

    scrollToButtom();

    // console.log("new message", message);
    // let li = jQuery('<li></li>');
    // li.text(`${message.createdAt} ${message.from}: ${message.text}`);

    // jQuery('#messages').append(li);
});

socket.emit('createMessage', {
    from:'Vlad',
    text:'Hi'
}, async function (data){
    await console.log(data);
});

socket.on('newLocationMessage', function(message){
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: message.createdAt
    });

    jQuery('#messages').append(html);

    scrollToButtom();


    // let li = jQuery('<li></li>');
    // let a = jQuery('<a target="_blank">My current location</a>');

    // li.text(`${message.createdAt} ${message.from}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    let messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'user',
        text: messageTextBox.val()
    }, function (){
        messageTextBox.val('');
    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function(e){
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported in your browser');
    }

    locationButton.attr('disabled', 'disabled').text('sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        alert('unable to fetch location');
        locationButton.removeAttr('disabled').text('Send location');
    });

});