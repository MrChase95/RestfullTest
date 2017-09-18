var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
var objectId = require('mongodb').ObjectID;
var md5 = require("md5");

var url = "mongodb://admin:admin@ds139964.mlab.com:39964/pokemon"

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { itens: [], errors: [] });
  req.session.errors = null;
});

router.post('/get-data', function (req, res, next) {
  var resultArray = [];
  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    if (req.body.id != ''){
      var cursor = db.collection('user').find();
      cursor.forEach(function (doc) {
        assert.equal(null, err);
        if (req.body.id == doc._id){
          resultArray.push(doc);
        }

      }, function () {
        //db.close();
        res.render('index', { itens: resultArray, errors: [] });
      });
    } else {
    var cursor = db.collection('user').find();
    cursor.forEach(function (doc) {
      assert.equal(null, err);
      console.log(doc._id.valueOf().toString());
      //console.log(req.body.id.toString());
      console.log();
      
      
        resultArray.push(doc);
        
      
      
    }, function () {
      //db.close();
      res.render('index', { itens: resultArray, errors: [] });
    });
  }
  });
});

router.post("/submit", function (req, res, next) {

  //console.log(errors);
  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    var cursor = db.collection('user').find();
    cursor.forEach(function (doc) {
      assert.equal(null, err);
      if (req.body.email == doc.userEmail) {
        console.log("aqui");

        return null;
        //db.close();
        res.redirect("/");
      }
    });

    req.checkBody("email", "Email invalido").isEmail();
    req.checkBody("senha", "Senha Invalida").isLength({ min: 4 }).equals(req.body.confirmesenha);
    //req.check("telefone", "Telefone Invalido").isMobilePhone('en-US');
  
    var flag = false;
    var errors = req.validationErrors();
    //db.close();
    //res.render('index', {itens : resultArray});
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;

      console.log(errors.array);
      //presentErrors(errors, req, res);
      res.render("index", {errors: errors, itens : []});
      console.log("error");
    } else if (!errors) {
      req.session.success = true;
      var email = req.body.email;
      var name = req.body.name;
      var pw = md5(req.body.senha);
      var date = new Date().getDate().toString() + "/" + (new Date().getMonth() + 1).toString() + "/" + new Date().getFullYear().toString()
      var telefones = req.body.telefone; /*function(){
          var temp = req.body.telefone;
          console.log(temp);
          var temp2 = []
          temp.forEach(function(item){
            temp2.push(item.value);
    
          });
          return JSON.stringify(temp2);
        }*/
      var item = {
        userEmail: email,
        userName: name,
        userPassword: pw,
        telefone: telefones,
        dt_criacao: date
      };

      //mongo.connect(url, function(err, db){

      assert.equal(null, err);
      db.collection("user").insert(item, function (err, result) {

        assert.equal(null, err);
        console.log("YEEEY");
        db.close()
      });

      //});
      res.redirect("/");
    }

  });

});


router.post('/update', function (req, res, next) {
  mongo.connect(url, function (err, db) {

    if (req.body.name == '' && req.body.email == "") {
      var item = {
        telefone: req.body.telefone
      }
    } else if (req.body.name == '' && req.body.telefone == "") {
      var item = {
        userEmail: req.body.email
      }
    } else if (req.body.email == '' && req.body.telefone == "") {
      var item = {
        userName: req.body.name
      }
    } else if (req.body.name == '') {
      var item = {
        telefone: req.body.telefone,
        userEmail: req.body.email
      }
    } else if (req.body.email == '') {
      var item = {
        telefone: req.body.telefone,
        userName: req.body.name
      }
    } else if (req.body.telefone == '') {
      var item = {
        userName: req.body.name,
        userEmail: req.body.email
      }
    } else {
      var item = {
        userName: req.body.name,
        userEmail: req.body.email,
        telefone: req.body.telefone,
      }
    }

    var id = req.body.id;

    assert.equal(null, err);
    db.collection('user').update({ "_id": objectId(id) }, { $set: item }, function (err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
  res.redirect("/")
});

router.post('/delete', function (req, res, next) {
  var id = req.body.id;

  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    db.collection('user').deleteOne({ "_id": objectId(id) }, function (err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });
  res.redirect("/");
});

function presentErrors(errors, req, res) {
  var temp = req.body.errorsSpace;
  console.log("PresentErrors");
  /*for(var i =0; i < errors.length; i++){
    temp += "<p>"+ errors[i].msg + "</p>"
  }*/

  res.render('index', { err: errors, itens: [] })
}

module.exports = router;
