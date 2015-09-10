var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {};
  var currentPage = req.param("currentPage");

  res.render('index', { title: "ACK'S BLOG" });
});

module.exports  = router;
