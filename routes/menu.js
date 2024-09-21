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
        res.render('menu/create', {
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

router.post('/store', upload.single("gambar_menu"), async function (req, res, next) {
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
    } catch(error) {
        console.log('error: ', error)
        req.flash('error', 'Terjadi kesalahan pada fungsi')
        res.redirect('/menu')
    }
})


router.get("/edit/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        let rows = await Model_Menu.getId(id);
        let rows2 = await Model_Kategori.getAll();
        if (rows.length > 0) {
            res.render("menu/edit", {
                id: id,
                data: rows[0],
                data_kategori: rows2,
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.post("/update/:id",  upload.single("gambar_menu"), async (req, res, next) => {
    try {
        const id = req.params.id;
        let filebaru = req.file ? req.file.filename : null;
        let rows = await Model_Menu.getId(id);
        const namaFileLama = rows[0].gambar_menu;

        if (filebaru && namaFileLama) {
            const pathFileLama = path.join(__dirname, '../public/images/menu', namaFileLama);
            fs.unlinkSync(pathFileLama);
        }

        let {
            nama_menu,
            harga_menu,
            stock,
            id_kategori,
        } = req.body;
        
        let gambar_menu = filebaru || namaFileLama

        let Data = {
            nama_menu: nama_menu,
            harga_menu: harga_menu,
            stock: stock,
            id_kategori: id_kategori,
            gambar_menu
        }
        await Model_Menu.Update(id, Data);
        req.flash("success", "Berhasil mengupdate data dokter");
        res.redirect("/menu");
    } catch (error) {
        console.log(error);
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await Model_Menu.Delete(id);
        req.flash('success', 'Berhasil menghapus data menu');
        res.redirect('/menu');
    } catch (error) {
        req.flash("error", "Gagal menghapus data menu");
        res.redirect("/menu");
    }
});

// router.get('/users', async function (req, res, next) {
//     try {
//         // let level_users = req.session.level;
//         let id = req.session.userId;
//         let rows = await Model_Dokter.getAll();
//         res.render('dokter/users/index', {
//         })
//     } catch (error) {
//         console.error("Error:", error);
//         req.flash('invalid', 'Terjadi kesalahan saat memuat data pengguna');
//         res.redirect('/login');
//     }
// });

module.exports = router;