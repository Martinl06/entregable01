 class UsersDTO{
    constructor(userNew){
        this.name = userNew.name;
        this.lastName = userNew.lastName;
        this.email = userNew.email;
        this.role = userNew.role;
        this.active = true;
        
    }
}

module.exports = UsersDTO