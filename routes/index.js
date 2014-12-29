var express = require('express');
var router = express.Router();

/* GET home page. */
    module.exports = function(app) {
      app.get('/', function (req, res) {
        res.render('index', { title: 'Home' });	// 渲染视图模板
      });

      // 注册路由=规则
      app.get('/reg',function (req,res) {
      	res.render('register',{title:'Register'});
      });
      app.post('/reg',function (req,res) {
      	var name = req.body.name,
      		password = req.body.password,
      		password_re = req.body['passport-repeat'];
      	// 检验两次输入密码是否一致
      	// check the two password isn't same
      	if (password_re != password) {
      		req.flash('err','twice password inconsistent');
      		return res.redirect('/reg'); // 重定向
      	}
      	// 生成md5
      	// generate md5
      	var md5 = crypto.crypto.createHash('md5');
      		password = md5.update(req.body.password).digest('hex');
      	var newUser	= new User({
      		name:name,
      		password:password,
      		email:req.body.email
      	});	
      	// 检查用户是否已经存在
      	// check user isn't exist
      	User.get(newUser.name,function (err,user) {
      		if (err) {
      			req.flash('error',err);
      			return res.redirect('/'); 
      		}
      		if (user) {
      			req.flash('error','user exist!');
      			return res.redirect('/reg'); 
      		}
      		// 不存在，则新增用户
      		// new user
      		newUser.save(function (err,user) {
      			if (err) {
      				req.flash('error',err);
      				return res.redirect('/reg');
      			}
      			req.session.user = user;
      			req.flash('success','register success!');
      			req.redirect('/');
      		});
      	});
      });

      //
      app.get('/login',function (req,res) {
      	res.render('login',{title:'login'});
      });
      app.post('/login',function (req,res) {

      });
      app.get('/logout',function (req,res) {
      	res.render('logout',{title:'logout'});
      });
      app.post('/logout',function (req,res) {

      });
      app.get('/add',function (req,res) {
      	res.render('add',{title:'add'});
      });
      app.post('/add',function (req,res) {

      });
      app.get('/edit',function (req,res) {
      	res.render('/edit',{title:'edit'});
      });
      app.post('/edit',function (req,res) {

      });
      // app.get('/')	
    };
