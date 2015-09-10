
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

var userStories = AppData.getUserStories();

console.log('UserStories:', JSON.stringify(userStories, null, 2));

React.render(<UserStoryList userStories={userStories} />, document.getElementById('view'));
