
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , Droid = require('./models/models.js'),
  mongoose = require('mongoose');

var app = express();

app.configure(function(){
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost');
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
  // app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

senddata = function(req, res) {
  console.log("I'm sending.");
  Droid.findOne().exec(function(err,droid) {
    console.log(droid);
    console.log(droid.Bytes);
    res.send(droid.Bytes);
  });
  // res.send(String.fromCharCode(0)+String.fromCharCode(0)+String.fromCharCode(1));
}

savedata = function(req, res) {
  bytes = req.body.bytes;
  console.log(bytes);
  console.log("I'm saving.");

  Droid.findOne().exec(function(err,droid) {
    if(err) {
      console.log("Error: ", err);
    } else {
      if(droid) {
        droid.Bytes = bytes;
        droid.save(function (err) {
          res.send("Data saved.\n");
        });
        console.log("Found");
        console.log(droid);
      } else {
        var new_droid = new Droid({name:"mit",Bytes:bytes});
        new_droid.save(function (err) {
          res.send("Data saved.\n");
        });
        console.log(new_droid);
        console.log("Database entry had to be recreated.");;
      }
    }
  });
}

app.get('/', function(req, res) {
  res.render("index.html");
});
app.post('/', savedata);
app.get('/droid', senddata);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
