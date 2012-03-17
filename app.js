
/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , routes = require('./routes');

// DB Configuration

require('./db-connect');
var models_path = __dirname + '/models';
var model_files = fs.readdirSync(models_path);
model_files.forEach(function(file){
	require(models_path+'/'+file);
});
MessageModel = mongoose.model('Message');

// Create Server

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

app.post('/add', routes.addMessage);

var port = process.env.PORT || 10000
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
