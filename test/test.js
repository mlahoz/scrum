var test = require('tape');
var AppData = require('../lib/appdata');
var Data = require('../lib/data');

test('Get user stories', function (t) {
    t.plan(1);

    t.equal(typeof AppData.getUserStories, 'function');
});

test('LevelDB', function (t) {

    t.equal(typeof Data.getUserStories, 'function');
    t.equal(typeof Data.addUserStory, 'function');
    t.equal(typeof Data.deleteUserStory, 'function');

    Data.reset();

    Data.getUserStories(function(value) {
        t.equal(value.length, 0);
        t.deepEqual(value, []);
    });

    var one = {title: 'One'};
    Data.addUserStory(one, function(error) {
        t.equal(error, undefined);

        Data.getUserStories(function(value) {
            t.equal(value.length, 1);
            t.deepEqual(value, [one]);

            Data.deleteUserStory(value[0].id, function(error) {
                t.equal(error, undefined);

                Data.getUserStories(function(value) {
                    t.equal(value.length, 0);
                    t.deepEqual(value, []);

                    t.end();
                });
            });
        });

    });

    //console.log('after add',JSON.stringify(value, null, 2));
});
