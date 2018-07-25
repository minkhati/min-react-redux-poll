import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { formatQuestion } from '../utils/helpers';

class Question extends Component {
  render() {
    const { question } = this.props;

    if (question === null) {
      return <p>This Question does not exist</p>;
    }

    const { name, id, optionOne, avatar, hasAnswered } = question;

    return (
      <Link to={hasAnswered === false ? `/question/${id}` : `/answer/${id}`}>
        <span className="question-heading">{name} asks:</span>
        <div className="div-que-avatar">
          <div className="div-avatar">
            <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
          </div>
          <div className="div-question">
            <p className="active">Would you rather</p>
            <p>...{optionOne.text}...</p>
            <button className="btn" onClick={this.handlePoll}>
              View Poll
            </button>
          </div>
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
