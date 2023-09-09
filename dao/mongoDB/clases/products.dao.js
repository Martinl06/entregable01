const Product = require('../models/modelProducts.js')
const {faker} = require('@faker-js/faker')


class ProductClass {
    constructor() {

    }
        
    addProducts = async (newPr) =>{
        const newProduct = new Product(newPr).save();
        return newProduct
    };

     async getProducts() {
        try {
          const products = await Product.find({}).lean()
          return products;
        } catch (error) {
          console.log('error', error);
        }
      }

      async getProductById(id) {
        try {
            const product = await Product.findById(id);
            return product;
        } catch (error) {
            throw new Error('Error retrieving product by ID');
        }
    }

    updateProductByID = async (id, newProps) =>{     
        try {
            const FindProductById = await Product.findById(id);
            if (!FindProductById) return "id de producto no encontrado";
            const updatedProduct = await Product.findByIdAndUpdate(id, newProps, {new:true, runValidators:true}).exec();
            return updatedProduct;
        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async(id) =>{
        try {
            const FindProductById = await Product.findById(id);
            if (!FindProductById) return "id de producto no encontrado"
            const deleteProduct = await FindProductById.deleteOne();
            console.log(`el producto ${FindProductById} fue eliminado`);            
        } catch (error) {
            console.log(error)
        }
    }


    getAll = async (page, limit ) => {
        try {
            const products = await Product.paginate({}, { limit: limit || 3 || 10, page: page || 1 });
            return products;
      } catch (error) {
            console.log('error', error);
      }
    }

    async getProduct(id){
        try{
            const product = await Product.findOne({_id:id})
            return product
    }   catch(err){
            console.log(err)
        }
    }

    async generateMockFakerProducts(){
        const products = [];
        let numProducts = 100;
        for (let i = 0; i < numProducts; i++) {
            const product = {
                tittle: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                stock: faker.number.int(),
                code: faker.number.int(),
                genero: faker.commerce.productMaterial()
            }
            products.push(product)
        }
        return products;
    }

    
    
}


module.exports =  ProductClass