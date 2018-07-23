import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from './User';

class LeaderBoard extends Component {
  render() {
    const { userIds } = this.props;
    return (
      <div>
        <ul className="dashboard-list">
          {userIds.map(id => (
            <li key={id}>
              <div>
                <User id={id} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const userIds = Object.keys(users).sort(
    (a, b) => users[b].timestamp - users[a].timestamp
  );

  return {
    userIds
  };
}

export default connect(mapStateToProps)(LeaderBoard);
