import React, { Component, input } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { formatQuestion } from '../utils/helpers';
import { handleAddQuestionAnswer } from '../actions/questions';

class QuestionPage extends Component {
  state = {
    selectedOption: '',
    toAnswer: false
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
      //selectedOption: '',
      toAnswer: true
    }));
  };

  handleOptionChange = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  render() {
    const { question } = this.props;
    const { selectedOption, toAnswer } = this.state;

    const enabled = selectedOption;

    if (question === null) {
      return <p>This Question does not exist</p>;
    }

    const { name, id, optionOne, optionTwo, avatar } = question;

    if (toAnswer === true) {
      return <Redirect to={`/answer/${id}`} />;
    }

    return (
      <form
        className="new-question"
        style={{ padding: 0 }}
        onSubmit={this.handleSubmit}
      >
        <span className="question-page-heading">{name} asks:</span>
        <div className="div-que-avatar">
          <div className="div-avatar">
            <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
          </div>
          <div className="div-question">
            <p className="active">Would you rather ...</p>
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
            <button className="btn" disabled={!enabled}>
              Submit
            </button>
          </div>
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
