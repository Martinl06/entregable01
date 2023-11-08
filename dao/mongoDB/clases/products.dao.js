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
            const product = await Product.findOne({ _id: id }).lean()
            return product;
        } 


        async getProductPriceFromDatabase(productId) {
            try {
                // Busca el producto por su _id en la base de datos
                const product = await Product.findById(productId);
        
                if (product) {
                    // Si se encuentra el producto, devuelve su precio
                    return product.price;
                } else {
                    // Maneja el caso en el que el producto no se encuentra
                    throw new Error('Producto no encontrado');
                }
            } catch (error) {
                // Maneja cualquier error que pueda ocurrir durante la búsqueda del producto
                console.error(error);
                throw new Error('Error al obtener el precio del producto');
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
            throw new Error('Error al actualizar el producto');
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
        try{
            const product = await Product.findById(_id).lean()
            return product
    }   catch(err){
            console.log(err)
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

    async updateOne(id, product){
        await Product.updateOne({_id: id},  {
            name: product.name,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            genero: product.genero,
            status: true
        });
       
    }

     generateMockFakerProducts(){
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


module.exports = ProductClass