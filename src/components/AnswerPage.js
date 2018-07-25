import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';
import { Line, Circle } from 'rc-progress';

class AnswerPage extends Component {
  render() {
    const { question } = this.props;

    const {
      name,
      optionOne,
      optionTwo,
      avatar,
      optionOneAnswered,
      optionTwoAnswered
    } = question;

    const optionOneTotalVotes = question.optionOne.votes.length;
    const optionTwoTotalVotes = question.optionTwo.votes.length;

    const totalVotes = optionOneTotalVotes + optionTwoTotalVotes || 1;

    const optionOnePercent = Math.floor(optionOneTotalVotes / totalVotes * 100);
    const optionTwoPercent = Math.floor(optionTwoTotalVotes / totalVotes * 100);

    return (
      <div className="new-question" style={{ padding: 0 }}>
        <span className="question-page-heading">Asked by {name}</span>
        <div className="div-que-avatar">
          <div className="div-ans-avatar">
            <img
              src={avatar}
              alt={`Avatar of ${name}`}
              className="avatar-answer"
            />
          </div>

          <div className="div-question">
            <p className="active">Results:</p>
            <div className="ans-option">
              {optionOneAnswered === true ? (
                <div className="your-vote">Your vote</div>
              ) : null}
              <span style={{ marginRight: '20px' }}>{`Would you rather ${
                optionOne.text
              }?`}</span>
              <Line
                style={{ marginTop: '20px' }}
                percent={optionOnePercent}
                strokeWidth="8"
                strokeColor="green"
              />
              <p
                className="center"
                style={{ fontWeight: 'bold', color: 'black' }}
              >{`${optionOneTotalVotes} out of ${totalVotes}`}</p>
            </div>
            <div className="ans-option">
              {optionTwoAnswered === true ? (
                <div className="your-vote">Your vote</div>
              ) : null}
              <span style={{ marginRight: '20px' }}>{`Would you rather ${
                optionTwo.text
              }?`}</span>
              <Line
                style={{ marginTop: '20px' }}
                percent={optionTwoPercent}
                strokeWidth="8"
                strokeColor="green"
              />
              <p
                className="center bold"
                style={{ fontWeight: 'bold', color: 'black' }}
              >{`${optionTwoTotalVotes} out of ${totalVotes}`}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
