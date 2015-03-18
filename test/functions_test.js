var mocha = require("mocha");
var describe = mocha.describe, it = mocha.it;
var expect = require("chai").expect;
var _ = require("lodash");
var unflatten = require("flat").unflatten;

describe("functions", function() {
  "use strict";
  var functions = require("../src/functions");

  describe("#getFiscalDate", function() {
    function testGetFiscalDateForData(data) {
      var d = functions.getFiscalDate(data.arg);
      expect(d.year()).to.be.equal(data.year);
      expect(d.month()).to.be.equal(data.month);
    }

    it("discriminates month", function() {
      [
        {arg: [2015, 1, 14], year: 2015, month: 0},
        {arg: [2015, 1, 15], year: 2015, month: 1},
        {arg: [2015, 2, 14], year: 2015, month: 1},
        {arg: [2015, 2, 15], year: 2015, month: 2}
      ].forEach(testGetFiscalDateForData);
    });

    it("discriminates year", function() {
      [
        {arg: [2015, 0, 14], year: 2014, month: 11},
        {arg: [2015, 0, 15], year: 2015, month: 0}
      ].forEach(testGetFiscalDateForData);
    });
  });

  describe("#padWith", function() {
    function testPadWithForData(data) {
      var d = functions.padWith("00", data.arg);
      expect(d).to.be.equal(data.str);
    }

    it("pads month", function() {
      var one = _.range(1, 9).map(function(m) {
        return {arg: m, str: "0" + m.toString()};
      });
      var two = _.range(10, 12).map(function(m) {
        return {arg: m, str: m.toString()};
      });
      one.concat(two).forEach(testPadWithForData);
    });
  });

  describe("#getKintaiId", function() {
    it("generates 199701 from Date", function() {
      var date = new Date(1997, 0, 15);
      var str = "199701";
      expect(functions.getKintaiId(date)).to.be.equal(str);
    });
  });

  describe("#addKintai", function () {
    var moment = require("moment");
    function testAddKintaiForData(data) {
      var db = {};
      functions.addKintai(data.user, data.date, data.remarks, db);
      var date = moment(data.date).toISOString();
      //var key = [data.kintaiId, data.user, date.replace(/\./g, "\\.")];
      expect(db["201503"]["mocha"]["2015-03-14T15:00:00.000Z"]).to.be.equal(data.remarks);
    }

    it("records", function() {
      testAddKintaiForData({
        user: "mocha",
        date: [2015, 2, 15],
        remarks: "attend",
        kintaiId: "201503"
      });
    });
  });

  describe("#getKintaiById", function () {
    var moment = require("moment");
    it("gets records", function () {
      var db = {"201503": "kintai"};
      var kintai = functions.getKintaiById(db, "201503");
      expect(kintai).to.be.equal("kintai");
    });

    it("gets an added record", function () {
      var data = {
        user: "mocha",
        date: [2015, 2, 15],
        remarks: "attend",
        kintaiId: "201503"
      };

      var db = {};
      functions.addKintai(data.user, data.date, data.remarks, db);
      var kintai = functions.getKintaiById(db, data.kintaiId);
      var date = moment(data.date).toISOString();
      var key = [data.user, date.replace(/\./g, "\\.")].join(".");
      expect(db["201503"]["mocha"]["2015-03-14T15:00:00.000Z"]).to.be.equal(data.remarks);
    });
  });
});
