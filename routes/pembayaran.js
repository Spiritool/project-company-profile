const express = require("express");
const router = express.Router();
const Model_Pembayaran = require('../Model/Model_Pembayaran.js');
const Model_Menu = require("../Model/Model_Menu.js");

router.get('/', async (req, res, next) => {
    try {
        let rows = await Model_Pembayaran.getAll();
        res.render('pembayaran/index', {
            data: rows
        });
    } catch (error) {
        next(error);
    }
});

// router.get('/create', async function (req, res, next) {
//     try {
//         let level_users = req.session.level;
//         let id = req.session.userId;
//         let Data = await Model_Pembayaran.getAll();
//         // if(Data[0].level_users == "2") {
//         res.render('pembayaran/create', {
//             nama_service: '',
//             data: Data,
//         })
//         // }
//         // else if (Data[0].level_users == "1"){
//         //     req.flash('failure', 'Anda bukan admin');
//         //     res.redirect('/sevice')
//         // }
//     } catch (error) {
//         console.log(error);
//     }
// })

// router.post('/store', async function (req, res, next) {
//     try {
//         let { pembayaran } = req.body;
        
//         let Data = {
//             pembayaran, 
//         }
//         await Model_Pembayaran.Store(Data);
//         req.flash('success', 'Berhasil Menyimpan Data!');
//         res.redirect("/pembayaran");
//     } catch(error) {
//         console.log(error);
//         req.flash('error', "Terjadi kesalahan pada Menyimpan Data!");
//         res.redirect("/pembayaran");
//     }
// });



router.get("/edit/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        let rows = await Model_Pembayaran.getId(id);
        let rows2 = await Model_Menu.getAll();
        if (rows.length > 0) {
            res.render("pembayaran/edit", {
                id: id,
                data: rows[0],
                data_menu: rows2,
            });
        } else {
            req.flash("error", "pembayaran not found");
            res.redirect("/pembayaran");
        }
    } catch (error) {
        next(error);
    }
});

router.post("/update/:id", async (req, res, next) => {
    try {
        const id = req.params.id;

        let {
            status_pembayaran,
            jumlah
        } = req.body;

        let Data = {
            status_pembayaran,
            jumlah
        }
        console.log(req.body);
        console.log(Data);
        await Model_Pembayaran.Update(id, Data);
        req.flash("success", "Berhasil mengupdate data dokter");
        res.redirect("/pembayaran");
    } catch (error) {
        console.log(error);
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await Model_Pembayaran.Delete(id);
        req.flash('success', 'Berhasil menghapus data pembayaran');
        res.redirect('/pembayaran');
    } catch (error) {
        req.flash("error", "Gagal menghapus data pembayaran");
        res.redirect("/pembayaran");
    }
});

module.exports = router;