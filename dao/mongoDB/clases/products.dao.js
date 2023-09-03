const Product = require('../models/modelProducts.js')


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

      async getProductById(_id) {
        try {
            const product = await Product.findById(_id);
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

    async getProduct(_id){
        const product = await Product.findOne({id: _id})
        return product;
    }



    
}


module.exports =  ProductClass