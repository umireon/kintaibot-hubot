# Description:
#   Example scripts for you to examine and try out.
#
# Notes:
#   They are commented out by default, because most of them are pretty silly and
#   wouldn't be useful and amusing enough for day to day huboting.
#   Uncomment the ones you want to try and experiment with.
#
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

moment = require "moment"
yaml = require "js-yaml"
functions = require "../src/functions"

module.exports = (robot) ->
  robot.respond /list\s+(\d*)/i, (msg) ->
    kintaiId = msg.match[1]
    db = robot.brain.get "kintai"
    dbKintai = functions.getKintaiById db, kintaiId
    if dbKintai?
      doc = yaml.safeDump dbKintai
      msg.reply "#{kintaiId}\r\n#{doc}"
    else
      msg.reply "#{kintaiId}\r\nなんにもないよー"

  robot.respond /(.*(?:出勤|退勤).*)/i, (msg) ->
    user = msg.message.user.name
    date = moment()
    remarks = msg.match[1]

    db = robot.brain.get("kintai") ? {}
    functions.addKintai user, date, remarks, db
    robot.brain.set "kintai", db

    msg.reply "#{user}-san，「#{remarks}」なの？"
