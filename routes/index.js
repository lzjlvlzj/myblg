var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {};
  var currentPage = req.param("currentPage");

  res.render('index', { title: "个人博客-IT技术分享个人博客网站" });
});

module.exports  = router;
