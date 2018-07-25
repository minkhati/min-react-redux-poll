import React, { Component } from 'react';
import { connect } from 'react-redux';

class User extends Component {
  render() {
    const { user } = this.props;

    if (user === null) {
      return <p>This User does not exist</p>;
    }

    const { name, avatarURL, answers, questions } = user;
    const totalAnswered = Object.keys(answers).length;
    const totalQuestionCreated = questions.length;
    const totalScore = totalAnswered + totalQuestionCreated;

    return (
      <div
        className="new-question"
        style={{ padding: 0, marginBottom: '10px' }}
      >
        <span className="question-page-heading">{name}</span>
        <div className="div-que-avatar">
          <div className="div-avatar">
            <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
          </div>
          <div className="div-leaderboard">
            <p>Answered Questions: {totalAnswered}</p>
            <p>Created Questions: {totalQuestionCreated}</p>
          </div>
          <div className="center div-avatar">
            <p className="score-text">Score</p>
            <hr />
            <p className="score">{totalScore}</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }, { id }) {
  const user = users[id];

  return {
    authedUser,
    user
  };
}

export default connect(mapStateToProps)(User);
