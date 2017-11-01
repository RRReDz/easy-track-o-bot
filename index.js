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

module.exports = EasyTrackOBot
