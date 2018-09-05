let moment = require('moment');

exports.generateMessage = (from, text) =>{
    return {
        from,
        text,
        createdAt: moment().format('Do MMM H:m ')
    }
}

exports.generateLocationMessage = (from, latitude, longitude) =>{
    return {
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().format('Do MMM H:m ')
    }
}