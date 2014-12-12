var mongoose = require('mongoose');
var Pages = mongoose.model('Pages');

module.exports = function (app) {
  'use strict';

  var router = app.get('router');

  router.route('/page/:id')
    .delete(function(req, res) {
      var id = req.params.id;
      Pages.findOneAndRemove({_id: id}, function(err){
        return res.json({success: !err});
      });
    })
    .put(function(req, res) {
      var id = req.params.id;
      var put = req.body;
      put.updatedAt = Date.now();
      delete put._id;
      Pages.findOneAndUpdate({_id: id}, put, function (err, data) {
        res.json({ success: !err, data: data, error: err });
      });
    });

  router.route('/page')
    .post(function(req, res) {
      var post = new Pages();
      post.save(function(err) {
        res.json({ success: !err, data: {page: post}, error: err });
      });
    })
    .get(function(req, res) {
      Pages.find({user: req.user._id})
        .sort({createdAt:'desc'})
        .exec(function (err, pages) {
          res.json({ success: !err, data: {pages: pages}, error: err });
        });
    });

};