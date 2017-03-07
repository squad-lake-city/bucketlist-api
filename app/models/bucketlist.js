'use strict';

const mongoose = require('mongoose');

const bucketlistSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  complete: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: false,
    transform: function (doc, ret, options) {
      let userId = (options.user && options.user._id) || false;
      ret.editable = userId && userId.equals(doc._owner);
      return ret;
    },
  },
});

const Bucketlist = mongoose.model('Bucketlist', bucketlistSchema);

module.exports = Bucketlist;
