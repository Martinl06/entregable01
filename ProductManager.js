const fs = require('fs');

class ProductManager {
    constructor(path){
        this.path = path
    }


 addProduct (product) {
        const products = this.getProducts()
        product.id = products.length + 1
        products.push(product)
        this.saveProducts(products)
  
    }

    getProducts () {
        fs.promises.readFile(this.path, 'utf-8')
        .them((data) => {
            return JSON.parse(data)
        }).catch((err) => {
            return []   
        })
}


 getProductById = (id) => {
    const product = this.getproducts()
    return product.find((product) => product.id === id)
}


}