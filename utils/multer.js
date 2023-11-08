const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = '';

        const fieldName = file.fieldname;

        // PATHS DEPENDIENDO DEL TIPO DE ARCHIVO
        if (fieldName === 'imageProduct') {
            uploadPath = 'products';
        } else if (fieldName === 'identification' || fieldName === 'proofOfAddress' || fieldName === 'accountStatement') {
            uploadPath = 'documents';
        } else if (fieldName === 'imageProfile') {
            uploadPath = 'profiles';
        }

        cb(null, `${__dirname}/../public/uploads/${uploadPath}`);
    },
    filename: function (req, file, cb) {
        cb(null, `file-${Date.now()}-${file.originalname}`);
    }
});

const uploadMulter = multer({ storage });

// INDICA QUE CAMPOS DEL FORMULARIO PUEDE ACEPTAR FILES
const uploadFiles = uploadMulter.fields([
    { name: 'imageProduct' },
    { name: 'identification' },
    { name: 'proofOfAddress' },
    { name: 'accountStatement' },
    { name: 'imageProfile' },
]);

module.exports = { uploadFiles, uploadMulter };