'use strict';

const mongoose = require('mongoose');

const bucketlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  place_id: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true,
  },
  complete: {
    type: Number,
    required: true,
    validate: {
      validator: function(num) {
        if (num === 0 && num === 1) {
          return num;
        }
      },
      message: 'Please check one of the boxes'
    }
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
  toObject: {
    virtuals: false
  }
});

const Bucketlist = mongoose.model('Bucketlist', bucketlistSchema);

module.exports = Bucketlist;
