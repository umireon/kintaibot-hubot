var mocha = require("mocha");
var describe = mocha.describe, it = mocha.it;
var expect = require("chai").expect;
var _ = require("lodash");

describe("moment", function() {
  "use strict";
  var moment = require("moment");

  function testMomentForData(data) {
    var m = moment(data.arg).subtract(14, "days");
    expect(m.year()).to.be.equal(data.year);
    expect(m.month()).to.be.equal(data.month);
  }

  it("should okey", function() {
    var former = _.range(15, 28).map(function(d) {
      return {arg: [2015, 2, d], year: 2015, month: 2};
    });
    var latter = _.range(1, 14).map(function(d) {
      return {arg: [2015, 3, d], year: 2015, month: 2};
    });
    former.concat(latter).forEach(testMomentForData);
  });

  it("should okey", function() {
    [
      {arg: [2015, 1, 14], year: 2015, month: 0},
      {arg: [2015, 1, 15], year: 2015, month: 1},
      {arg: [2015, 2, 14], year: 2015, month: 1},
      {arg: [2015, 2, 15], year: 2015, month: 2}
    ].forEach(testMomentForData);
  });

  it("should okey", function() {
    [
      {arg: [2015, 0, 14], year: 2014, month: 11},
      {arg: [2015, 0, 15], year: 2015, month: 0}
    ].forEach(testMomentForData);
  });
});
