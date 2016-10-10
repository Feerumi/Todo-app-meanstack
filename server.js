var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var api = require('./apiroutes/apirouter')

var app = express();
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));

app.use('/api',api);

app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));


app.use(express.static('client'));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("todoserver listening at: ", addr.address + ":" + addr.port);
});

