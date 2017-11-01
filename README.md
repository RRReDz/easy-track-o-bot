# easy-track-o-bot

easy-track-o-bot is a javascript wrapper developed as npm module for [Track-o-bot](https://trackobot.com/) APIs.

## Badges

[![Coverage Status](https://coveralls.io/repos/github/RRReDz/easy-track-o-bot/badge.svg)](https://coveralls.io/github/RRReDz/easy-track-o-bot)
[![Build Status](https://travis-ci.org/RRReDz/easy-track-o-bot.svg?branch=master)](https://travis-ci.org/RRReDz/easy-track-o-bot)
[![Known Vulnerabilities](https://snyk.io/test/github/rrredz/easy-track-o-bot/badge.svg)](https://snyk.io/test/github/rrredz/easy-track-o-bot)

## Usage
That's pretty easy...
```js
//...require the module...
var EasyTrackOBot = require('easy-track-o-bot')

//...create the object passing username and token provided by track-o-bot...
easyTrackOBotObj = new EasyTrackOBot('your-username', 'your-token')

//...get your game data...
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
  
  //...and upload it!
  easyTrackOBotObj.uploadGame(fooGame, (result) => {
        /* Your code here */
      }
  )
```

### Installation

Not yet available, stay tuned! 8-)
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

