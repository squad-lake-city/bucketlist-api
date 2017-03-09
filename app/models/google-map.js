'use strict';

const mongoose = require('mongoose');

const googleGoogleMapSchema = new mongoose.Schema({

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

const GoogleMap = mongoose.model('GoogleMap', googleGoogleMapSchema);

module.exports = GoogleMap;
