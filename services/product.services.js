const { error } = require('winston');
const ProductClass = require ('../dao/mongoDB/clases/products.dao.js')
const productClass = new ProductClass()





class ProductService {
    constructor() {
    }


    async getAllProducts() {
        try {
            return await productClass.getProducts();
        } catch (err) {
            console.log(err);
        }
    }

    async getProductById(pid) {
        try {
            const product = await productClass.getProductById(pid);
            return product;
        } catch (err) {
            console.log(err);
        }
    }

    async addProducts(prod) {
        try {
            return await productClass.addProducts(prod);
        } catch (err) {
            console.log(err);
        }
    }

    async updateProduct(id, prod) {
        try {
            return await productClass.updateProduct(id, prod);
        } catch (err) {
            console.log(err);
        }
    }

    async deleteProduct(id) {
        try {
            return await productClass.deleteProduct(id);
        } catch (err) {
            console.log(err.Error);
        }
    }

    async updateStockProduct(_id, product) {
        try {
            const updatedProduct = await productClass.updateOne(_id, {stock:product});
            console.log(`The stock product with id: ${_id} was updated succesfully!`);
            return updatedProduct;
        } catch (error) {
          
             throw new Error(error.message);
        }
    }

    

    getAll = async (page, limit ) => {
        try {
            return await productClass.getAll(page, limit);
      } catch (error) {
            console.log('error', error);
      }
    }

    async getProduct(_id){
        const product = await productClass.getProduct(_id);
        return product;
    }

    async getArrProductsData(arr) {
        try {
            return await productClass.getArrProductsData(arr);
        } catch (err) {
            console.log(err);
        }
    }

    async generateMockFakerProducts(){
        return await productClass.generateMockFakerProducts();
    }

}



module.exports =  ProductService