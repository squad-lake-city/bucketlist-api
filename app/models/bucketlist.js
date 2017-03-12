'use strict';

const mongoose = require('mongoose');

// Bucketlist Schema
// requires an owner, a completion status, a placeId, an activity, and location
// for each bucketlist.

const bucketlistSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true,
  },
  placeId: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
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
    transform: function(doc, ret, options) {
      let userId = (options.user && options.user._id) || false;
      ret.editable = userId && userId.equals(doc._owner);
      return ret;
    },
  },
  toObject: {
    virtuals: false
  }
});

const Bucketlist = mongoose.model('Bucketlist', bucketlistSchema);

module.exports = Bucketlist;
