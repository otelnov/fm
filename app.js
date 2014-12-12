var express = require('express');
var app = express();
var compression = require('compression');
var bodyParser = require('body-parser');
//var multer  = require('multer');
var passport = require('passport');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(expressSession);

app.use(bodyParser.json());
//app.use(multer({}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(compression());

require('./config')(app);
require('./models')();

var config = app.get('config');
var router = express.Router();
app.set('router', router);

app.use(expressSession({
  secret: config.server.SESSION_SECRET,
  store: new MongoStore({url: config.server.MONGO_DB}),
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

var port = process.env.PORT || config.server.PORT;
app.listen(port);
console.log('app start on port ' + port);

require('./controllers')(app);