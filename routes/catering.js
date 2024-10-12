const express = require("express");
const router = express.Router();
const Model_Pembayaran = require('../Model/Model_Pembayaran.js');
const Model_Menu = require("../Model/Model_Menu.js");

router.get('/', async (req, res, next) => {
    try {
        // let rows2 = await Model_Pembayaran.getId(id);
        let rows = await Model_Menu.getAll();
        res.render('catering/beranda', {
            data: rows,
            // data_pembayaran: rows2
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

router.get('/checkout', async (req, res, next) => {
    try {
        res.render('catering/checkout', {
            
        });
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;