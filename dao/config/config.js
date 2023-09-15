const dotenv = require('dotenv')
dotenv.config()
const {Command} = require ('commander')


const program = new Command();

program
    .option('-d','Variable para hacer debug', false)
    .option('-p <port>','Puerto del servidor', 8080 )
    .option('--mode <mode>', 'Modo de trabajo', 'production')
program.parse()    

console.log("Mode Option: ", program.opts());

const enviroment = program.opts().mode

//revisar porque no funciona

dotenv.config({
    path: enviroment === "development" ? "../config/.env.dev " : "../config/.env.production"
});

console.log("Enviroment: ", enviroment);

module.exports = {
   port: process.env.PORT, 
   enviroment: enviroment,
}