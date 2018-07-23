import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { formatQuestion, formatDate } from '../utils/helpers';

class Question extends Component {
  render() {
    const { question } = this.props;

    if (question === null) {
      return <p>This Question does not exist</p>;
    }

    const {
      name,
      id,
      timestamp,
      optionOne,
      optionTwo,
      avatar,
      authedUser,
      optionOneAnswered,
      optionTwoAnswered,
      hasAnswered
    } = question;

    return (
      <Link to={`/question/${id}`} className="question">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="question-info">
          <div>
            <span className="center">{name} asks:</span>
            <p>...{optionOne.text}...</p>
          </div>
          <button className="btn" onClick={this.handlePoll}>
            View Poll
          </button>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  };
}

export default connect(mapStateToProps)(Question);
