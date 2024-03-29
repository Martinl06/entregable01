const ProductService = require('../services/product.services.js')
const productService = new ProductService()
const UsersDTO = require('../dao/dto/users.dto.js')
const UserService = require('../services/users.services.js')
const userService = new UserService()
const { recoveryPass } = require('../utils/nodemailer.js')
const User = require('../dao/mongoDB/models/modelUser.js')
const { verifyToken } = require('../dao/config/jwt.js')
const { comparePassword, createPassword } = require('../utils/bcrypts.js')
const CartService = require('../services/cart.services.js')
const cartService = new CartService()



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
        const {email, name, lastName, userName} = req.session.user
        const IdCart = req.user.cart
        const cart = await cartService.getCartID(IdCart)
        
        const user = {
            name: name,
            lastName: lastName,
            email: email,
            userName: userName
        }
        const cartID = {
            _id: cart._id
        }
        
        //renderiza los productos con paginacion en el perfil del user
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
        return res.status(200).render('perfil',{productsArray, cartID, user, pagination: rest, links})
    
    }
     changeRol = async (req, res) => {
        const uid = req.params.uid
        try {
            const user = await userService.findById(uid); 
            if (!user) {
                return res.status(404).send('User not found'); 
            }
            if (user.rol.includes('user')) {
                user.rol = 'premium';
            } else {
                user.rol = 'user';
            }
            const updatedUser = await user.save();
            res.status(201).send(`Rol has been changed to ${updatedUser.rol}`);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal server error');
        }
    }

    pageForgotPassword = async (req, res) => {
        res.render('pageForgotPassword')
    }
    
    pageRecoveryPassword = async (req, res) => {
        const token = req.query.token;
        console.log(req.query)
        res.render('recoveryPassword', {
            token: token
        });
    };
    
    
    sendNewPasswordMail = async (req, res) => {
        const body = req.body;
        try {
            const user = await User.findOne({ email: body.email });
            if (!user) {
                return res.status(404).send('No existe usuario con ese correo electrónico');
            }
            recoveryPass(body.email, res);
        } catch (error) {
            res.status(500).send('Error interno del servidor');
        }
    }
    
    
    resetPassword = async (req, res) => {
        const newPassword = req.body.password;
        const token = req.query.token;;
        try {
            const decodedEmail = verifyToken(token);
            const user = await User.findOne({ email: decodedEmail.email });
    
            if (!user) {
                return res.status(404).send('Usuario no encontrado');
            }
            const compare = await comparePassword(newPassword, user.password);
    
            if (compare) {
                return res.status(404).send('No se puede poner misma contraseña')
            }
            const hashPW = await createPassword(newPassword);
            user.password = hashPW;
            await user.save();
            res.status(200).send('La contraseña ha sido modificada');
        } catch (error) {
            console.error(error.Error);
            if (error.message === 'Token invalid or expired') {
                return res.redirect('/api/forgotPassword');
            }
            res.status(500).send('Error interno del servidor');
        }
    }
}


module.exports = new LoginController()