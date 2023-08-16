const modelProducts = require('../dao/models/modelProducts.js')


class ProductService {
        
    addProducts = async (newPr) =>{
        const newProduct = new modelProducts(newPr).save();
        return newProduct
    };

     async getProducts() {
        try {
          const products = await modelProducts.find({}).lean()
          return products;
        } catch (error) {
          console.log('error', error);
        }
      }

      async getProductById(_id) {
        try {
            const product = await modelProducts.findById(_id);
            return product;
        } catch (error) {
            throw new Error('Error retrieving product by ID');
        }
    }

    updateProductByID = async (id, newProps) =>{     
        try {
            const FindProductById = await modelProducts.findById(id);
            if (!FindProductById) return "id de producto no encontrado";
            const updatedProduct = await modelProducts.findByIdAndUpdate(id, newProps, {new:true, runValidators:true}).exec();
            return updatedProduct;
        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async(id) =>{
        try {
            const FindProductById = await modelProducts.findById(id);
            if (!FindProductById) return "id de producto no encontrado"
            const deleteProduct = await FindProductById.deleteOne();
            console.log(`el producto ${FindProductById} fue eliminado`);            
        } catch (error) {
            console.log(error)
        }
    }

    getAll = async (page, limit ) => {
        try {
            const products = await modelProducts.paginate({}, { limit: limit || 3 || 10, page: page || 1 });
            return products;
      } catch (error) {
            console.log('error', error);
      }
    }

    async getProduct(name,price,description,code,thumbnail,stock,genero){
        const product = await modelProducts.find({name,price,description,code,thumbnail,stock,genero})
        return product;
    }




}


module.exports = new ProductService()