# easy-track-o-bot

easy-track-o-bot is a javascript wrapper developed as npm module for [Track-o-bot](https://trackobot.com/) APIs.

## Badges

[![Coverage Status](https://coveralls.io/repos/github/RRReDz/easy-track-o-bot/badge.svg)](https://coveralls.io/github/RRReDz/easy-track-o-bot)
[![Build Status](https://travis-ci.org/RRReDz/easy-track-o-bot.svg?branch=master)](https://travis-ci.org/RRReDz/easy-track-o-bot)
[![Known Vulnerabilities](https://snyk.io/test/github/rrredz/easy-track-o-bot/badge.svg)](https://snyk.io/test/github/rrredz/easy-track-o-bot)

## Getting Started

```js
//Require library from node_modules
var EasyTrackOBot = require('easy-track-o-bot')

//Instantiate javascript object with track-o-bot username and token as parameters
easyTrackOBotObj = new EasyTrackOBot('your-username', 'your-token')

//Game of test to be uploaded
const fooGame = {
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
  
  //Call to upload game
  easyTrackOBotObj.uploadGame(
        fooGame,
        (result) => {
          console.log(result.success)
          console.log(result.message)
          console.log(result.code)
          console.log(result.data)
        }
    )
```

### Prerequisites

Not yet available
```
npm install easy-track-o-bot
```

## Running the tests

```
npm test
```

## Author

* **Riccardo Rossi**

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

