'use strict'

var request = require('request-promise-native')
  /**
   * Constructor that initializes the EasyTrackOBot's object with the username and token of the user.
   *
   * @param {any} username Your track-o-bot username (You can find it under "Settings" -> "API" -> "Username")
   * @param {any} token Your track-o-bot valid token (You can find it under "Settings" -> "API" -> "Token")
   */
function EasyTrackOBot (username, token) {
  this.username = username
  this.token = token
}

/**
 * Uploads a new Hearthstone game's data
 *
 * Please check https://gist.github.com/stevschmid/120adcbc5f1f7cb31bc5 for "game" parameter validation
 * @param {any} game Valid json object for track-o-bot
 * @param {any} responseReadyCallback Callback that will be called once the request has been completed. Returns in the parameter 'rsp' a JSON object of the format {'success': true/false, 'code': 200/404/other codes, 'message': 'This is a message', 'data': <JSON payload>}
 */
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
  /**
   * Create a new username and password in Trackobot
   *
   * @param {any} responseReadyCallback responseReadyCallback(rsp) ~ Callback that will be called once the request has been completed.
   * Field "data" of the rsp object will be a JSON object like {'username': 'newuser', 'password': 'password'}
   */
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
  /**
   * Get the user’s statistics by deck, class, or for arena.
   *
   * @param {any} statsType Stats type - Allowed values: ['classes', 'decks', 'arena']
   * @param {any} timeRange Range of time - Allowed values: ['current_month', 'all', 'last_3_days', 'last_24_hours', 'custom']
   * @param {any} mode Mode - ['ranked', 'arena', 'casual', 'friendly', 'all']
   * @param {any} startTime Stats from date - Perceived if timeRange param has value 'custom' - Must be a date of format 'yyyy-mm-dd'
   * @param {any} endTime Stats to date - Perceived if timeRange param has value 'custom' - Must be a date of format 'yyyy-mm-dd'
   * @param {any} asHero Stats match playing Hero - Perceived if statsType param has value 'classes' - Hero name's first letter must be uppercase (Hunter, Druid...)
   * @param {any} vsHero Stats match against Hero - Perceived if statsType param has value 'classes' - Hero name's first letter must be uppercase (Hunter, Druid...)
   * @param {any} asDeck Stats match playing Deck - Perceived if statsType param has value 'decks' - Decks name's first letter must be uppercase (Combo, Token...)
   * @param {any} vsDeck Stats match against Deck - Perceived if statsType param has value 'decks' - Decks name's first letter must be uppercase (Combo, Token...)
   * @param {any} responseReadyCallback Callback - returns a JSON obj {'success': true, data': positiveResponse} in case of success, else {'success': false, 'message': 'Error message'}
   */
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

  if (allowedEndpoints.indexOf(statsType) === -1) {
    let rsp = {
      'success': false,
      'message': 'statsType must be one of ' + allowedEndpoints
    }
    responseReadyCallback(rsp)
    return false
  }

  if (allowedRange.indexOf(timeRange) === -1) {
    let rsp = {
      'success': false,
      'message': 'timeRange must be one of ' + allowedRange
    }
    responseReadyCallback(rsp)
    return false
  }

  if (allowedModes.indexOf(mode) === -1) {
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
