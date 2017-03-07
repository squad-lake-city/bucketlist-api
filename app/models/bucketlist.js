'use strict';

const mongoose = require('mongoose');

const bucketlistSchema = new mongoose.Schema({
  location: {
    longitude: {
      type: Number,
      required: true,
      validate: {
        validator: function(num) {
        if (num <= 180 && num >= -180) {
          return num;
        }
      },
      message: 'Must be between -90 and 90'
      }
    },
    latitude: {
      type: Number,
      required: true,
      validate: {
        validator: function(num) {
        if (num <= 90 && num >= -90) {
          return num;
        }
      },
      message: 'Must be between -90 and 90'
      }
    }
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
    virtuals: true,
    transform: function (doc, ret, options) {
      let userId = (options.user && options.user._id) || false;
      ret.editable = userId && userId.equals(doc._owner);
      return ret;
    },
  },
  toObject: {
    virtuals: true
  }
});

bucketlistSchema.virtual('isNorthernHemisphere?').get(function() {
  let equator = 0;
  if (this.latitude > equator) {
    return true;
  } else {
    return false;
  }
});

bucketlistSchema.virtual('isSoutherHemisphere?').get(function() {
  let equator = 0;
  if (this.latitude < equator) {
    return true;
  } else {
    return false;
  }
});

bucketlistSchema.virtual('isWesternHemisphere?').get(function() {
  let pole = 0;
  if (this.longitude < pole) {
    return true;
  } else {
    return false;
  }
});

bucketlistSchema.virtual('isEasternHemisphere?').get(function() {
  let pole = 0;
  if (this.longitude > pole) {
    return true;
  } else {
    return false;
  }
});

const Bucketlist = mongoose.model('Bucketlist', bucketlistSchema);

module.exports = Bucketlist;
