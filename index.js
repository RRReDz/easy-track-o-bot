var request = require('request-promise-native')

exports.uploadGame = function(game, responseReadyCallback) {
    let username = "twilight-ysera-2686" //debug - TODO: REMOTE IT
    let token = "Rg22pzUVixQpm1aXJZCV" //debug - TODO: REMOVE IT
        /* ----- DEBUG ----- */
    const gameTest = {
        "result": {
            "mode": "ranked",
            "hero": "Shaman",
            "hero_deck": "Token",
            "opponent": "Hunter",
            "opponent_deck": "Midrange",
            "coin": true,
            "win": true,
            "duration": 228,
            "card_history": []
        }
    }

    /* ------ DEBUG ------ */
    //console.log(JSON.stringify(game));
    //console.log(username);
    //console.log(token);

    var options = {
        method: 'POST',
        uri: 'https://trackobot.com/profile/results.json?username=' + username + '&token=' + token,
        body: game,
        headers: {
            'Content-Type': 'application/json'
        },
        resolveWithFullResponse: true,
        json: true
    }

    request(options)
        .then(function(response) {
            let rsp = {
                "success": true,
                "code": response.statusCode,
                "message": "Game uploaded with success",
                "data": response.body
            }
            responseReadyCallback(rsp)
        }).catch(function(response) {
            let rsp = {
                "success": false,
                "code": response.error.status,
                "message": response.error.error,
                "data": null
            }
            responseReadyCallback(rsp)
        })
}