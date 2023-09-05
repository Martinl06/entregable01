const getCreateUserError = (user) =>{
    return ` Datos incompletos para generar el usuario
        Se debe enviar:
        fisrtName: ${user.firstName}
        lastName: ${user.lastName}
        userName: ${user.userName}
        email: ${user.email}
        password: ${user.password}
        genero: ${user.genero}
    `

}

const getCreateProductError = (product) =>{
    return ` Datos incompletos para generar el producto
        Se debe enviar:
        name: ${product.name}
        description: ${product.description}
        price: ${product.price}
        stock: ${product.stock}
        genero: ${product.genero}
    `

}

module.exports = {
    getCreateUserError,
    getCreateProductError
}