import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  };

  handleChangeOne = e => {
    const optionOneText = e.target.value;
    this.setState(() => ({
      optionOneText
    }));
  };

  handleChangeTwo = e => {
    const optionTwoText = e.target.value;
    this.setState(() => ({
      optionTwoText
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddQuestion(optionOneText, optionTwoText));

    this.setState(() => ({
      // optionOneText: '',
      // optionTwoText: '',
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
          <input
            className="question-option"
            type="text"
            placeholder="Enter Option One Text Here"
            value={optionOneText}
            onChange={this.handleChangeOne}
            maxLength={80}
          />
          <h3 className=" center">OR</h3>
          <input
            className="question-option"
            type="text"
            placeholder="Enter Option Two Text Here"
            value={optionTwoText}
            onChange={this.handleChangeTwo}
            maxLength={80}
          />
          <button className="btn" type="submit" disabled={!enabled}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewQuestion);
