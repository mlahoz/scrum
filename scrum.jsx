
var computeTotalEstimation = function(userStory) {
    return Object.keys(userStory).reduce(function(acc, next) {
        return acc + userStory[next];
    }, 0);
}

var UserStoryRow = React.createClass({
    propTypes: {
        userStory: React.PropTypes.object
    },

    render: function() {
        return <li className="us">
            <span className="us-title">{this.props.userStory.title}</span>
            <span className="us-estimation">{computeTotalEstimation(this.props.userStory.estimation)}</span>
        </li>;
    }
});

var UserStoryList = React.createClass({
    propTypes: {
        userStories: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    render: function() {
        return <div>
            <h2>User Story List</h2>
            <ul className="userStories">
                {this.props.userStories.sort(function(a, b) {
                    return a.priority - b.priority;
                })
                .map(function(userStory) {
                    return <UserStoryRow userStory={userStory} key={userStory.id} />;
                })}
            </ul>
        </div>;
    }

});

var UserStoryForm = React.createClass({
    propTypes: {
        addUserStory: React.PropTypes.func
    },
    getInitialState: function() {
        return {
            title: ''
        };
    },
    handleTitleChange: function(event) {
        this.setState({title: event.target.value});
    },
    handleOnClick: function(event) {
        this.state.title

        var userStory = { id: 6,
            title: this.state.title,
            estimation: {pdf: 2, dev: 2},
            priority: 10
        };

        this.props.addUserStory(userStory);
    },
    render: function() {
        var title = this.state.title;
        return <div>
	    <form>
	        <input type="text" name="title" value={title}
                onChange={this.handleTitleChange}/>
	        <input type="button" value="Add" onClick={this.handleOnClick}/>
	    </form>
        </div>;
    }

});

var UserStoryView = React.createClass({
    propTypes: {
        userStories: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    update: function() {
       var userStories = AppData.getUserStories();
       this.setState({userStories: userStories});
    },

    addUserStory: function(userStory) {
        AppData.addUserStory(userStory);
        this.update();
    },

    getInitialState: function() {
        return {userStories: []};
    },

    componentDidMount: function() {
        this.update();
    },

    render: function() {
        return <div>
            <UserStoryList userStories={this.state.userStories} key='us-list' />
            <UserStoryForm addUserStory={this.addUserStory} key='us-form' />
        </div>;
    }

});

React.render(<UserStoryView />, document.getElementById('view'));
