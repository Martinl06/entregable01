const bcrypt = require('bcrypt');

// hash password//devuelve el password encriptado
const createPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

// compare password//devuelve true o false
const comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
}

module.exports = {
    createPassword,
    comparePassword
}