const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, fn) => {
      fn(null, 'Images')
    },
    filename: (req, file, fn) => {
      console.log(file)
      fn(null, `${Date.now() + path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage })


module.exports = upload;