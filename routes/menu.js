const express = require("express");
const router = express.Router();
const Model_Menu = require('../Model/Model_Menu.js');
const Model_Kategori = require('../Model/Model_Kategori.js');
const Model_Users = require('../model/Model_Users.js');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const Model_Layanan = require("../model/Model_Layanan.js");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/menu')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.get('/', async (req, res, next) => {
    try {
        let rows = await Model_Menu.getAll();
        let rows2 = await Model_Kategori.getAll();
        res.render('menu/index', {
            data: rows,
            data2: rows2,
        });
    } catch (error) {
        next(error);
    }
});

router.get('/create', async function (req, res, next) {
    try {
        let level_users = req.session.level;
        let id = req.session.userId;
        let Data = await Model_Kategori.getAll();
        // if(Data[0].level_users == "2") {
        res.render('dokter/create', {
            nama_service: '',
            data: Data,
        })
        // }
        // else if (Data[0].level_users == "1"){
        //     req.flash('failure', 'Anda bukan admin');
        //     res.redirect('/sevice')
        // }
    } catch (error) {
        console.log(error);
    }
})

router.post('/store', upload.single("gambar_dokter"), async function (req, res, next) {
    try {
        let {nama_menu, harga_menu, stock, id_kategori} = req.body;
        let Data = {
            nama_menu,
            harga_menu,
            stock,
            id_kategori,
            gambar_menu: req.file.filename
        }
        await Model_Menu.Store(Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/menu');
    } catch {
        req.flash('error', 'Terjadi kesalahan pada fungsi')
        res.redirect('/menu')
    }
})


router.get("/edit/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        let rows = await Model_Dokter.getId(id);
        let rows2 = await Model_Keahlian.getAll();
        if (rows.length > 0) {
            res.render("dokter/edit", {
                id: id,
                data: rows[0],
                data_keahlian: rows2,
            });
        } else {
            req.flash("error", "dokter not found");
            res.redirect("/dokter");
        }
    } catch (error) {
        next(error);
    }
});

router.post("/update/:id",  upload.single("gambar_dokter"), async (req, res, next) => {
    try {
        const id = req.params.id;
        let filebaru = req.file ? req.file.filename : null;
        let rows = await Model_Dokter.getId(id);
        const namaFileLama = rows[0].gambar_dokter;

        if (filebaru && namaFileLama) {
            const pathFileLama = path.join(__dirname, '../public/images/dokter', namaFileLama);
            fs.unlinkSync(pathFileLama);
        }

        let {
            nama_dokter,
            alamat_dokter,
            no_hp,
            id_keahlian,
        } = req.body;
        
        let gambar_dokter = filebaru || namaFileLama

        let Data = {
            nama_dokter: nama_dokter,
            alamat_dokter: alamat_dokter,
            no_hp: no_hp,
            id_keahlian: id_keahlian,
            gambar_dokter
        }
        console.log(req.body);
        console.log(Data);
        await Model_Dokter.Update(id, Data);
        req.flash("success", "Berhasil mengupdate data dokter");
        res.redirect("/dokter");
    } catch (error) {
        console.log(error);
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await Model_Dokter.Delete(id);
        req.flash('success', 'Berhasil menghapus data dokter');
        res.redirect('/dokter');
    } catch (error) {
        req.flash("error", "Gagal menghapus data dokter");
        res.redirect("/dokter");
    }
});

router.get('/users', async function (req, res, next) {
    try {
        // let level_users = req.session.level;
        let id = req.session.userId;
        let rows = await Model_Dokter.getAll();
        res.render('dokter/users/index', {
        })
    } catch (error) {
        console.error("Error:", error);
        req.flash('invalid', 'Terjadi kesalahan saat memuat data pengguna');
        res.redirect('/login');
    }
});

module.exports = router;