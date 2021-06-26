const express = require('express');
const router = express.Router();
const app = express();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const CaseList = require('../models/case');
var casemodel = require('../models/case');
const path = require("path");
const { mongo } = require('mongoose');
app.set('views', path.join(__dirname, '../views'));
app.use(express.urlencoded({ extended: true }));
var assert = require('assert');

var url = 'mongodb+srv://admin:jethiya@cluster0.hjntf.mongodb.net/legal_open_diary?retryWrites=true&w=majority';

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.post('/', function(req, res, next) {
  var caseDetails = new casemodel({
    casetype: req.body.casetype,
    caseno: req.body.caseno,
    caseyear: req.body.caseyear,
    casetitlerespodent: req.body.casetitlerespodent,
    casetitlepetitioner: req.body.casetitlepetitioner,
    nextday: req.body.nextday,
    nextmonth: req.body.nextmonth,
    nextyear: req.body.nextyear,
  });

  caseDetails.save(); 
  res.redirect("/");
});

// router.get('/', (req,res) => {
//   CaseList.find({}, function(err, caselists){
//     res.render('dashboard', {
//       CaseList: caselists
//     })
//   })
// })

router.get('/get-data', function(req, res, next) {
  var result = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('caselists').find();
    cursor.forEach(function(doc,err) {
      assert.equal(null,err);
      result.push(doc);
    }, function() {
      db.close();
      res.render('dashboard', {items: result});
    });
  });
});


module.exports = router;
