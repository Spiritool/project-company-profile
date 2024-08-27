const express = require("express");
const router = express.Router();
const Model_Buku = require('../model/Model_Buku.js');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/buku')
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
        let rows = await Model_Buku.getAll();
        res.render('buku/index', {
            data: rows
        });
    } catch (error) {
        next(error);
    }
});

router.get('/users', async function (req, res, next) {
    try {
        let rows = await Model_Buku.getAll();
        res.render('buku/users/index', {
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
        let Data = await Model_Buku.getAll();
        // if(Data[0].level_users == "2") {
        res.render('buku/create', {
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

router.post('/store', upload.single("gambar_buku"), async function (req, res, next) {
    try {
        let {nama_buku, deskripsi_buku} = req.body;
        let Data = {
            nama_buku,
            deskripsi_buku,
            gambar_buku: req.file.filename
        }
        await Model_Buku.Store(Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/buku');
        
    } catch (error) {
        req.flash('error', 'Terjadi kesalahan pada fungsi')
        console.log(error);
        res.redirect('/buku')
    }
    
})


router.get("/edit/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        let rows = await Model_Buku.getId(id);
        let rows2 = await Model_Buku.getAll();
        if (rows.length > 0) {
            res.render("buku/edit", {
                id: id,
                data: rows[0],
                data_buku: rows2,
            });
        } else {
            req.flash("error", "buku not found");
            res.redirect("/buku");
        }
    } catch (error) {
        next(error);
    }
});


router.post("/update/:id",  upload.single("gambar_buku"), async (req, res, next) => {
    try {
        const id = req.params.id;
        let filebaru = req.file ? req.file.filename : null;
        let rows = await Model_Buku.getId(id);
        const namaFileLama = rows[0].gambar_buku;

        if (filebaru && namaFileLama) {
            const pathFileLama = path.join(__dirname, '../public/images/buku', namaFileLama);
            fs.unlinkSync(pathFileLama);
        }

        let {
            nama_buku,
            deskripsi_buku,
        } = req.body;
        
        let gambar_buku = filebaru || namaFileLama

        let Data = {
            nama_buku: nama_buku,
            deskripsi_buku: deskripsi_buku,
            gambar_buku
        }
        console.log(req.body);
        console.log(Data);
        await Model_Buku.Update(id, Data);
        req.flash("success", "Berhasil mengupdate data buku");
        res.redirect("/buku");
    } catch (error) {
        console.log(error);
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await Model_Buku.Delete(id);
        req.flash('success', 'Berhasil menghapus data buku');
        res.redirect('/buku');
    } catch (error) {
        req.flash("error", "Gagal menghapus data buku");
        res.redirect("/buku");
    }
});


module.exports = router;