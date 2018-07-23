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
      optionOneText: '',
      optionTwoText: '',
      toHome: id ? false : true
    }));
  };

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h3 className="center">Create New Question</h3>
        <form className="new-question" onSubmit={this.handleSubmit}>
          <span>Complete the question:</span>
          <h4>Would you rather ...</h4>
          <input
            type="text"
            placeholder="Enter Option One Text Here"
            value={optionOneText}
            onChange={this.handleChangeOne}
            className="text"
            maxLength={80}
          />
          <h3 className=" center">OR</h3>
          <input
            type="text"
            placeholder="Enter Option Two Text Here"
            value={optionTwoText}
            onChange={this.handleChangeTwo}
            className="text"
            maxLength={80}
          />
          <button
            className="btn"
            type="submit"
            disabled={optionOneText === '' && optionTwoText === ''}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewQuestion);
