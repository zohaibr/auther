'use strict';

var router = require('express').Router();

var HttpError = require('../../utils/HttpError');
var User = require('./user.model');
var Story = require('../stories/story.model');

router.param('id', function (req, res, next, id) {
  User.findById(id)
  .then(function (user) {
    if (!user) throw HttpError(404);
    req.requestedUser = user;
    next();
    return null;
  })
  .catch(next);
});

router.get('/', function (req, res, next) {
  User.findAll({})
  .then(function (users) {
    res.json(users);
  })
  .catch(next);
});

router.post('/', function (req, res, next) {
  User.create(req.body)
  .then(function (user) {
    res.status(201).json(user);
  })
  .catch(next);
});

router.get('/logout', function (req, res, next){
  console.log('it is destroying');
  req.session.destroy();
  res.sendStatus(204);
});

router.get('/:email/:password', function(req, res, next) {
  console.log('it is logging');
  User.findOne({where:{
    email: req.params.email,
    password: req.params.password
  }})
  .then(function(user){
    if (!user){
      res.sendStatus(404);
    } else {
      res.send(user);
    }
  })
  .catch(next)
});

router.post('/:email/:password', function (req, res, next) {
  console.log('reached post')
  User.create({
    email: req.params.email,
    password: req.params.password
  })
  .then(function (user) {
    res.status(201).json(user);
  })
  .catch(next);
});


router.get('/:id', function (req, res, next) {
  req.requestedUser.reload(User.options.scopes.populated())
  .then(function (requestedUser) {
    res.json(requestedUser);
  })
  .catch(next);
});

router.put('/:id', function (req, res, next) {
  req.requestedUser.update(req.body)
  .then(function (user) {
    res.json(user);
  })
  .catch(next);
});

router.delete('/:id', function (req, res, next) {
  req.requestedUser.destroy()
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});

// router.post('/login', (req, res, next) => {
//   User.findOne({
//     where: req.body
//   })
//   .then((user) => {
//     if (!user)
//     {res.sendStatus(401)
//     } else {
//       req.session.userId = user.id;
//       res.sendStatus(204);
//   }
//   })
//   .catch(next);
// })

module.exports = router;
