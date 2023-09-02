const ProductService = require('../services/product.services.js')
const productService = new ProductService()
const UsersDTO = require('../dao/dto/users.dto.js')



class LoginController{

    //funcion para que se vea solo los datos del DTO
    async current(req, res){ 
        const usersDTO = new UsersDTO(req.session.user)
        if(req.session.user){
            // user autenticado
            return res.status(200).json({data: usersDTO, message: 'user authenticated'})
            }else{
            // user no autenticado    
                return res.status(401).json({error: 'user not authenticated'})
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
        return res.status(200).render('perfil',{productsArray, user, pagination: rest, links})
    
    }
}


module.exports = new LoginController()