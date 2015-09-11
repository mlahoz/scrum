
var computeTotalEstimation = function(estimation) {
    return Object.keys(estimation).reduce(function(acc, next) {
        return acc + estimation[next];
    }, 0).toFixed(2);
}

var UserStoryRow = React.createClass({displayName: "UserStoryRow",
    propTypes: {
        userStory: React.PropTypes.object,
        deleteUserStory: React.PropTypes.func
    },
    onDelete: function(event) {
        console.log('OnDelete', this.props.userStory.id);
        this.props.deleteUserStory(this.props.userStory.id);
    },
    render: function() {
        return React.createElement("li", {className: "us"}, 
            React.createElement("span", {className: "us-title"}, this.props.userStory.title), 
            React.createElement("span", {className: "us-delete"}, React.createElement("input", {type: "button", value: "Delete", onClick: this.onDelete})), 
            React.createElement("span", {className: "us-estimation"}, computeTotalEstimation(this.props.userStory.estimation))
        );
    }
});

var UserStoryList = React.createClass({displayName: "UserStoryList",
    propTypes: {
        userStories: React.PropTypes.arrayOf(React.PropTypes.object),
        deleteUserStory: React.PropTypes.func
    },

    render: function() {
        var deleteUserStory = this.props.deleteUserStory;
        return React.createElement("div", null, 
            React.createElement("h2", null, "User Story List"), 
            React.createElement("ul", {className: "userStories"}, 
                this.props.userStories.sort(function(a, b) {
                    return a.priority - b.priority;
                })
                .map(function(userStory) {
                    return React.createElement(UserStoryRow, {userStory: userStory, 
                        deleteUserStory: deleteUserStory, 
                        key: userStory.id});
                })
            )
        );
    }

});

var UserStoryForm = React.createClass({displayName: "UserStoryForm",
    propTypes: {
        addUserStory: React.PropTypes.func
    },
    getInitialState: function() {
        return {
            title: '',
            pdf: 0,
            dev: 0
        };
    },
    handleTitleChange: function(event) {
        var state = this.state;
        state.title = event.target.value;
        this.setState(state);
    },
    handlePDFEstimationChange: function(event) {
        var state = this.state;
        state.pdf = event.target.value;
        this.setState(state);
    },
    handleDEVEstimationChange: function(event) {
        var state = this.state;
        state.dev = event.target.value;
        this.setState(state);
    },
    handleOnClick: function(event) {
        var userStory = {
            title: this.state.title,
            estimation: {
                pdf: isNaN(this.state.pdf)?0:parseFloat(this.state.pdf),
                dev: isNaN(this.state.dev)?0:parseFloat(this.state.dev)
            }
        };
        this.props.addUserStory(userStory);
        this.setState(this.getInitialState());
    },
    render: function() {
        return React.createElement("div", null, 
	    React.createElement("form", null, 
            React.createElement("div", null, "Title:", 
                React.createElement("input", {type: "text", name: "title", value: this.state.title, 
                    onChange: this.handleTitleChange})
            ), 
            React.createElement("div", null, "PDF Estimation:", 
                React.createElement("input", {type: "number", name: "pdf", value: this.state.pdf, 
                    onChange: this.handlePDFEstimationChange})
            ), 
            React.createElement("div", null, "DEV Estimation:", 
                React.createElement("input", {type: "number", name: "dev", value: this.state.dev, 
                    onChange: this.handleDEVEstimationChange})
            ), 
            React.createElement("input", {type: "button", value: "Add", onClick: this.handleOnClick})
	    )
        );
    }

});

var UserStoryView = React.createClass({displayName: "UserStoryView",
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

    deleteUserStory: function(id) {
        AppData.deleteUserStory(id);
        this.update();
    },

    getInitialState: function() {
        return {userStories: []};
    },

    componentDidMount: function() {
        this.update();
    },

    render: function() {
        return React.createElement("div", null, 
            React.createElement(UserStoryList, {userStories: this.state.userStories, 
                deleteUserStory: this.deleteUserStory, 
                key: "us-list"}), 
            React.createElement(UserStoryForm, {addUserStory: this.addUserStory, key: "us-form"})
        );
    }

});

React.render(React.createElement(UserStoryView, null), document.getElementById('view'));
