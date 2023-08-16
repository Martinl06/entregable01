const ProductService = require('../services/products.services.js');



class ProductController{

    async getAll (req, res) {
        const {page, limit} = req.query
        try{
           const products = await ProductService.getAll(page, limit)
           //console.log(products)
           return res.status(200).json({
               status: 'success',
               payload: products.docs,
               totalPages: products.totalPages,
               prevPage: products.prevPage,
               nextPage: products.nextPage,
               page: products.page,
               hasPrevPage: products.hasPrevPage,
               hasNextPage: products.hasNextPage,
               prevLink: products.hasPrevPage? `http://localhost:8080/products/?page=${products.prevPage}`: null,
               nextLink: products.hasNextPage? `http://localhost:8080/products/?page=${products.nextPage}`: null,   
           })
       }catch(err){
           console.log(err)
           return res.status(500).json({
               status: 'error',
               message: 'Error al obtener los productos',
               data:{}
           })
         }
    }


    async getById (req, res) {

    const id = req.params.id
    const product = ProductService.getProductById(id)
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
        const id = req.params.id
        try{
            const product = await ProductService.deleteProduct(id)
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
            const product = await ProductService.updateProduct(id, name, price, image)
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
}

module.exports = new ProductController();