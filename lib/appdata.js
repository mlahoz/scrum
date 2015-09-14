var AppData = (function() {

    var _appdata = {};

    var _read = function() {
        _appdata = JSON.parse(localStorage.getItem('scrumapp'));

        if (!_appdata)
        {
            // TODO: dummy data
            console.log("Creating dummy app data");


            _appdata = {
                    lastUserStoryId: 0,
                    userStories: []
                };

            _addNewUserStory({
                    title: 'Integrate local storage',
                    estimation: { pdf: 2, dev: 4},
                    priority: 2
                });
            _addNewUserStory({
                    title: 'Support epics',
                    estimation: { pdf: 1, dev: 2},
                    priority: 4
                });
            _addNewUserStory({
                    title: 'Support sprints',
                    estimation: { pdf: 1, dev: 2},
                    priority: 2
                });
            _addNewUserStory({
                    title: 'Add bootstrap',
                    estimation: { pdf: 3, dev: 4},
                    priority: 5
                });
            _addNewUserStory({
                    title: 'Static view of user story list',
                    estimation: { pdf: 1, dev: 4},
                    priority: 1
                });

            _write();
        }
        //console.log("AppData", JSON.stringify(_appdata, null, 2));
    };

    var _write = function() {
        localStorage.setItem('scrumapp', JSON.stringify(_appdata));
    };

    var _reset = function() {
        _appdata = null;
        _write();
    };

    var _getUserStories = function() {
        _read();
        return _appdata.userStories;
    };

    var _addNewUserStory = function(userStory) {
        _appdata.lastUserStoryId += 1;
        userStory.id = _appdata.lastUserStoryId;
        userStory.priority = userStory.priority || _appdata.userStories.length + 1;
        _appdata.userStories.push(userStory);
    };

    var _addUserStory = function(userStory) {
        console.log('Add user story', JSON.stringify(userStory,null,2))
        _read();
        _addNewUserStory(userStory);
        _write();
    };

    var _deleteUserStory = function(id) {
        _read();

        _appdata.userStories = _appdata.userStories.filter(function(userStory) {
            return userStory.id !== id;
        });

        _write();
    };

    return {
	   save: _write,
	   reset: _reset,
	   getUserStories: _getUserStories,
	   addUserStory: _addUserStory,
       deleteUserStory: _deleteUserStory
    };

}());

module.exports = AppData;
