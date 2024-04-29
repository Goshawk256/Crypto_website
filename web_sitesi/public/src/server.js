
//----------------Veritabanında bulunan kişilerin listelenmesi----------------------
const mysql = require('mysql');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "site_veritabani",
    connectionLimit: 10
});

pool.query(`SELECT * FROM uyeler`, function(err, result, fields) {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
});
//--------------------------------yeni bir üyenin eklenmesi-------------------------
const yeniUye = {
    uye_adi: 'emirhan',
    uye_soyadi: 'güney',
    uye_telno: '05433454554',
    uye_eposta: 'emrihan@example.com',
    uye_sifre: 'emri123' 
};

pool.query('INSERT INTO uyeler SET ?', yeniUye, function(err, result) {
    if (err) {
        console.error('Veri eklenirken bir hata oluştu:', err);
        return;
    }
    console.log('Yeni üye başarıyla eklendi. Eklenen üye ID:', result.insertId);
}); 
