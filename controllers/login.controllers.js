const ProductService = require('../services/product.services.js')
const productService = new ProductService()
const UsersDTO = require('../dao/dto/users.dto.js')
const UserService = require('../services/users.services.js')
const userService = new UserService()
const { recoveryPass } = require('../utils/nodemailer.js')



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
            links.push({label:i, href:'http://localhost:8080/products/?page=' + i})
        }
        return res.status(200).render('perfil',{productsArray, user, pagination: rest, links})
    
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
            const user = await userService.findOne({ email: body.email });
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
            const user = await userService.findOne({ email: decodedEmail.email });
    
            if (!user) {
                return res.status(404).send('Usuario no encontrado');
            }
            const comparePassword = await compare(newPassword, user.password);
    
            if (comparePassword) {
                return res.status(404).send('No se puede poner misma contraseña')
            }
            const hashPW = await hashPassword(newPassword);
            user.password = hashPW;
            await user.save();
            res.status(200).send('La contraseña ha sido modificada');
        } catch (error) {
            console.error(error);
            if (error.message === 'Token invalid or expired') {
                return res.redirect('/api/forgotPassword');
            }
            res.status(500).send('Error interno del servidor');
        }
    }
}


module.exports = new LoginController()