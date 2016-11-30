var express = require('express');
var router = express.Router();
//linking to account model
var Account = require('../models/account');
//reference to passport
var passport = require('passport');
//reference to flash
var flash = require('connect-flash');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Assignment-2',
    message: 'Gadget byuing and selling application',
      user: req.user
  });
});
//GET register page
router.get('/registration',function (req, res, next) {
res.render('registration',{
  title: 'Register',
    user: req.user

});
});
//POST
router.post('/registration',function (req,res,next) {
    //use account model
Account.register(new Account({ username: req.body.username}),req.body.password,
function (err,account) {
    if(err)
    {
      console.log(err);
      res.redirect('/registration');
    }
    else
    {
      res.redirect('/login');
    }
});
});
//get login
router.get('/login',function (req, res ,next) {
    var messages = req.session.messages || [];

    //clear the session
    req.session.messages = [];
    res.render('login',{
      title: 'Login',
        messages: messages,
        user: req.user
    });
});
//POST
router.post('/login',passport.authenticate('local', {
  successRedirect: '/gadgets',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login',
    failureFlash: true
}));

//GET logout
router.get('/logout',function (req, res, next) {
  //redirect the user
    req.logout();
    res.redirect('/login');
});
module.exports = router;
