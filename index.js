var express = require('express');
var request = require('request');
var path = require('path');

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static('public'));




app.listen(3000, function() {
  console.log('Node luistert op poort 3000');
});

console.log("Webserver draait");

var data;
request('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek6/MapServer/585/query?where=1%3D1&outFields=*&outSR=4326&f=json',
  function(error, response, body){
    data = JSON.parse(body);

  }
);

app.get('/',function(req,res){
  res.render('home');
});

app.get('/map', function(req, res){
  res.render('map', {
    parkings: data
  });
});

app.get('/list', function(req, res){
  res.render('list', {
    parkings: data
  });
});
