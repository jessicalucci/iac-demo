var express = require('express');
var mysql = require('mysql');
var app = express();
var os = require("os");
var interfaces = os.networkInterfaces();
var a;
for (var k2 in interfaces["eth1"]) {
    var address = interfaces["eth1"][k2];
    if (address.family === 'IPv4' && !address.internal) {
        a = address.address;
    }
}

var connection = mysql.createConnection({
    host     : '10.40.40.100',
    user     : 'iac_user',
    password : 'iac_password',
    database : 'iacdb'
});

connection.connect();

app.get('/', function (req, res) {
    connection.query("UPDATE tbl_iacdb SET visited = visited + 1 WHERE host = '" + String(a) + "'", function(err, rows){});
    connection.query("SELECT * FROM tbl_iacdb WHERE host <> '" + String(a) + "'", function(err, rows){
        res.send({"MY IP: " : a , "MY FRIENDS:\n": rows});
    });
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})