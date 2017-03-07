'use strict';

// Allow chai syntax like `expect(foo).to.be.ok;`
// jshint -W030

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

const bucketlist = require('../lib/bucketlist');

describe('Sync', function () {
  it('is true', function () {
    expect(bucketlist.sync(true)).to.be.true;
  });
});

describe('Async', function () {
  it('is true', function (done) {
    bucketlist.async(true, function (error, value) {
      if (error || value !== true) {
        error = error || new Error(`value is ${value}`);
      }

      done(error);
    });
  });
});

describe('Promise', function () {
  it('is true', function () {
    return expect(bucketlist.promise(true)).to.eventually.be.true;
  });
});
