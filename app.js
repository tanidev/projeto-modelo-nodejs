//require express
var express = require("express");

//require db and sequelize config
var db = require('./models');

var config = require("./config/config");

//require express-load
var load = require("express-load")

//require express-flash
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

//require handlebars
var expressHandlebars = require("express-handlebars");
var expressHandlebarsExtend = require("express-handlebars-extend");

//require passport to login
var passport = require("passport");

//require express-validator
var expressValidator = require("express-validator");

//init app
var app = express();

// test postgres
// require("./db/testPostgres.js");

//configure handlebars
var handlebarsInstance = expressHandlebarsExtend(expressHandlebars.create({
  defaultLayout: 'main',
  helpers: {
    formatDate: function(date, format) {
      var moment = require("moment");
      return moment(date).format(format);
    }
  }
}));

app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");

//static content
app.use(express.static("./public"));

//configure express-flash
app.use(cookieParser());
app.use(session({secret: "projetomodelo"}));
app.use(flash());
app.use(require("./middlewares/capturemessage"));

//configure bodyParser
app.use(bodyParser.urlencoded({extended: false}));

//configure passport to login
require("./middlewares/passport-config")(passport, db);

//configure login
app.use(passport.initialize());
app.use(passport.session());
app.use(require("./middlewares/login"));
app.set("passport", passport);

//configure expressValidator
app.use(expressValidator({
  customValidators: {
    isDate: function(value) {
        var moment = require("moment");
        return moment(value, "DD/MM/YYYY").isValid();
    }
  }
}));

//load controllers and routes
load("controllers").then("routers").into(app);

function startApp() {
  app.listen(process.env.PORT || config.port, function () {
      console.log("Server rodando [App: " + config.app.name + "]:[Port: " + (process.env.PORT || config.port) +"]");
  });
}

//test connection with sequelize
db.sequelize.sync()
  .then(startApp)
  .catch(function (e) {
      throw new Error(e);
});
// app.listen(3000);
