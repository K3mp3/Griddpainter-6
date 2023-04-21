const mysql = require("mysql2")

connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "griddpainter-6",
    password: "griddpainter-6",
    database: "griddpainter-6"
});

module.exports = connection;