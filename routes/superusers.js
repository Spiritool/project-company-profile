var express = require("express");
const Model_Users = require("../model/Model_Users");
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    let id = req.session.userId;
    let Data = await Model_Users.getId(id);
    if (Data.length > 0) {
      //Kondisi pengecekan
      if(Data[0].level_users != 1){
        res.redirect('/logout')
      }else{
      res.render("users/superusers", {
        title: "Users Home",
        email: Data[0].email,
        nama_users: Data[0].nama_users,
        data2: Data,
        level: req.session.level
      });
    }
    //Akhir Kondisi

    } else {
      res.status(401).json({ error: "user tidak ada" });
    }
  } catch (error) {
    res.status(501).json("Butuh akses login");
    console.log(error)
  }
});


module.exports = router;
