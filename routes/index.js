var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

var Model_Users = require('../model/Model_Users.js');
var Model_Dokter = require('../model/Model_Dokter.js');
var Model_Layanan = require('../model/Model_Layanan.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/images/users')
  },
  filename: (req, file, cb) => {
      console.log(file)
      cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
      let rows = await Model_Dokter.getAll();
      let layanan = await Model_Layanan.getAll(); // Ambil data layanan dari database
      res.render('index', {
          data: rows,
          layanan: layanan // Kirim data layanan ke view
      });
  } catch (error) {
      console.error("Error:", error);
      req.flash('invalid', 'Terjadi kesalahan saat memuat data pengguna');
      res.redirect('/login');
  }
});

router.get('/login', function(req, res, next) {
  res.render('auth/login');
})

router.post('/saveusers', upload.single("gambar_users"), async (req, res) => {
  try {
    let { nama_users, alamat_users, no_telp_users, email_users, password_users } = req.body;
    let enkripsi = await bcrypt.hash(password_users, 10);
    let Data = {
      nama_users,
      alamat_users,
      no_telp_users,
      email_users,
      password_users: enkripsi,
      level_users: 1,
      gambar_users: req.file.filename
    };
    await Model_Users.Store(Data);
    req.flash('success', 'Berhasil Register');
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    req.flash('error', 'Registration failed. Please try again.');
    res.redirect('/register');
  }
});

router.post('/log', async (req,res) => {
  let {email_users, password_users } = req.body;
  try {
    let Data = await Model_Users.Login(email_users);
    if(Data.length > 0) {
      let enkripsi = Data[0].password_users;
      let cek = await bcrypt.compare(password_users, enkripsi);
      if(cek) {
        req.session.userId = Data[0].id_users;
        req.session.level = Data[0].level_users;
        // req.session.foto = Data[0].foto;
        // req.session.nama = Data[0].nama;
        // req.session.alamat = Data[0].alamat;
        // req.session.no_telp = Data[0].no_telp;
        // req.session.email = Data[0].email;
        // tambahkan kondisi pengecekan level pada user yang login
        if(Data[0].level_users == 1){
          req.flash('success','Berhasil login');
          res.redirect('/superusers');
          //console.log(Data[0]);
        }else if(Data[0].level_users == 2){
          req.flash('success', 'Berhasil login');
          res.redirect('/users');
        }else{
          res.redirect('/login');
          console.log(Data[0]);
        }
      } else {
        req.flash('failure', 'Email atau password salah');
        res.redirect('/login');
      }
    } else {
      req.flash('failure', 'Akun tidak ditemukan');
      res.redirect('/login');
    }
  } catch (err) {
    res.redirect('/login');
    req.flash('failure', 'Error pada fungsi');
    console.log(err);
  }
})

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.error(err);
    } else {
      res.redirect('/login');
    }
  });
});


module.exports = router;

