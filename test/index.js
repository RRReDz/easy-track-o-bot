var test = require('tap').test
var EasyTrackOBot = require('../index.js')

var easyTrackOBotObj

test('initialize_object test', function (t) {
  easyTrackOBotObj = new EasyTrackOBot('twilight-ysera-2686', 'Rg22pzUVixQpm1aXJZCV')
  t.type(easyTrackOBotObj, 'object')
  t.type(easyTrackOBotObj, 'EasyTrackOBot')
  t.type(easyTrackOBotObj, EasyTrackOBot)

  t.end()
})

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

  easyTrackOBotObj.uploadGame(
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

  easyTrackOBotObj.uploadGame(
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

test('create_new_user test', function (t) {
  easyTrackOBotObj.createNewUser(
    (result) => {
      t.is(typeof result, 'object')
      t.ok(Object.keys(result).length > 0)

      t.ok(result.hasOwnProperty('success'))
      t.ok(result.hasOwnProperty('message'))
      t.ok(result.hasOwnProperty('code'))
      t.ok(result.hasOwnProperty('data'))

      if (result.code === 200) {
        t.equal(result.success, true)
        t.ok(JSON.parse(result.data).hasOwnProperty('username'))
        t.ok(JSON.parse(result.data).hasOwnProperty('password'))
      } else if (result.code >= 300) {
        t.equal(result.success, false)
        t.equal(result.data, null)
      }

      t.end()
    }
  )
})

test('get_hearthstone_stats_OK_1 test', function (t) {
  easyTrackOBotObj.getStats(
    'classes',
    'all',
    'all',
    undefined,
    undefined,
    'Hunter',
    'Druid',
    undefined,
    undefined,
    (result) => {
      t.is(typeof result, 'object')
      t.ok(Object.keys(result).length > 0)

      t.ok(result.hasOwnProperty('success'))
      t.ok(result.hasOwnProperty('data'))
      t.ok(result.data.hasOwnProperty('stats'))

      t.equal(result.success, true)

      t.end()
    })
})

test('get_hearthstone_stats_OK_2 test', function (t) {
  easyTrackOBotObj.getStats(
    'decks',
    'custom',
    'all',
    '2017-11-10',
    '2017-11-14',
    undefined,
    undefined,
    'Token',
    'Combo',
    (result) => {
      t.is(typeof result, 'object')
      t.ok(Object.keys(result).length > 0)

      t.ok(result.hasOwnProperty('success'))
      t.ok(result.hasOwnProperty('data'))
      t.ok(result.data.hasOwnProperty('stats'))

      t.equal(result.success, true)

      t.end()
    })
})

test('get_hearthstone_stats_KO_1 test', function (t) {
  easyTrackOBotObj.getStats(
    'IWannaBreakIt!',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    (result) => {
      t.is(typeof result, 'object')
      t.ok(Object.keys(result).length > 0)

      t.ok(result.hasOwnProperty('success'))
      t.ok(result.hasOwnProperty('message'))

      t.equal(result.success, false)

      t.end()
    })
})

test('get_hearthstone_stats_KO_2 test', function (t) {
  easyTrackOBotObj.getStats(
    'classes',
    'IWannaBreakItAgain!',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    (result) => {
      t.is(typeof result, 'object')
      t.ok(Object.keys(result).length > 0)

      t.ok(result.hasOwnProperty('success'))
      t.ok(result.hasOwnProperty('message'))

      t.equal(result.success, false)

      t.end()
    })
})

test('get_hearthstone_stats_KO_3 test', function (t) {
  easyTrackOBotObj.getStats(
    'classes',
    'last_3_days',
    'IAlwaysWannaBreakIt!',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    (result) => {
      t.is(typeof result, 'object')
      t.ok(Object.keys(result).length > 0)

      t.ok(result.hasOwnProperty('success'))
      t.ok(result.hasOwnProperty('message'))

      t.equal(result.success, false)

      t.end()
    })
})

test('get_hearthstone_stats_KO_4 test', function (t) {
  easyTrackOBotObj.getStats(
    'classes',
    'custom',
    'all',
    'IThinkThatsNotAValidData',
    'IThinkThatsNotAValidDataToo',
    undefined,
    undefined,
    undefined,
    undefined,
    (result) => {
      t.is(typeof result, 'object')
      t.ok(Object.keys(result).length > 0)

      t.ok(result.hasOwnProperty('success'))
      t.ok(result.hasOwnProperty('message'))

      t.equal(result.success, false)

      t.end()
    })
})
