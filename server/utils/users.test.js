const expect = require('expect');
const {Users} = require('./users');


describe('Users', ()=>{

    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:'1',
            name:'Vlad',
            room:'node course'
        }, {
            id:'2',
            name:'Den',
            room:'react course'
        },{
            id:'3',
            name:'Igor',
            room:'node course'
        }]
    });

    it('should add new user', ()=>{
        let users = new Users();
        let user = {
            id:'123',
            name:'Denys',
            room:'Test_room'
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should find a user', ()=>{
        let userId = '2';
        let user = users.getUser(userId);
   
        expect(user.id).toEqual(userId);
    })

    it('should remove user', ()=>{
        let userId = '1';
        let user = users.removeUser(userId);

        expect(user.id).toEqual(userId);
        expect(users.users.length).toEqual(2);
    });

    it('should return names for node course', ()=>{
        let userList = users.getUserList('node course');
        
        expect(userList).toEqual(['Vlad','Igor']);
    })

    it('should return names for react course', ()=>{
        let userList = users.getUserList('react course');
        
        expect(userList).toEqual(['Den']);
    })
})