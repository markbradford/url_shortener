var express = require('express');
var router = express.Router();
var request = require('request');
var Hashids = require('hashids');
var db = require('../models');
var bodyParser = require('body-parser');
var hashids = new Hashids('this is my jam');

// NEEDED FOR HEROKU ///////////
if(config.use_env_variable){
  var db_info = process.env[config.use_env_variable].match(/([^:]+):\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  config.dialect=db_info[1];
  config.username=db_info[2];
  config.password=db_info[3];
  config.host=db_info[4];
  config.port=db_info[5];
  config.database=db_info[6];
}
//////////////////////////////

router.use(bodyParser.urlencoded({extended:false}));


router.post('/', function(req, res){
  var query = req.body.q;

  db.link.create({ url: query }).then(function(newLink){
  var hash = hashids.encode(newLink.id);
  newLink.hash = hash;

  newLink.save().then(function(y){
    res.render('links/show', {hash: hash});
    });
  });
});

router.get('/:id', function(req, res){
  var id = req.params.id;

  db.link.find({where: {hash: id}}).then(function(link) {
  res.redirect('http://' + link.dataValues.url)
  });
});


module.exports = router;