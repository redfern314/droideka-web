
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
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
  // Droid.findOne().exec(function(err,droid) {
  //   console.log(droid);
  //     res.send(droid.Bytes);
  // });
  res.send("001");
}

savedata = function(req, res) {
  bytes = req.body.bytes;
  location = req.body.location;

  console.log(bytes);
  console.log(target);

  Droid.findOne({}).exec(function(err,droid) {
    if(err) {
      console.log("Error: ", err);
    } else {
      if(droid) {
        droid.Bytes = bytes;
        droid.save();
        console.log(droid);
      } else {
        var new_droid = new User({Bytes:bytes});
        new_droid.save();
        console.log(new_droid);
        console.log("Database entry had to be recreated.");;
      }
      res.send("Data saved.\n");
    }
  });
}

app.get('/', function(req, res) {
  res.render("tweets");
});
app.post('/', savedata);
app.get('/droid', senddata);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
