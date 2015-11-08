var express = require('express');
console.log(typeof express);
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/userlist',function (req , res){
	var db = req.db;
	var collection = db.get('mycollection');
	collection.find({} , {} , function(e , docs){
		res.render('userlist' , {
			"userlist" : docs
		});
	});

	router.get('/newuser',function(req , res){
		res.render('newuser',{title : 'Add new user'})
	});

	router.post('/adduser',function(req , res){
		var db = req.db;
		var uname = req.body.username;
		var umail = req.body.usermail;
		var collection = db.get('mycollection');
		collection.insert({
			"name" : uname,
			"email" : umail
		},function(err , doc){
			if(err){
				res.send("Failed");
			}
			else {
				res.redirect("userlist");
			}
		});
	});
	router.get('/test',function(req , res){
		res.send("success");
	});
});

module.exports = router;
