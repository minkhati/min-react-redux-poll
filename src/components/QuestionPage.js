import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { formatQuestion } from '../utils/helpers';
import { handleAddQuestionAnswer } from '../actions/questions';
import QuestionRadioInput from './QuestionRadioInput';

const defaultState = {
  selectedOption: '',
  toAnswer: false
};

class QuestionPage extends Component {
  state = defaultState;

  handleSubmit = e => {
    e.preventDefault();

    const { addQuestionAnswer, question, authedUser } = this.props;
    const answer = this.state.selectedOption;

    addQuestionAnswer({
      qid: question.id,
      question,
      answer,
      authedUser
    });

    this.setState({
      ...defaultState,
      toAnswer: true
    });
  };

  handleOptionChange = e => {
    this.setState({
      ...defaultState,
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
              <QuestionRadioInput
                handleChange={this.handleOptionChange}
                optionText={optionOne.text}
                option={'optionOne'}
                selectedOption={selectedOption}
              />

              <QuestionRadioInput
                handleChange={this.handleOptionChange}
                optionText={optionTwo.text}
                option={'optionTwo'}
                selectedOption={selectedOption}
              />
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

const mapDispatchToProps = dispatch => {
  return {
    addQuestionAnswer: (...args) => dispatch(handleAddQuestionAnswer(...args))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
