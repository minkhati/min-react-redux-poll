import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { formatQuestion } from '../utils/helpers';

class DashBoard extends Component {
  state = {
    answeredQuestion: false
  };

  handleButtonClick = e => {
    this.setState({
      answeredQuestion: e.target.value === 'answered'
    });
  };

  render() {
    const { answeredQuestion } = this.state;
    const {
      formattedAnsweredQuestion,
      formattedUnAnsweredQuestion
    } = this.props;

    const questionsToMap =
      answeredQuestion === true
        ? formattedAnsweredQuestion
        : formattedUnAnsweredQuestion;

    return (
      <div>
        <p className="center" style={{ maxHeight: 50 }}>
          <button
            className={answeredQuestion === false ? 'btn active' : 'btn'}
            value="unanswered"
            onClick={this.handleButtonClick}
          >
            Unanswered Questions
          </button>
          <button
            className={answeredQuestion === true ? 'btn active' : 'btn'}
            value="answered"
            onClick={this.handleButtonClick}
          >
            Answered Questions
          </button>
        </p>
        <ul className="dashboard-list">
          {questionsToMap.map(question => (
            <li key={question.id}>
              <div>
                <Question id={question.id} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const questionIds = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );

  const formattedQuestions = questionIds.map(id =>
    formatQuestion(questions[id], users[questions[id].author], authedUser)
  );

  const formattedAnsweredQuestion = formattedQuestions
    .filter(question => question.hasAnswered === true)
    .sort((a, b) => b.timestamp - a.timestamp);

  const formattedUnAnsweredQuestion = formattedQuestions
    .filter(question => question.hasAnswered === false)
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    questionIds,
    formattedAnsweredQuestion,
    formattedUnAnsweredQuestion
  };
}

export default connect(mapStateToProps)(DashBoard);
