import React, { Component, input } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Question from './Question';
import { formatQuestion, formatDate } from '../utils/helpers';
import { handleAddQuestionAnswer } from '../actions/questions';

class QuestionPage extends Component {
  state = {
    selectedOption: '',
    toHome: false
  };

  handleSubmit = e => {
    e.preventDefault();

    const { dispatch, question, authedUser } = this.props;
    const answer = this.state.selectedOption;

    dispatch(
      handleAddQuestionAnswer({
        qid: question.id,
        question,
        answer,
        authedUser
      })
    );

    this.setState(() => ({
      selectedOption: '',
      toHome: true
    }));
  };

  handleOptionChange = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  render() {
    const { question } = this.props;
    const { selectedOption, toHome } = this.state;

    if (question === null) {
      return <p>This Question does not exist</p>;
    }

    if (toHome === true) {
      return <Redirect to="/" />;
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
      <form className="question" onSubmit={this.handleSubmit}>
        <p>{name} asks:</p>
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="question-info">
          <div>
            <label>Would You Rather ...</label>
            <div>
              <p>
                <label>
                  <input
                    type="radio"
                    value="optionOne"
                    checked={selectedOption === 'optionOne'}
                    onChange={this.handleOptionChange}
                  />{' '}
                  {optionOne.text}
                </label>
              </p>
              <p>
                <label>
                  <input
                    type="radio"
                    value="optionTwo"
                    checked={selectedOption === 'optionTwo'}
                    onChange={this.handleOptionChange}
                  />{' '}
                  {optionTwo.text}
                </label>
              </p>
            </div>
          </div>

          <button className="btn">Submit</button>
        </div>
      </form>
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

export default connect(mapStateToProps)(QuestionPage);
