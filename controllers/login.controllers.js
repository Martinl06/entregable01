const ProductController = require('../controllers/products.controllers.js')
const UserService = require('../services/users.services.js')
const ProductService = require('../services/products.services.js')


class LoginController{

    async current(req, res){
        (req, res) => {
            //verificar si el user esta autenticado
            if(req.session.user) {
                return res.status(200).json(req.session.user)
            }else{
            // user no autenticado    
                return res.status(401).json({error: 'user not authenticated'})
            }
        }
    }

    async login(req, res){
            res.render('login', {})

    }

    async register(req, res){
        const email = req.session.user
        const admin = (email === 'adminCoder@coder.com') ? 'admin' : 'user';
        const user = {
          email: email,
          role: admin,
      }   
        res.render('register', {})
    }

    async perfil(req, res){
        const {email, role, password} = req.session.user
        
        const user = {
            email: email,
            role: role,
            password: password,
        }
        //console.log(user)
        
        //renderiza los productos con paginacion en el perfil del user
        const {page, limit} = req.query
        const products = await ProductService.getAll(page, limit)
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
        return res.status(200).render('perfil',{productsArray, user, pagination: rest, links})
    
    }
}


module.exports = new LoginController()