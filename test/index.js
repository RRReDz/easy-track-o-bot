const test = require('tap').test;

const easyTrackOBot = require('../index.js');

test('smoke test', function(t) {
    const string = easyTrackOBot.uploadGame();
    t.is(typeof string, 'string');
    t.ok(string.length > 0);
    t.end();
})