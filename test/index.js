const test = require('tap').test

const easyTrackOBot = require('../index.js')

test('upload_game_OK test', function (t) {
  const gameOfTestCorrect = {
    'result': {
      'mode': 'ranked',
      'hero': 'Shaman',
      'hero_deck': 'Token',
      'opponent': 'Hunter',
      'opponent_deck': 'Midrange',
      'coin': true,
      'win': true,
      'duration': 228,
      'card_history': []
    }
  }

  easyTrackOBot.uploadGame(
        gameOfTestCorrect,
        (result) => {
          t.is(typeof result, 'object')
          t.ok(Object.keys(result).length > 0)

          t.ok(result.hasOwnProperty('success'))
          t.ok(result.hasOwnProperty('message'))
          t.ok(result.hasOwnProperty('code'))
          t.ok(result.hasOwnProperty('data'))

          t.equal(result.success, true)
          t.equal(result.message, 'Game uploaded with success')
          t.equal(result.code, 201)
          t.ok(result.data.hasOwnProperty('result'))

          t.end()
        }
    )
})

test('upload_game_KO test', function (t) {
  const gameOfTestIncorrect = {
    'result': ['This is obiviously not correct']
  }

  easyTrackOBot.uploadGame(
        gameOfTestIncorrect,
        (result) => {
          t.is(typeof result, 'object')
          t.ok(Object.keys(result).length > 0)

          t.ok(result.hasOwnProperty('success'))
          t.ok(result.hasOwnProperty('message'))
          t.ok(result.hasOwnProperty('code'))
          t.ok(result.hasOwnProperty('data'))

          t.equal(result.success, false)
          t.ok(result.code >= 300)

          t.end()
        }
    )
})
