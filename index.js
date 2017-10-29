var request = require('request');

exports.uploadGame = function(game) {
    let username = "weathered-defender-8628";
    let token = "YDWSoz3xdbsdV2ACSxwa";
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

    console.log(JSON.stringify(gameTest));
    console.log(username);
    console.log(token);

    var options = {
        url: 'https://trackobot.com/profile/results.json?username=' + username + '&token=' + token,
        body: JSON.stringify(gameTest),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    request.post(options, function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.

        return body
    })

    //return { "success": true, "message": "Game uploaded with success" };
}