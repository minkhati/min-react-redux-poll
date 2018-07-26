import React from 'react';
import { connect } from 'react-redux';
import { formatQuestion, computeStats } from '../utils/helpers';
import QuestionOption from './QuestionOption';
import Avatar from './Avatar';

const AnswerPage = ({ question }) => {
  const {
    name,
    optionOne,
    optionTwo,
    avatar,
    optionOneAnswered,
    optionTwoAnswered
  } = question;

  const {
    optionOnePercent,
    optionTwoPercent,
    optionOneTotalVotes,
    optionTwoTotalVotes,
    totalVotes
  } = computeStats(question);

  return (
    <div className="new-question" style={{ padding: 0 }}>
      <span className="question-page-heading">Asked by {name}</span>
      <div className="div-que-avatar">
        <Avatar
          divClassName={'div-ans-avatar'}
          avatar={avatar}
          name={name}
          avatarClassName={'avatar-answer'}
        />

        <div className="div-question">
          <p className="active">Results:</p>

          <QuestionOption
            optionAnswered={optionOneAnswered}
            option={optionOne}
            optionPercent={optionOnePercent}
            optionTotalVotes={optionOneTotalVotes}
            totalVotes={totalVotes}
          />

          <QuestionOption
            optionAnswered={optionTwoAnswered}
            option={optionTwo}
            optionPercent={optionTwoPercent}
            optionTotalVotes={optionTwoTotalVotes}
            totalVotes={totalVotes}
          />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];

  return {
    id,
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  };
}

export default connect(mapStateToProps)(AnswerPage);
