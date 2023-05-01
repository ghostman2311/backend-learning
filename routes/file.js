const express = require('express');
const router = express.Router()

const upload = require('../middleware/file')


router.post("/upload", upload.single('image'), (req, res) => {
    return res.status(200).send({message: 'File Uploaded successfully'})
});

module.exports = router;