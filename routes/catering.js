const express = require("express");
const router = express.Router();
const Model_Pembayaran = require('../Model/Model_Pembayaran.js');
const Model_Menu = require("../Model/Model_Menu.js");

router.get('/', async (req, res, next) => {
    try {
        let rows = await Model_Menu.getAll();
        // Ambil data dari session
        const { nama_users, gambar_users } = req.session; // Mengambil nama dan gambar dari session
        res.render('catering/beranda', {
            data: rows,
            nama_users, // Kirim nama pengguna ke view
            gambar_users // Kirim gambar pengguna ke view
        });
    } catch (error) {
        console.log(error);
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

router.get('/profil', async (req, res, next) => {
    try {
        res.render('catering/profil', {
            
        });
    } catch (error) {
        console.log(error)
    }
});

router.get('/pesanan', async (req, res, next) => {
    try {
        res.render('catering/pesanan', {
            
        });
    } catch (error) {
        console.log(error)
    }
});

router.get('/riwayan', async (req, res, next) => {
    try {
        res.render('catering/riwayat', {
            
        });
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;