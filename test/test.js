var test = require('tape');
var AppData = require('../lib/appdata')

test('Get user stories', function (t) {
    t.plan(1);

    t.equal(typeof AppData.getUserStories, 'function');
});
