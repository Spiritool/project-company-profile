const express = require("express");
const app = express();
const router = express.Router();
const Model_Pembayaran = require('../Model/Model_Pembayaran.js');
const Model_Menu = require("../Model/Model_Menu.js");
const Model_Alamat = require("../model/Model_Alamat.js");
const Model_Users_Kantin = require("../model/Model_Users_Kantin.js");

const connection = require('../config/database');
app.use(express.json());



router.get('/', async (req, res, next) => {
    try {
        let id = req.session.userId;
        let rows = await Model_Menu.getAll();
        let rows2 = await Model_Users_Kantin.getId(id);
        res.render('catering/beranda', {
            data: rows,
            data2: rows2,
        });
    } catch (error) {
        console.log(error);
    }
});


router.get('/keranjang', async (req, res, next) => {
    try {
        id = req.session.userId
        console.log("routes", id)
        let rows = await Model_Pembayaran.getKeranjang(id);
        res.render('catering/keranjang', {
            data: rows,
            id: id,
        });
    } catch (error) {
        console.log(error)
    }
});

router.post('/checkout', async (req, res) => {
    try {
        let id = req.session.userId;
        let rows = await Model_Alamat.getId(id);

        const {
            itemIds
        } = req.body;

        if (!itemIds || itemIds.length === 0) {
            return res.status(400).send('Tidak ada item yang dipilih');
        }

        const query = `
            SELECT a.*, b.* FROM pembayaran as a
            LEFT JOIN menu as b ON a.id_menu = b.id_menu  
            WHERE id_pembayaran IN (${itemIds.join(', ')});
        `;

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Error querying database');
            }

            // Menghitung subtotal di sisi server
            let subtotal = 0;
            results.forEach(item => {
                subtotal += item.harga_menu * item.jumlah;
            });

            const discountRate = 0;
            const discount = subtotal * discountRate;
            const total = subtotal - discount;

            console.log('Subtotal:', subtotal, 'Diskon:', discount, 'Total:', total);

            // Mengirim hasil subtotal dan total ke view
            res.render('catering/checkout', {
                items: results,
                data: rows,
                subtotal,
                discount,
                total
            });
        });
    } catch (error) {
        console.error('Terjadi error:', error);
        res.status(500).send('Terjadi kesalahan pada server');
    }
});


router.get('/checkout', async (req, res) => {
    try {
        console.log("get")
        res.render('catering/checkout', {
            items: []
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan pada server');
    }
});

router.get('/profil', async (req, res, next) => {
    try {
        let id = req.session.userId;
        let rows = await Model_Menu.getAll();
        let rows2 = await Model_Users_Kantin.getId(id);
        res.render('catering/profil', {
            id: id,
            data: rows,
            data2: rows2,
        });
    } catch (error) {
        res.redirect('/loginkantin');
        console.log(error);
    }
});
router.get('/alamat', async (req, res, next) => {
    try {
        let id = req.session.userId;
        let rows = await Model_Alamat.getAll();
        let rows2 = await Model_Users_Kantin.getId(id);
        res.render('catering/alamat', {
            id: id,
            data: rows,
            data2: rows2,
        });
    } catch (error) {
        res.redirect('/loginkantin');
        console.log(error);
    }
});

router.get('/pesanan', async (req, res, next) => {
    try {
        let id = req.session.userId;
        let rows = await Model_Menu.getAll();
        let rows2 = await Model_Users_Kantin.getId(id);
        res.render('catering/pesanan', {
            id: id,
            data: rows,
            data2: rows2,
        });
    } catch (error) {
        res.redirect('/loginkantin');
        console.log(error);
    }
});

router.get('/riwayat', async (req, res, next) => {
    try {
        let id = req.session.userId;
        let rows = await Model_Menu.getAll();
        let rows2 = await Model_Users_Kantin.getId(id);
        res.render('catering/riwayat', {
            id: id,
            data: rows,
            data2: rows2,
        });
    } catch (error) {
        res.redirect('/loginkantin');
        console.log(error);
    }
});

router.post('/update-quantity', async (req, res) => {
    const {
        id,
        jumlah
    } = req.body;

    try {
        // Update database sesuai kebutuhan
        const query = `UPDATE pembayaran SET jumlah = ? WHERE id_pembayaran = ?`;
        await connection.query(query, [jumlah, id]);

        res.json({
            success: true,
            message: 'Quantity updated successfully'
        });
    } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update quantity'
        });
    }
});

router.post('/checkout/pesanan', async (req, res) => {
    const {
        items,
        total_harga,
        id_alamat
    } = req.body;

    try {
        // Insert data checkout ke tabel checkout
        const [checkoutResult] = await db.query(
            `INSERT INTO checkout (total_harga, tanggal_checkout) VALUES (?, NOW())`,
            [total_harga]
        );
        const id_checkout = checkoutResult.insertId;

        // Update tabel pembayaran dengan id_checkout, id_alamat, dan status_pemesanan=dimasak
        await db.query(
            `UPDATE pembayaran 
             SET id_checkout = ?, id_alamat = ?, status_pemesanan = 'dimasak' 
             WHERE id_pembayaran = (
                SELECT id_pembayaran FROM pembayaran WHERE id_checkout IS NULL LIMIT 1
             )`,
            [id_checkout, id_alamat]
        );

        res.status(200).json({
            message: 'Checkout berhasil dan pembayaran diperbarui',
            id_checkout
        });
    } catch (error) {
        console.error('Kesalahan checkout:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat checkout',
            error
        });
    }
});

module.exports = router;