var React = require('react');
var $ = require('jquery');

var computeTotalEstimation = function(estimation) {
    return Object.keys(estimation).reduce(function(acc, next) {
        return acc + estimation[next];
    }, 0).toFixed(2);
}

var UserStoryRow = React.createClass({
    propTypes: {
        userStory: React.PropTypes.object,
        deleteUserStory: React.PropTypes.func
    },
    onDelete: function(event) {
        this.props.deleteUserStory(this.props.userStory.id);
    },
    render: function() {
        return <li className="us">
            <span className="us-title">{this.props.userStory.title}</span>
            <span className="us-delete"><input type="button" value="Delete" onClick={this.onDelete}/></span>
            <span className="us-estimation">{computeTotalEstimation(this.props.userStory.estimation)}</span>
        </li>;
    }
});

var UserStoryList = React.createClass({
    propTypes: {
        userStories: React.PropTypes.arrayOf(React.PropTypes.object),
        deleteUserStory: React.PropTypes.func
    },

    render: function() {
        var deleteUserStory = this.props.deleteUserStory;
        return <div>
            <h2>User Story List</h2>
            <ul className="userStories">
                {this.props.userStories.sort(function(a, b) {
                    return a.priority - b.priority;
                })
                .map(function(userStory) {
                    return <UserStoryRow userStory={userStory}
                        deleteUserStory={deleteUserStory}
                        key={userStory.id} />;
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
            title: '',
            pdf: 0,
            dev: 0
        };
    },
    validateTitle: function() {
        var form = $("#us-form-title");
        if (this.state.title !== '') {
            form.removeClass("invalid").addClass("valid");
            return true;
        }
        else {
            form.removeClass("valid").addClass("invalid");
            return false;
        }
    },
    validateEstimation: function(form, value) {
        if (isNaN(value) || value < 0) {
            form.removeClass("valid").addClass("invalid");
            return false;
        }
        else {
            form.removeClass("invalid").addClass("valid");
            return true;
        }
    },
    validatePDFEstimation: function() {
        return this.validateEstimation($("#us-form-pdf"), parseFloat(this.state.pdf));
    },
    validateDEVEstimation: function() {
        return this.validateEstimation($("#us-form-dev"), parseFloat(this.state.dev));
    },
    validate: function() {
        if (this.validateTitle() &&
            this.validatePDFEstimation() &&
            this.validateDEVEstimation())
        {
            $("#us-form-add").prop("disabled", false);
            return true;
        }
        else {
            $("#us-form-add").prop("disabled", true);
            return false;
        }
    },
    onTitleChange: function(event) {
        var state = this.state;
        state.title = event.target.value;
        this.setState(state);
        this.validate();
    },
    onPDFEstimationChange: function(event) {
        var state = this.state;
        state.pdf = event.target.value;
        this.setState(state);
        this.validate();
    },
    onDEVEstimationChange: function(event) {
        var state = this.state;
        state.dev = event.target.value;
        this.setState(state);
        this.validate();
    },
    onAdd: function(event) {
        if (this.validate())
        {
            var userStory = {
                title: this.state.title,
                estimation: {
                    pdf: isNaN(this.state.pdf)?0:parseFloat(this.state.pdf),
                    dev: isNaN(this.state.dev)?0:parseFloat(this.state.dev)
                }
            };
            this.props.addUserStory(userStory);
            this.setState(this.getInitialState());
            this.validate();
        }
    },
    onKeyDown: function(event) {
        if (event.key === 'Enter') {
            this.onAdd(event);
        }
    },
    render: function() {
        this.validate(); // This is probably not a good place to do this
        return <div>
	    <form>
            <div>Title:
                <input id="us-form-title" type="text" name="title" value={this.state.title}
                    onChange={this.onTitleChange} onKeyDown={this.onKeyDown}/>
            </div>
            <div>PDF Estimation:
                <input id="us-form-pdf" type="number" name="pdf" value={this.state.pdf}
                    onChange={this.onPDFEstimationChange} onKeyDown={this.onKeyDown}/>
            </div>
            <div>DEV Estimation:
                <input id="us-form-dev" type="number" name="dev" value={this.state.dev}
                    onChange={this.onDEVEstimationChange} onKeyDown={this.onKeyDown}/>
            </div>
            <input id="us-form-add" type="button" value="Add" onClick={this.onAdd}/>
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
        return <div>
            <UserStoryList userStories={this.state.userStories}
                deleteUserStory={this.deleteUserStory}
                key='us-list' />
            <UserStoryForm addUserStory={this.addUserStory} key='us-form' />
        </div>;
    }

});

React.render(<UserStoryView />, document.getElementById('view'));
