var AppData = (function() {

    var _appdata = {}

    var _read = function() {
	_appdata = JSON.parse(localStorage.getItem('scrumapp'));

	if (!_appdata)
	{
	    // TODO: dummy data
	    console.log("Creating dummy app data")
	    _appdata = { userStories: [
		{
		    id: 1,
		    title: 'Integrate local storage',
		    estimation: { pdf: 2, dev: 4},
		    priority: 2
		},
		{
		    id: 2,
		    title: 'Support epics',
		    estimation: { pdf: 1, dev: 2},
		    priority: 4
		},
		{
		    id: 3,
		    title: 'Static view of user story list',
		    estimation: { pdf: 1, dev: 1},
		    priority: 1
		},
		{
		    id: 4,
		    title: 'Support sprints',
		    estimation: { pdf: 1, dev: 2},
		    priority: 2
		},
		{
		    id: 5,
		    title: 'Add bootstrap',
		    estimation: { pdf: 1, dev: 4},
		    priority: 5
		}
	    ]
            };

	    _write();
	}

	console.log("AppData", JSON.stringify(_appdata, null, 2));
    }

    var _write = function() {
	 localStorage.setItem('scrumapp', JSON.stringify(_appdata));
    };

    var _reset = function() {
	_appdata = null;
	_write();
    }

    return {
	save: _write,
	reset: _reset,
	getUserStories: function() {
	    _read();
	    return _appdata.userStories;
	}

    };

}());
