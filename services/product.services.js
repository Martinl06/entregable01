const {ProductMethods}  = require("../dao/factory.js");
const productMethods = new ProductMethods()




class ProductService {
    constructor() {
    }


    async getAllProducts() {
        try {
            return await productMethods.getProducts();
        } catch (err) {
            console.log(err);
        }
    }

    async getProductById(id) {
        try {
            return await productMethods.getProductById(id);
        } catch (err) {
            console.log(err);
        }
    }

    async addProduct(prod) {
        try {
            return await productMethods.addProducts(prod);
        } catch (err) {
            console.log(err);
        }
    }

    async updateProduct(id, prod) {
        try {
            return await productMethods.updateProduct(id, prod);
        } catch (err) {
            console.log(err);
        }
    }

    async deleteProduct(id) {
        try {
            return await productMethods.deleteProduct(id);
        } catch (err) {
            console.log(err);
        }
    }

    async updateStockProduct(_id, product) {
        try {
            if (!_id) throw new Error('Invalid _id');
            // this.productValidation(product.name, product.description, product.price, product.thumbnail, product.code, product.stock, product.category, product.genero);
            const updatedProduct = await productMethods.updateOne(_id, {stock:product});
            console.log(`The stock product with id: ${_id} was updated succesfully!`);
            return updatedProduct;
        } catch (error) {
          
             throw new Error(error.message);
        }
    }

    async getArrProductsData(arr) {
        const productsData = [];
      
        for (const id of arr) {
          const product = await this.getProductById(id);
          productsData.push(product);
        }
      
        return productsData;
      }

    getAll = async (page, limit ) => {
        try {
            return await productMethods.getAll(page, limit);
      } catch (error) {
            console.log('error', error);
      }
    }

    async getProduct(name,price,description,code,thumbnail,stock,genero){
        const product = await productMethods.find({name,price,description,code,thumbnail,stock,genero})
        return product;
    }


}

module.exports =  ProductService;