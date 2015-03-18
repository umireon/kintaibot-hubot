# Description:
#   Example scripts for you to examine and try out.
#
# Notes:
#   They are commented out by default, because most of them are pretty silly and
#   wouldn't be useful and amusing enough for day to day huboting.
#   Uncomment the ones you want to try and experiment with.
#
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

moment = require 'moment'

module.exports =
  getFiscalDate: (date) ->
    do (date = moment(date)) ->
      fdate = date.subtract 14, "days"

  padWith: (padding, data) ->
    do (padding = padding.toString(), data = data.toString()) ->
      (padding + data).slice -padding.length

  getKintaiId: (date) ->
    fdate = this.getFiscalDate date
    fdate.format("YYYYMM")

  addKintai: (user, date, remarks, db) ->
    kintaiId = this.getKintaiId date
    do (date = moment date) ->
      dbKintaiId = db[kintaiId] ?= {}
      dbUser = dbKintaiId[user] ?= {}
      dbUser[date.toISOString()] = remarks
      return

  getKintaiById: (db, kintaiId) ->
    db[kintaiId]
