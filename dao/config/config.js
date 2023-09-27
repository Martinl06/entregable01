const dotenv = require('dotenv')
dotenv.config()
const {Command} = require ('commander')





const program = new Command();

program
    .option('-d','Variable para hacer debug', false)
    .option('-p <port>','Puerto del servidor', 8080 )
    .option('--mode <mode>', 'Modo de trabajo', 'dev')
program.parse()    

console.log("Mode Option: ", program.opts());

const enviroment = program.opts().mode

//revisar porque no funciona

dotenv.config({
    path:enviroment === "production" ? "../config/.env.production " : "../config/.env.dev"
});

console.log("Enviroment: ", enviroment);

module.exports = {
   port: process.env.PORT, 
   enviroment: enviroment,
   jwt: process.env.JWT_SECRET,
   gmailAccount: process.env.mail,
   gmailPass: process.env.passMail,
 

}