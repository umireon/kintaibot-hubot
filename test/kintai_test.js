var mocha = require("mocha");
var describe = mocha.describe, it = mocha.it;
var beforeEach = mocha.beforeEach, afterEach = mocha.afterEach;
var expect = require("chai").expect;

var path = require("path");
var _ = require("lodash");

var Robot = require("hubot/src/robot");
var TextMessage = require("hubot/src/message").TextMessage;

describe("kintai", function() {
  "use strict";
  var robot;
  var userId = "1";

  beforeEach(function(done) {
    robot = new Robot(null, "mock-adapter", false, "kintai");

    robot.adapter.on("connected", function() {
      robot.loadFile(path.resolve("scripts"), "kintai.coffee");
      done();
    });

    robot.brain.userForId(userId, {
      name: "mocha",
      room: "#mocha"
    });

    robot.run();
  });

  afterEach(function() {
    robot.shutdown();
  });

  function send(text, timeout) {
    var user = robot.brain.userForId(userId);
    var msg = new TextMessage(user, text);
    setTimeout(function() {
      robot.adapter.receive(msg)
    }, timeout);
  }

  it("should okey", function(done) {
    robot.adapter.on("reply", function(envelope, strings) {
      expect(strings[0]).to.match(/mocha/);
      expect(strings[0]).to.match(/出勤/);
      done();
    })
    send("kintai: 出勤");
  });

  it("should okey", function(done) {
    robot.adapter.on("reply", function(envelope, strings) {
      if (/201503/.test(strings[0])) {
        done();
      }
    });
    send("kintai: 出勤です", 10);
    send("kintai: 今日は退勤します", 20);
    send("kintai: list 201503", 30);
  });
});
