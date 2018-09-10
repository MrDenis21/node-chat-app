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
    let params = jQuery.deparam(window.location.search);

    socket.emit('join', params, async function(err){
        if(err){
            alert(err);
            window.location.href='/';
        } else {
            console.log('No error');
        }
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users){
    let ul = jQuery('<ul></ul>');

    users.forEach(function(user){
        ul.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ul);
    console.log(users);
})


socket.on('newMessage', function (message) {
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: message.createdAt
    });

    jQuery('#messages').append(html);

    scrollToButtom();
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

});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    let messageTextBox = jQuery('[name=message]');
    let params = jQuery.deparam(window.location.search);

    socket.emit('createMessage', {
        from: params.name,
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