
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


var userStories = [
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
];

React.render(<UserStoryList userStories={userStories} />, document.getElementById('view'));
