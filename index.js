
class ProductManager{
    constructor(){
        this.products = []
        this.lastProductID = 0
    }

    addProduct(product){
        if(!product.Title || !product.Description || !product.Price || !product.Code || !product.thumbnail || !product.stock){
            console.log("Todos los campos son obligatorios")
        }
        if(this.products.some(product => product.Code === product.Code)){
            console.log("El producto ya existe")
        }


        this.lastProductID
        const newProduct = {
            Title: product.Title,
            Description: product.Description,
            Price: product.Price,
            Code: product.Code,
            thumbnail: product.thumbnail,
            stock: product.stock,
        }

        this.products.push(newProduct)
        console.log("Producto agregado al carrito", newProduct)
    }

    getProducts(){
        return this.products

    }

    getProductById(id){
        const product = this.product.find(product => product.id === id)
        if(!product){
            console.log("Not found")
        }
        return product
    }
    
    
}


