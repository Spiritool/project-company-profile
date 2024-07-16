const express = require("express");
const router = express.Router();
const Model_Dokter = require('../model/Model_Dokter.js');


router.get('/', async (req, res, next) => {
    try {
        let rows = await Model_Dokter.getAll();
        res.render('dokter/index', { data: rows });
    } catch (error) {
        next(error);
    }
});

router.get('/create', (req, res) => {
    res.render('dokter/create');
});

router.post("/store", async (req, res, next) => {
    try {
        const dokterData = req.body;
        await Model_Dokter.Store(dokterData);
        req.flash("success", "Berhasil menyimpan data dokter");
        res.redirect("/dokter");
    } catch (error) {
        console.log(error);
        req.flash("error", "Gagal menyimpan data dokter");
        res.redirect("/dokter");
    }
});

router.get("/edit/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        let rows = await Model_Dokter.getId(id);
        if (rows.length > 0) {
            res.render("dokter/edit", {
                id: id,
                nama_dokter: rows[0].nama_dokter,
                alamat_dokter: rows[0].alamat_dokter,
                
            });
        } else {
            req.flash("error", "dokter not found");
            res.redirect("/dokter");
        }
    } catch (error) {
        next(error);
    }
});

router.post("/update/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const dokterData = req.body;
        await Model_Dokter.Update(id, dokterData);
        req.flash("success", "Berhasil mengupdate data dokter");
        res.redirect("/dokter");
    } catch (error) {
        req.flash("error", "Gagal mengupdate data dokter");
        res.redirect("/dokter");
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
        let Data = await Model_Users.getId(id);
        let rows = await Model_Dokter.getAll();
        res.render('dokter/users/index', {
            data: rows,
            email: Data[0].email
        })
    } catch (error) {
        console.error("Error:", error);
        req.flash('invalid', 'Terjadi kesalahan saat memuat data pengguna');
        res.redirect('/login');
    }

});

module.exports = router;
