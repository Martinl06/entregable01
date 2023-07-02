const Product = require('../models/modelProducts')
const productSchema = require('../models/modelProducts')


class ProductManagerMongo{
    constructor(path){
        this.path = path
    }

     addProduct(product) {
        const newProduct = new Product(product)
        return newProduct.save()
    }

     async getProducts() {
        try {
          const products = await Product.find({}).lean()
          return products;
        } catch (error) {
          console.log('error', error);
        }
      }

      async getProductById(_id) {
        try {
            const product = await Product.findById(_id);
            return product;
        } catch (error) {
            throw new Error('Error retrieving product by ID');
        }
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
    async getAll( page, limit ) {
        const products = await productSchema.paginate({}, { limit:3 || 10, page: page || 1 });
        return products;
      }
}





module.exports = ProductManagerMongo;

