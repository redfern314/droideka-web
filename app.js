
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
  app.set('view engine', 'jade');
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
  console.log("??");
  Droid.find({}).exec(function(err,droid) {
    console.log(droid[0]);
    console.log(droid[0].Bytes);
    res.send(droid[0].Bytes);
  });
  // res.send(String.fromCharCode(0)+String.fromCharCode(0)+String.fromCharCode(1));
}

savedata = function(req, res) {
  bytes = req.body.bytes;

  Droid.find({}).exec(function(err,droid) {
    console.log("??");
    if(err) {
      console.log("Error: ", err);
    } else {
      if(droid[0]) {
        droid[0].Bytes = bytes;
        droid[0].save();
        console.log("Found");
        console.log(droid[0]);
      } else {
        var new_droid = new Droid({name:"mit",Bytes:bytes});
        new_droid.save();
        console.log(new_droid);
        console.log("Database entry had to be recreated.");;
      }
      res.send("Data saved.\n");
    }
  });
  console.log("??");
}

app.get('/', function(req, res) {
  res.render("tweets");
});
app.post('/', savedata);
app.get('/droid', senddata);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
