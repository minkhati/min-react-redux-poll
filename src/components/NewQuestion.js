import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import QuestionInput from './QuestionInput';

const defaultState = {
  optionOneText: '',
  optionTwoText: '',
  toHome: false
};

class NewQuestion extends Component {
  state = defaultState;

  handleChangeOne = e => {
    const optionOneText = e.target.value;
    this.setState({ optionOneText });
  };

  handleChangeTwo = e => {
    const optionTwoText = e.target.value;
    this.setState({ optionTwoText });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { addQuestion, id } = this.props;

    addQuestion(optionOneText, optionTwoText);

    this.setState(() => ({
      ...defaultState,
      toHome: id ? false : true
    }));
  };

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;

    const enabled = optionOneText.length > 0 && optionTwoText.length > 0;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div className="new-question">
        <div className="page-heading">
          <h3 className="center">Create New Question </h3>
        </div>

        <form className="form-question" onSubmit={this.handleSubmit}>
          <p>Complete the question:</p>
          <h4>Would you rather ...</h4>
          <QuestionInput
            option={'One'}
            optionText={optionOneText}
            handleChange={this.handleChangeOne}
          />
          <h3 className=" center">OR</h3>
          <QuestionInput
            option={'Two'}
            optionText={optionTwoText}
            handleChange={this.handleChangeTwo}
          />
          <button className="btn" type="submit" disabled={!enabled}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addQuestion: (...args) => dispatch(handleAddQuestion(...args))
  };
};

export default connect(null, mapDispatchToProps)(NewQuestion);
