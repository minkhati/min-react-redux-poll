import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css';
import { setAuthedUser } from '../actions/authedUser';
import { handleAddUser } from '../actions/users';
import logo from '../utils/logo.svg';

const defaultState = {
  disabled: false,
  userName: '',
  clearable: true,
  rtl: false
};

class Login extends Component {
  state = defaultState;

  clearValue = e => {
    this.select.setInputValue('');
  };

  updateValue = newValue => {
    const { authedUser } = this.props;

    this.setState({
      ...defaultState,
      userName: newValue
    });

    authedUser(newValue);
  };

  handleSubmit = e => {
    e.preventDefault();

    const userName = this.userName.value;
    const { addUser } = this.props;

    if (userName.length > 0) {
      addUser(userName);
    } else {
      alert("User Name can't be blank");
      return;
    }
  };

  render() {
    const { users } = this.props;

    const userIds = Object.keys(users);

    const options = userIds.map(id => ({
      value: users[id].id,
      label: users[id].name
    }));

    return (
      <div className="new-question">
        <div className="page-heading-login">
          <h3 className="center">Welcome to the Would You Rather App!</h3>
          <h4 className="center">Please sign in to continue</h4>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="form-question">
          <div className="sign-in-div">
            <span className="sign-in-span">Sign in</span>
            <p>(for exisiting users)</p>
          </div>

          <Select
            id="user-select"
            ref={ref => {
              this.select = ref;
            }}
            onBlurResetsInput={false}
            onSelectResetsInput={false}
            autoFocus
            options={options}
            simpleValue
            clearable={this.state.clearable}
            name="selected-user"
            value={this.state.userName}
            onChange={this.updateValue}
          />
        </div>
        <div>
          <h2 className="sign-in-span">Create New User</h2>

          <form className="form-question" onSubmit={this.handleSubmit}>
            <input
              className="question-option"
              type="text"
              placeholder="Enter your name"
              ref={input => (this.userName = input)}
              maxLength={40}
            />

            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUser: (...args) => dispatch(handleAddUser(...args)),
    authedUser: (...args) => dispatch(setAuthedUser(...args))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
