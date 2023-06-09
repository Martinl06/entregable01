const Product = require('../models/modelProducts')
const Message = require('../models/modelMessages')

class ProductManagerMongo{
    constructor(path){
        this.path = path
    }

     addProduct(product) {
        const newProduct = new Product(product)
        return newProduct.save()
    }

     getProducts() {
        try {
          const products = Product.find();
          return products;
        } catch (error) {
          console.log('error', error);
        }
      }

     getProductById(id) {
        const Product = this.getProducts()
        return Product.find((product) => product.id === id)
    }

     updateProduct(id, actualizarProducto) {
        const newProduct = this.getProducts()
        const product = newProduct.findIndex((product) => product.id === id)
        if (product !== -1) {
            product = { id, ...actualizarProducto };
            return product.save()
        }
        return null;
    }

     deleteProduct(id) {
        const products = this.getProducts()
        const Newproduct = products.findIndex((product) => product.id === id)
        if (Newproduct !== -1) {
            const deletedProduct = products.splice(Newproduct, 1)[0];
            return deletedProduct.deleteOne()
            
        }
        return null;
    }

}




module.exports = ProductManagerMongo;

