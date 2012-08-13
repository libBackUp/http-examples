/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var https = require('https')
    , crypto = require('crypto')
    , fs = require("fs")
    , privateKey = fs.readFileSync('foobar-ssl.key').toString()
    , certificate = fs.readFileSync('foobar-ssl.crt').toString()
    , credentials = {
          key: privateKey
        , cert: certificate
      }
    , server
    ;

  server = https.createServer(credentials, function (req, res) {
      var data = ''
        ;

      console.log(req.connection.remoteAddress + ':' + req.socket.remotePort);
      console.log(req.method + ' ' + req.url);
      req.on('data', function (chunk) {
        data += chunk.toString('utf8');
      });
      req.on('end', function () {
        console.log(data.toString('utf8'));
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
      });
  });
  server.listen(8443, function () {
    console.log('Listening on https://'
      + server.address().address
      + ':' + server.address().port
    );
  });
}());