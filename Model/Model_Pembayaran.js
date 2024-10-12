const connection = require('../config/database');

class Model_Pembayaran {

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT pembayaran.*, menu.nama_menu, users.nama_users
                FROM pembayaran
                JOIN menu ON pembayaran.id_menu = menu.id_menu
                JOIN users ON pembayaran.id_users = users.id_users
                ORDER BY id_pembayaran DESC
            `, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('insert into pembayaran set ?', Data, function (err, result) {
                if (err) {
                    reject(err);
                    console.log(result)
                    console.log(err)
                } else {
                    resolve(result);
                    console.log(result)

                }
            })
        });
    }

    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT pembayaran.*, menu.nama_menu, users.nama_users
                FROM pembayaran
                JOIN menu ON pembayaran.id_menu = menu.id_menu
                JOIN users ON pembayaran.id_users = users.id_users
                WHERE pembayaran.id_pembayaran = ?
            `, [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('update pembayaran set ? where id_pembayaran =' + id, Data, function(err, result){
                if(err){
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('delete from pembayaran where id_pembayaran =' + id, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }
}


module.exports = Model_Pembayarans;
