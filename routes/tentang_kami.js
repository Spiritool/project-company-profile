var express = require('express');
var router = express.Router();

router.get('/tentang_kami', async function (req, res, next) {
    try {

        res.render('tentang_kami/index', {
        })
    } catch (error) {
        console.error("Error:", error);
        req.flash('invalid', 'Terjadi kesalahan saat memuat data pengguna');
        res.redirect('/login');
    }

});
module.exports = router;