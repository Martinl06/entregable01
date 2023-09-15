const winston = require('winston')
const config = require('../dao/config/config.js')


const customLoggersOptions = {
    levels: {
        fatal : 0,
        error : 1,
        warning : 2,
        info : 3,
        http : 4,
        debug : 5,
    },
    colors: {
        fatal : 'bold red',
        error : 'orange',
        warning : 'yellow',
        info : 'green',
        http : 'blue',
        debug : 'magenta',
    }
}

//custom DEVLOGGER

const devLogger = winston.createLogger({
    levels: customLoggersOptions.levels,

    //declaramos los transports
    transports : [
        //CONSOLA
        new winston.transports.Console({
            level: 'debug',
            format :winston.format.combine(winston.format.colorize({colors: customLoggersOptions.colors}),
            winston.format.simple()
            )
    }),
        //FILE
        new winston.transports.File({
            filename: './errors.log',
            level: 'debug',
            format: winston.format.simple()
        })

]
})


//CUSTOM PRODLOGGER

const prodLogger = winston.createLogger({
    levels: customLoggersOptions.levels,

    //declaramos los transports
    transports : [
        //CONSOLA
        new winston.transports.Console({
            level: 'info',
            format :winston.format.combine(winston.format.colorize({colors: customLoggersOptions.colors}),
            winston.format.simple()
            )
    }),
        //FILE
        new winston.transports.File({
            filename: './errors.log',
            level: 'info',
            format: winston.format.simple()
        })

]
})


//EXPORTS

function addLogger (req, res, next) {

    if(config.enviroment === 'production'){
        req.logger = prodLogger
        req.logger.info('Level info enabled')
        req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    }else{
        req.logger = devLogger
        req.logger.debug('Debugging enabled')
        req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    }
    next()
}

module.exports = {
    addLogger
}