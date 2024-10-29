const express = require("express");
const router = express.Router();
const Model_Pembayaran = require('../Model/Model_Pembayaran.js');
const Model_Menu = require("../Model/Model_Menu.js");
const Model_Users_Kantin = require("../model/Model_Users_Kantin.js");

router.get('/', async (req, res, next) => {
    try {
        let id = req.session.userId;
        let rows = await Model_Menu.getAll();
        let rows2 = await Model_Users_Kantin.getId(id);
        res.render('catering/beranda', {
            data: rows,
            data2: rows2,
        });
    } catch (error) {
        console.log(error);
    }
});


router.get('/keranjang', async (req, res, next) => {
    try {
        id = req.session.userId
        console.log("routes", id)
        let rows = await Model_Pembayaran.getKeranjang(id);
        res.render('catering/keranjang', {
            data: rows,
            id: id,
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

router.get('/profil', async (req, res, next) => {
    try {
        let id = req.session.userId;
        let rows = await Model_Menu.getAll();
        let rows2 = await Model_Users_Kantin.getId(id);
        res.render('catering/profil', {
            id: id,
            data: rows,
            data2: rows2,
        });
    } catch (error) {
        res.redirect('/loginkantin');
        console.log(error);
    }
});

router.get('/pesanan', async (req, res, next) => {
    try {
        let id = req.session.userId;
        let rows = await Model_Menu.getAll();
        let rows2 = await Model_Users_Kantin.getId(id);
        res.render('catering/pesanan', {
            id: id,
            data: rows,
            data2: rows2,
        });
    } catch (error) {
        res.redirect('/loginkantin');
        console.log(error);
    }
});

router.get('/riwayat', async (req, res, next) => {
    try {
        let id = req.session.userId;
        let rows = await Model_Menu.getAll();
        let rows2 = await Model_Users_Kantin.getId(id);
        res.render('catering/riwayat', {
            id: id,
            data: rows,
            data2: rows2,
        });
    } catch (error) {
        res.redirect('/loginkantin');
        console.log(error);
    }
});

module.exports = router;