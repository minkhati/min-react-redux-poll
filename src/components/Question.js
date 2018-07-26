import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import { formatQuestion } from '../utils/helpers';

const Question = ({ question }) => {
  const { name, id, optionOne, avatar, hasAnswered } = question;

  return (
    <Link to={hasAnswered === false ? `/question/${id}` : `/answer/${id}`}>
      <span className="question-heading">{name} asks:</span>
      <div className="div-que-avatar">
        <Avatar
          divClassName={'div-avatar'}
          avatar={avatar}
          name={name}
          avatarClassName={'avatar'}
        />
        <div className="div-question">
          <p className="active">Would you rather</p>
          <p>...{optionOne.text}...</p>
          <button className="btn">View Poll</button>
        </div>
      </div>
    </Link>
  );
};

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
