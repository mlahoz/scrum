var Data = (function() {

    var _levelup = require('levelup');

    var _db = _levelup('./.scrumdb', {
        db: require('leveldown'),
        valueEncoding: 'json'
    });

    var _reset = function() {
        _db.del('user-stories');
        _db.del('last-user-story-id');
    };

    var _getUserStories = function(callback) {
        _db.get('user-stories', function(error, value) {

            if (error) {
                if (error.notFound) {
                    console.log('Get: No user stories, creating empty array');
                    _db.put('user-stories', []);
                }
                else {
                    console.log('Get: Error getting user stories');
                }
                if (callback) callback([]);
            }
            else {
                console.log('User Stories:', JSON.stringify(value, null, 2));
                if (callback) callback(value);
            }
        });
    };

    var _addUserStory = function(userStory, callback) {

        _db.get('last-user-story-id', function(error, value) {

            var lastId = 0;
            if (!error) {
                lastId = value;
            }
            userStory.id = lastId + 1;
            _db.put('last-user-story-id', userStory.id);

            _db.get('user-stories', function(error, value) {

                var userStories = []
                if (!error) {
                    userStories = value;
                }

                userStories.push(userStory);
                _db.put('user-stories', userStories, callback);
            });
        });
    };

    var _deleteUserStory = function(id, callback) {
        console.log('Delete user story: ' + id);
        _db.get('user-stories', function(error, value) {

            if (error) {
                if (callback) callback(error);
            }
            else {
                _db.put('user-stories', value.filter(function(userStory) {
                    return userStory.id !== id;
                }), callback);
            }
        });
    };

    return {
	   reset: _reset,
	   getUserStories: _getUserStories,
	   addUserStory: _addUserStory,
       deleteUserStory: _deleteUserStory
    };

}());

module.exports = Data;
