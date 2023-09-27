const nodemailer = require('nodemailer');
const config = require('../dao/config/jwt.js');
const { generateToken } = require('../dao/config/jwt.js');
const { addLogger } = require('../loggers/custom.loggers.js');



// Crear un objeto de transporte de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.mail,
        pass: config.passMail
    }
});

// Función para verificar la configuración del transporte
const verifyMail = () => {
    transporter.verify(function (error, success) {
        if (error) {
            addLogger.error(error);
        } else {
            addLogger.info('OK for send mails');
        }
    });
}

// Función para enviar un correo electrónico
const sendEmail = (req, res) => {
    try {
        const to = req.user.email;
        if (!to) {
            return res.status(400).send({ message: 'Falta la dirección de correo del destinatario' });
        }

        const mailOptions = {
            from: 'Nombre', // Remitente (cambia "Tu Nombre" por tu nombre o el nombre deseado)
            to,
            subject: 'test de correo electronico',
            html: '<div><h1>Hola, test nodemailer!!!</h1></div>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                addLogger.error(error);
                res.status(400).send({ message: 'Error', payload: error });
            } else {
                addLogger.info('Mensaje enviado: %s', info.messageId);
                res.send({ message: 'Éxito', payload: info });
            }
        });
    } catch (error) {
        addLogger.error(error);
        res.status(500).send({ error, message: 'Error al intentar enviar correo desde ' + config.mail });
    }
}




const recoveryPass = (email, res) => {
    try {
        const token = generateToken(email);
        const to = email;
        if (!to) {
            return res.status(400).send({ message: 'Falta la dirección de correo electrónico del destinatario' });
        }

        const resetPasswordUrl = `http://localhost:8080/api/sessions/recoveryPassword?token=${token}`;

        const mailOptions = {
            from: 'recuperacion contraseña',
            to,
            subject: 'Restablece tu contraseña',
            html: `<div><h1>Hola, aqui puedes recuperar tu contraseña</h1>
            <a href="${resetPasswordUrl}"><button>Haz clic aquí</button></a>
            </div>`
        };

        const result = transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                addLogger.error(error);
                res.status(400).send({ message: 'Error', payload: error });
            }
            addLogger.info('Mensaje enviado: %s', info.messageId);
            res.status(201).send('Mail enviado');
        });
    } catch (error) {
        addLogger.error(error);
        res.status(500).send({ error, message: 'Error al intentar enviar el correo desde ' + config.mail });
    }
};


module.exports = { sendEmail, verifyMail, recoveryPass }