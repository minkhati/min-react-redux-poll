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
      <div className="question">
        <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
        <div className="question-info">
          <div>
            <span className="center bold">{name}</span>
            <p>Answered Questions: {totalAnswered}</p>
            <p>Created Questions: {totalQuestionCreated}</p>
          </div>
          <div>
            <span className="center bold">Score</span>
            <p>{totalScore}</p>
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
