const mysql = require('mysql');
const mysql_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Angel@0595.com',
    database: 'celfactor'
});
mysql_connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connection established with MySQL!');
    }
});

module.exports = mysql_connection;