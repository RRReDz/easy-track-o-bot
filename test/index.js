const test = require('tap').test;

const easyTrackOBot = require('../index.js');

test('upload_game test', function(t) {

    const gameOfTestCorrect = {
        "result": {
            "hero": "Shaman",
            "opponent": "Warrior",
            "mode": "ranked",
            "coin": true,
            "win": true,
            "duration": 634,
            "card_history": [{
                    "card_id": "EX1_405",
                    "player": "opponent"
                },
                {
                    "card_id": "GAME_005",
                    "player": "me",
                    "turn": 3
                }
            ]
        }
    }

    const gameOfTestIncorrect = {
        "result": ["This is obiviously not correct"]
    }

    const resultCorrect = easyTrackOBot.uploadGame(gameOfTestCorrect);
    t.is(typeof resultCorrect, 'object');
    t.ok(Object.keys(resultCorrect).length > 0);
    t.ok(resultCorrect.hasOwnProperty("success"))
    t.ok(resultCorrect.hasOwnProperty("message"))
    t.equal(resultCorrect.success, true);
    t.equal(resultCorrect.message, "Game uploaded with success");

    const resultIncorrect = easyTrackOBot.uploadGame(gameOfTestIncorrect);
    t.is(typeof resultIncorrect, 'object');
    t.ok(Object.keys(resultIncorrect).length > 0);
    t.ok(resultIncorrect.hasOwnProperty("success"))
    t.ok(resultIncorrect.hasOwnProperty("message"))
    t.equal(resultIncorrect.success, false);
    t.equal(resultIncorrect.message, "Game inserted is invalid");

    t.end();
})