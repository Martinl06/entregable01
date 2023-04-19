class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = 0
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}

class ProductManager {
    constructor(){
        this.products = []
    }


 addProduct = (title, description, price, thumbnail, code, stock) => {
    if(!title || !description || !price || !thumbnail || !code || !stock){
        console.log("Los campos son obligatorios")
        return
    }

    if(this.products.find(product =>product.code === code)){
        console.log("El codigo del producto ya esta en uso")
        return
    }

    const id = this.products.length + 1
    const product = new Product(title, description, price, thumbnail, code, stock)
    product.id = id
    this.products.push(product)
    console.log("Producto agregado con exito")
}


 getProducts = () => {
    return this.products
}

 getProductById = (id) => {
    const product = this.products.find(product => product.id === id)
        if(product){
            return product
        }else{
            console.log("Producto no encontrado")
        }
    }
}

const productManager = new ProductManager()

console.log(productManager.getProducts())

productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

console.log(productManager.getProducts())

productManager.addProduct("producto prueba2", "Este es un producto prueba2", 100, "Sin imagen", "abc123", 2)

console.log(productManager.getProductById(1))

console.log(productManager.getProductById(2))