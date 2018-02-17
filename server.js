'use strict';
var http = require('http');
var sql = require('mssql');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    var config = {
        user: 'node',
        password: 'node',
        server: 'localhost',
        database: 'IMS1.0',
        options: { encrypt: false }
    };

    var connection = new sql.Connection(config);

    connection.connect(function (err) {
        if (err) {
            res.status(500).send(err); return;
        }

        var request = new sql.Request(connection);

        var sqlString = 'SELECT * FROM DBO.Inventory';
        request.query(sqlString, function (err, rs) {
            connection.close();

            if (err) {
                res.status(500).send(err); return;
            }

            for (var i = 0; i < rs.length; i++)
                res.write(rs[i].Name);

            res.end();
        });
    })

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
}).listen(port);
