const express = require("express");
const router = express.Router();




router.get('/', async (req, res, next) => {
    try {
        res.render('catering/beranda', {
            
        });
    } catch (error) {
        console.log(error)
    }
});

router.get('/keranjang', async (req, res, next) => {
    try {
        res.render('catering/keranjang', {
            
        });
    } catch (error) {
        console.log(error)
    }
});


module.exports = router;