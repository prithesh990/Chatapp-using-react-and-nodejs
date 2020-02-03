const fs = require('fs');
const multer = require('multer');

if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const date = new Date();
        cb(null, date.getTime() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (req.file === null) {
        cb(null, false)
    }
    else {
        console.log(file)
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
};



const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter

}).single('uploadImage')

module.exports = upload




