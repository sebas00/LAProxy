var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var confRouter = require('./routes/conf');
var robloxRouter =  require('./routes/roblox');

var helmet = require('helmet');

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT botname FROM botinfo WHERE botname = $1;', ['sebtest'], (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

var app = express();
app.locals.la  = require('./liveagent-sdk-nodejs/liblist');
app.locals.clients = [];
app.locals.db = client;
app.use(helmet())
//app.locals.clients = [];
//app.locals.reso;

app.locals.opt = {
    endpointUrl: "https://d.gla3-phx.gus.salesforce.com/chat/rest/", // example: https://endpoint.saleforce.com/chat/rest/
    version: 48,
    organizationId: "00DB0000000YRSt",
    deploymentId: "572B00000001Oue",
    buttonId: "573B00000001Y96",
    botid: "appie"
    
}





// proxy: "http://{proxy url}:{proxy port}", // example: http://proxy.server.com:8080
app.locals.clientInfo = {
    name: "example client",
    language: "en_US",
    screenResolution: "none",
    visitorName: "wsProxy",
}




app.locals.respo = {now : "here", numby :1};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/conf', confRouter);
app.use('/roblox', robloxRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
