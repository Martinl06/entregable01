class CustomError {
    static createError({name = "Error", cause, message, code = 1}){


        const error = new Error(message,{cause: new Error(cause)})
        error.name = name
        error.code = code
        //retornamos el error que estamos customizando
        throw error
    }

}

module.exports = CustomError