import React from 'react';
import { connect } from 'react-redux';
import UserScorePage from './UserScorePage';

const LeaderBoard = ({ userIds }) => {
  return (
    <div>
      <ul className="dashboard-list">
        {userIds.map(id => (
          <li key={id}>
            <div>
              <UserScorePage id={id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

function mapStateToProps({ authedUser, users, questions }) {
  const userIds = Object.keys(users)
    .sort((a, b) => users[b].questions.length - users[a].questions.length)
    .sort(
      (a, b) =>
        Object.keys(users[b].answers).length -
        Object.keys(users[a].answers).length
    );

  return {
    userIds
  };
}

export default connect(mapStateToProps)(LeaderBoard);
