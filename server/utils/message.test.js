let expect = require('expect');
let assert = require('chai').assert;

let {generateMessage} = require('./message');
let {generateLocationMessage} = require('./message');


describe('generateMessage', ()=>{
    it('should generate correct message object', async ()=>{
        let from = "Denys";
        let text = "some message";
        let message = generateMessage(from, text);

        await expect(typeof message.createdAt).toBe('string');
        await assert.include(message, {from, text}, "message contains data");
    });
});

describe('generateLocation', ()=>{
    it('should generate correct location', async ()=>{
        let from = "Admin";
        let testString = "https://www.google.com/maps?q=";
        let location = generateLocationMessage(from, 50.4578651, 30.434695099999995);

        await expect(location.url.includes(testString));
    });
});