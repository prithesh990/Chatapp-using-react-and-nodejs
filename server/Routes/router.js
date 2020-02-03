const express = require('express');
const router = express.Router()
const upload = require('../middleware/imageuploader')

router.get('/', (req, res) => {
    res.send('server is running sucessfully ')
})

router.post('/', upload, (req, res) => {
    console.log(req.file)
    res.send('everything is fine')
})

module.exports = router