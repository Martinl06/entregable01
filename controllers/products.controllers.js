const ProductService = require('../services/product.services.js');
const productService = new ProductService();



class ProductController{

    async getAllPaginate (req, res) {
        const {page, limit} = req.query
        const products = await productService.getAll(page, limit)
        //console.log(products)
        let productsArray = products.docs.map((product)=>{
            return {
                name: product.name,
                description: product.description,
                code: product.code,
                thumbnail: product.thumbnail,
                price: product.price,
                stock: product.stock,
                genero: product.genero
            }
        })
        const {docs , ...rest} = products
        let links = []
    
        for (let i = 1; i <= rest.totalPages + 1; i++) {
            links.push({label:i, href:'http://localhost:8080/products/?page=' + i})
        }
        return res.status(200).render('productsAll',{productsArray, pagination: rest, links})
    }


    async getById (req, res) {

    const id = req.params.id
    const product = productService.getProductById(id)
    .then(product => {
    if(product) return res.status(200).send({data: product, message: "Producto encontrado"})
    return res.status(204).send({data: product, message: "No hay productos"})
    }).catch(err => res.status(500).send({err}))
}



    async create (req, res) {
        const Newproduct = req.body
        ProductService.addProducts(Newproduct)
        .then(product =>{
         res.status(201).send({
            msg: "Producto creado",
            data: product
         })
        })
        .catch(err => res.status(500).send({err}))
    }


    async deleteProduct (req, res) {
        try{
            const id = req.params.id
            const product = await productService.deleteProduct(id)
            return res.status(200).json({
                status: 'success',
                message: 'Producto eliminado',
                payload: product
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                status: 'error',
                message: 'Error al eliminar el producto',
                data:{}
            })
        }
    }

    async updateProduct (req, res) {
        const id = req.params.id
        const {name, price, image} = req.body;
        try{
            const product = await productService.updateProduct(id, name, price, image)
            return res.status(200).json({
                status: 'success',
                message: 'Producto actualizado',
                payload: product
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                status: 'error',
                message: 'Error al actualizar el producto',
                data:{}
            })
        }
    }

    async getRealTime (req, res) {
        const products = await productService.getAllProducts()
        res.render('realTimeProducts', products);
      };


    async getImageHome (req, res) {
        res.render('home')
    }

    async getProduct(req, res){
        return productService.getProduct()

    }

    async generateMockFakerProducts(req, res){
        try{
            const products = await productService.generateMockFakerProducts()
            res.send({status: 'success', payload: products})
        }catch(err){
            console.log(err)
            res.status(500).send({error: err, message:'No se pudieron obtener los productos'})
        }
    }

}

module.exports = new ProductController()