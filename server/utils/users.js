class Users {
    constructor(){
        this.users = [];
    }

    addUser(id, name, room) {
        let user = {id, name, room}
        this.users.push(user);
        return user;
    }

    removeUser(id){
        let userToDelete = this.getUser(id);
        let index = this.users.indexOf(userToDelete);
        console.log(userToDelete);
        this.users.splice(index,1);
        return userToDelete;
    }

    getUser(id){
        return this.users.filter((user)=> user.id === id)[0]
    }

    getUserList(room){
        let users = this.users.filter((user)=>{
            if(user.room === room) {
                return user.name;
            }
        });

        let namesArray = users.map((user)=>{ return user.name});
        
        return namesArray;
    }
}

module.exports = {Users};