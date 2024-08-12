const express = require("express");
const router = express.Router();
const Model_Layanan = require('../model/Model_Layanan.js');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/layanan')
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
        let rows = await Model_Layanan.getAll();
        res.render('layanan/index', {
            data: rows
        });
    } catch (error) {
        next(error);
    }
});

router.get('/users', async function (req, res, next) {
    try {
        let rows = await Model_Layanan.getAll();
        res.render('layanan/users/index', {
            data: rows
        });
    } catch (error) {
        console.error("Error:", error);
        req.flash('invalid', 'Terjadi kesalahan saat memuat data pengguna');
    }
});


router.get('/create', async function (req, res, next) {
    try {
        let level_users = req.session.level;
        let id = req.session.userId;
        let Data = await Model_Layanan.getAll();
        // if(Data[0].level_users == "2") {
        res.render('layanan/create', {
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

router.post('/store', upload.single("gambar_layanan"), async function (req, res, next) {
    try {
        let {nama_layanan, deskripsi_layanan} = req.body;
        let Data = {
            nama_layanan,
            deskripsi_layanan,
            gambar_layanan: req.file.filename
        }
        await Model_Layanan.Store(Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/layanan');
        
    } catch (error) {
        req.flash('error', 'Terjadi kesalahan pada fungsi')
        console.log(error);
        res.redirect('/layanan')
    }
    
})


router.get("/edit/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        let rows = await Model_Layanan.getId(id);
        let rows2 = await Model_Layanan.getAll();
        if (rows.length > 0) {
            res.render("layanan/edit", {
                id: id,
                data: rows[0],
                data_layanan: rows2,
            });
        } else {
            req.flash("error", "layanan not found");
            res.redirect("/layanan");
        }
    } catch (error) {
        next(error);
    }
});


router.post("/update/:id",  upload.single("gambar_layanan"), async (req, res, next) => {
    try {
        const id = req.params.id;
        let filebaru = req.file ? req.file.filename : null;
        let rows = await Model_Layanan.getId(id);
        const namaFileLama = rows[0].gambar_layanan;

        if (filebaru && namaFileLama) {
            const pathFileLama = path.join(__dirname, '../public/images/layanan', namaFileLama);
            fs.unlinkSync(pathFileLama);
        }

        let {
            nama_layanan,
            deskripsi_layanan,
        } = req.body;
        
        let gambar_layanan = filebaru || namaFileLama

        let Data = {
            nama_layanan: nama_layanan,
            deskripsi_layanan: deskripsi_layanan,
            gambar_layanan
        }
        console.log(req.body);
        console.log(Data);
        await Model_Layanan.Update(id, Data);
        req.flash("success", "Berhasil mengupdate data layanan");
        res.redirect("/layanan");
    } catch (error) {
        console.log(error);
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await Model_Layanan.Delete(id);
        req.flash('success', 'Berhasil menghapus data layanan');
        res.redirect('/layanan');
    } catch (error) {
        req.flash("error", "Gagal menghapus data layanan");
        res.redirect("/layanan");
    }
});

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