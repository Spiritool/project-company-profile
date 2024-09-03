var express = require('express');
var router = express.Router();
const Model_Berita = require('../model/Model_Berita.js');

router.get('/users', async function (req, res, next) {
    try {
        let rows = await Model_Berita.getAll();
        res.render('artikel/users/index', {
            data: rows // Data berita yang akan dirender
        });
    } catch (error) {
        console.error("Error:", error);
        req.flash('invalid', 'Terjadi kesalahan saat memuat data pengguna');
        res.redirect('/login');
    }
});

module.exports = router;