var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
//
var categories = require('./routes/categories');
var mood = require('./routes/mood');
var article = require('./routes/article');
/*
var life = require('./routes/life');
var program = require('./routes/program');
var culture = require('./routes/culture');
var about = require('./routes/about');
*/
//---config---

var Config = require('./common/Config');
//back
var categoryController = require('./routes/back/CategoryController');
var moodController = require('./routes/back/MoodController');
var loginController = require('./routes/back/LoginController');
var articleController = require('./routes/back/ArticleController');
var uploadController = require('./routes/back/UploadController');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//-----------------------------session----------------------------/
app.use(session({
  secret: 'keyboard cat',
  key: 'sid',
  cookie: { secure: false } // true https专用 详见官网
}));
//-----------------------------session----------------------------/
//----------------------自定义拦截器------------------------------/
//全局拦截器(这个和app.use的顺序位置有关系)
//还可以用 app.all()
app.use(function(req, res, next) {
  var url = req.originalUrl;
  //访问后端跳转到登陆
  if(url.indexOf("/back/cms") >= 0 && !req.session.user){
      //登陆 静态资源 跳过
      var b = false;
      var len = Config.excludeUrl.length;
      var tmp = url.split(".");
      for(var i = 0; i < len; i++){
         var item = Config.excludeUrl[i];
         if(url == item
            || item == ("." + tmp[tmp.length -1])){
            b = true;
         }
      }
      console.log(b);
      if(b){
          return next();
      }
      return res.redirect("/back/cms/login/ui");
  }
  return next();
});

//----------------------自定义拦截器------------------------------/
app.use('/', routes);
app.use('/users', users);
//categories
app.use('/', categories);
app.use('/',mood);
app.use('/',article);
//app.use('/life',life);
//app.use('/culture',culture);
//app.use('/program',program);
//app.use('about',about);

//-----------------back------------------------------//
app.use('/back/cms',categoryController);
app.use('/back/cms',moodController);
app.use('/back/cms',loginController);
app.use('/back/cms',articleController);
app.use('/back/cms',uploadController);

//---------------------------------------------------//


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //var err = new Error('Not Found');
  //err.status = 404;
  //next(err);
  res.render("404");
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
  //res.render("500");
});



module.exports = app;
