'use strict'

var request = require('request-promise-native')

function EasyTrackOBot (username, token) {
  this.username = username
  this.token = token
}

EasyTrackOBot.prototype.uploadGame = function (game, responseReadyCallback) {
  /* ------ DEBUG ------ */
  // console.log(JSON.stringify(game));
  // console.log(username);
  // console.log(token);

  var options = {
    method: 'POST',
    uri: 'https://trackobot.com/profile/results.json?username=' + this.username + '&token=' + this.token,
    body: game,
    headers: {
      'Content-Type': 'application/json'
    },
    resolveWithFullResponse: true,
    json: true
  }

  request(options)
    .then(function (response) {
      let rsp = {
        'success': true,
        'code': response.statusCode,
        'message': 'Game uploaded with success',
        'data': response.body
      }
      responseReadyCallback(rsp)
    }).catch(function (response) {
      let rsp = {
        'success': false,
        'code': response.error.status,
        'message': response.error.error,
        'data': null
      }
      responseReadyCallback(rsp)
    })
}

EasyTrackOBot.prototype.createNewUser = function (responseReadyCallback) {
  var options = {
    method: 'POST',
    uri: 'https://trackobot.com/users.json',
    resolveWithFullResponse: true
  }

  request(options)
    .then(function (response) {
      let rsp = {
        'success': true,
        'code': response.statusCode,
        'message': 'User created with success',
        'data': response.body
      }
      responseReadyCallback(rsp)
    }).catch(function (err) {
      let rsp = {
        'success': false,
        'code': err.response.statusCode,
        'message': err.response.statusMessage,
        'data': null
      }
      responseReadyCallback(rsp)
    })
}

EasyTrackOBot.prototype.getStats = function (
  statsType,
  timeRange,
  mode,
  startTime,
  endTime,
  asHero,
  vsHero,
  asDeck,
  vsDeck,
  responseReadyCallback) {
  var allowedEndpoints = ['classes', 'decks', 'arena']
  var allowedRange = ['current_month', 'all', 'last_3_days', 'last_24_hours', 'custom']
  var allowedModes = ['ranked', 'arena', 'casual', 'friendly', 'all']

  if (!allowedEndpoints.includes(statsType)) {
    let rsp = {
      'success': false,
      'message': 'statsType must be one of ' + allowedEndpoints
    }
    responseReadyCallback(rsp)
    return false
  }

  if (!allowedRange.includes(timeRange)) {
    let rsp = {
      'success': false,
      'message': 'timeRange must be one of ' + allowedRange
    }
    responseReadyCallback(rsp)
    return false
  }

  if (!allowedModes.includes(mode)) {
    let rsp = {
      'success': false,
      'message': 'mode must be one of ' + allowedModes
    }
    responseReadyCallback(rsp)
    return false
  }

  var dateValidation = /(\d{4})-(\d{2})-(\d{2})/

  if (timeRange === 'custom' && (!startTime.match(dateValidation) || (!endTime.match(dateValidation)))) {
    let rsp = {
      'success': false,
      'message': "startTime and endTime must be of type 'yyyy-mm-dd' when using custom timeRange"
    }
    responseReadyCallback(rsp)
    return false
  }

  var bodyParams = {
    'username': this.username,
    'token': this.token,
    'mode': mode,
    'time_range': timeRange
  }

  if (timeRange === 'custom') {
    if (startTime) bodyParams.start = startTime
    if (endTime) bodyParams.end = endTime
  }

  if (statsType === 'decks') {
    if (asDeck) bodyParams.as_deck = asDeck
    if (vsDeck) bodyParams.vs_deck = vsDeck
  } else if (statsType === 'classes') {
    if (asHero) bodyParams.as_hero = asHero
    if (vsHero) bodyParams.vs_hero = vsHero
  }

  // From object to url parameters ...&key=value&...
  let objAsUrlParams = Object.keys(bodyParams).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(bodyParams[k])
  }).join('&')

  var options = {
    method: 'GET',
    uri: 'https://trackobot.com/profile/stats/' + statsType + '.json?' + objAsUrlParams,
    body: bodyParams,
    json: true
  }

  request(options)
    .then(function (positiveResponse) {
      let finalResponse = {
        'success': true,
        'data': positiveResponse
      }
      responseReadyCallback(finalResponse)
    }).catch(function (negativeResponse) {
      let finalResponse = {
        'success': false,
        'data': negativeResponse
      }
      responseReadyCallback(finalResponse)
    })
}

module.exports = EasyTrackOBot
