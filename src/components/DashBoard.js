import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import DashBoardButton from './DashBoardButton';
import { formatQuestion, formatAllQuestions } from '../utils/helpers';

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
      <div className="new-question">
        <div className="page-heading-dashboard">
          <DashBoardButton
            answeredQuestion={answeredQuestion}
            value={'unanswered'}
            handleClick={this.handleButtonClick}
            BtnText={'Unanswered Questions'}
          />

          <DashBoardButton
            answeredQuestion={!answeredQuestion}
            value={'answered'}
            handleClick={this.handleButtonClick}
            BtnText={'Answered Questions'}
          />
        </div>
        <ul>
          {questionsToMap.map(question => (
            <li key={question.id}>
              <Question id={question.id} />
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

  const {
    formattedAnsweredQuestion,
    formattedUnAnsweredQuestion
  } = formatAllQuestions(formattedQuestions);

  return {
    questionIds,
    formattedAnsweredQuestion,
    formattedUnAnsweredQuestion
  };
}

export default connect(mapStateToProps)(DashBoard);
