const ProductService = require('../services/product.services.js');
const productService = new ProductService();
const CartService = require('../services/cart.services.js');
const cartService = new CartService();



class ProductController{

    async getAllPaginate (req, res) {
        const {page, limit} = req.query
        const products = await productService.getAll(page, limit)
        let productsArray = products.docs.map((product)=>{
            return {
                _id: product._id,
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
            links.push({label:i, href:'http://localhost:8080/api/products/?page=' + i})
        }
        
        return res.status(200).render('productsAll',{productsArray, pagination: rest, links})
    }

    async getAll (req, res) {
        try{
            const products = await productService.getAll()
            return res.status(200).json({
                status: 'success',
                message: 'Productos encontrados',
                payload: products
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

// funcion para obtener un solo producto
    async getProductById(req, res){

        const IdCart = req.session.user.cart
        const cart = await cartService.getCartID(IdCart)
        console.log(cart)
        const ID = req.params.pid;
        const product1 = await productService.getProduct(ID)
            if (!product1) {
              return res.status(404).send('Producto no encontrado');
            }else{
          
            const productGet = {
              _id: product1._id,
              thumbnail: product1.thumbnail,
              name: product1.name,
              description: product1.description,
              price: product1.price,
              image: product1.image,
              stock: product1.stock,
              code: product1.code,
              genero: product1.genero,
            };

            const cart1 = {
               _id: cart._id,
            }

          
            return res.status(200).render('productView', { cart1, productGet });
    }
}

    


    async create (req, res) {
        const Newproduct = req.body
        productService.addProducts(Newproduct)
        .then(product =>{
         res.status(201).send({
            msg: "Producto creado",
            data: product
         })
        })
        .catch(err => res.status(500).send({err}))
    }


    async deleteProduct (req, res) {
        const { pid } = req.params;
        try {
            const result = await productService.deleteProduct(pid);
            if (result.ok == true) {
                return res.status(201).send({ ok: true, msg: result.msg });
            }
            res.status(result.status).send({ ok: false, msg: result.error });
        } catch (error) {
            res.status(500).send(error.Error);
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
            const ID = req.params.id;
            const product1 = await productService.getProduct(ID)
            console.log({product1});
            if (!product1) {
              return res.status(404).send('Producto no encontrado');
            }else{
          
            const productGet = {
              _id: product1._id,
              name: product1.name,
              description: product1.description,
              price: product1.price,
              image: product1.image,
              stock: product1.stock,
              code: product1.code,
              genero: product1.genero
            };
          
            console.log(productGet);
            return res.status(200).render('productView', { productGet });
          }}
    

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