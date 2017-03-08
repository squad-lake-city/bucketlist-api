'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Bucketlist = models.bucketlist;

const authenticate = require('./concerns/authenticate');
const setUser = require('./concerns/set-current-user');
const setModel = require('./concerns/set-mongoose-model');

const index = (req, res, next) => {
  Bucketlist.find()
    .then(bucketlists => res.json({
      bucketlists: bucketlists.map((e) =>
        e.toJSON({ virtuals: false, user: req.user })),
    }))
    .catch(next);
};

const show = (req, res) => {
  res.json({
    bucketlist: req.bucketlist.toJSON({ virtuals: false, user: req.user }),
  });
};

const create = (req, res, next) => {
  let bucketlist = Object.assign(req.body.bucketlist, {
    _owner: req.user._id,
  });
  Bucketlist.create(bucketlist)
    .then(bucketlist =>
      res.status(201)
        .json({
          bucketlist: bucketlist.toJSON({ virtuals: false, user: req.user }),
        }))
    .catch(next);
};

const update = (req, res, next) => {
  delete req.body._owner;  // disallow owner reassignment.
  req.bucketlist.update(req.body.bucketlist)
    .then(() => res.sendStatus(204))
    .catch(next);
};

const destroy = (req, res, next) => {
  req.bucketlist.remove()
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Bucketlist), only: ['show'] },
  { method: setModel(Bucketlist, { forUser: true }), only: ['update', 'destroy'] },
], });
