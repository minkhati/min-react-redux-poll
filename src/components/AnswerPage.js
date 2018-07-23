import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';

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

    const totalVotes = optionOneTotalVotes + optionTwoTotalVotes;

    return (
      <div className="question">
        <p>Asked by {name} </p>
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="question-info">
          <div>
            <label>Results:</label>
            <div>
              <div>
                {optionOneAnswered === true ? (
                  <div className="your-vote">Your vote</div>
                ) : null}
                <p>{optionOne.text}</p>
                <p>{`${optionOneTotalVotes} of ${totalVotes}`}</p>
              </div>
              <div>
                {optionTwoAnswered === true ? (
                  <div className="your-vote">Your vote</div>
                ) : null}
                <p>{optionTwo.text}</p>
                <p>{`${optionTwoTotalVotes} of ${totalVotes}`}</p>
              </div>
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
