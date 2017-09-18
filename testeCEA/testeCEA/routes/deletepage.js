var express = require('express');
var router = express.Router();

router.get('/deletePage', function(req, res, next){
    res.render('deletePage', {title: "Deleting User"});

});

module.exports = router;