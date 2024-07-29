const express = require("express");
const router = express.Router();
const Model_Layanan = require('../ Model/Model_Layanan.js');

const Model_Users = require('../model/Model_Users.js');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

router.get('/users', async function (req, res, next) {
    try {
        // let level_users = req.session.level;
        let id = req.session.userId;
        let rows = await Model_Layanan.getAll();
        res.render('layanan/users/index', {
        })
    } catch (error) {
        console.error("Error:", error);
        req.flash('invalid', 'Terjadi kesalahan saat memuat data pengguna');
        res.redirect('/login');
    }

});

module.exports = router;