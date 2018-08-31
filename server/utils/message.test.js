let expect = require('expect');
let assert = require('chai').assert;

let {generateMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
        let from = "Denys";
        let text = "some message";
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        assert.include(message, {from, text}, "message contains data");
    });
});