var mongoose = require('mongoose');
var Tournaments = mongoose.model('Tournaments');

module.exports = function (app) {
  'use strict';

  var router = app.get('router');

  router.get('/tournaments/:id', function(req, res) {
    var id = req.query.id;
    Tournaments.findById(id).lean().exec(function (err, t) {
      res.json({ success: !err, data: {tournament: t}, error: err });
    });
  });
  //  .delete(function(req, res) {
  //    var id = req.params.id;
  //      Tournaments.findOneAndRemove({_id: id}, function(err){
  //      return res.json({success: !err});
  //    });
  //  })
  //  .put(function(req, res) {
  //    var id = req.params.id;
  //    var put = req.body;
  //    put.updatedAt = Date.now();
  //    delete put._id;
  //    Tournaments.findOneAndUpdate({_id: id}, put, function (err, data) {
  //      res.json({ success: !err, data: data, error: err });
  //    });
  //  });

  router.post('/tournaments', function(req, res) {
    var t = new Tournaments();
    t.title = req.body.title;
    t.tournamentType = req.body.type;
    t.creator = req.user.id;
    t.status = 'waiting';
    t.save(function(err) {
      res.json({ success: !err, data: {page: t}, error: err });
    });
  });
  //  .get(function(req, res) {
  //    Pages.find({user: req.user._id})
  //      .sort({createdAt:'desc'})
  //      .exec(function (err, pages) {
  //        res.json({ success: !err, data: {pages: pages}, error: err });
  //      });
  //  });

};