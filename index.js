var express = require('express')
var linksCtrl = require("./controllers/links")
var app = express();
var bodyParser = require('body-parser');
var db = require("./models")

    app.set("view engine", "ejs");

    app.use(express.static(__dirname + "/public"));
    app.use("/links", linksCtrl);
    app.use(bodyParser.urlencoded({extended:false}));

    app.get("/", function(req,res){
      res.render('index')
    });

    app.listen(process.env.PORT || 3000, function(){
      "App is listening on port 3000"
    });