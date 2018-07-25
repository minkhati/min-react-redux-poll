import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css';
import { setAuthedUser } from '../actions/authedUser';
import { handleAddUser } from '../actions/users';
import logo from '../utils/logo.svg';

class Login extends Component {
  state = {
    disabled: false,
    userName: '',
    clearable: true,
    rtl: false
  };

  clearValue = e => {
    this.select.setInputValue('');
  };

  updateValue = newValue => {
    const { dispatch } = this.props;
    this.setState({
      userName: newValue
    });

    dispatch(setAuthedUser(newValue));
  };

  handleSubmit = e => {
    e.preventDefault();

    const userName = this.userName.value;
    const { dispatch } = this.props;
    if (userName.length > 0) {
      dispatch(handleAddUser(userName));
    }
    alert("User Name can't be blank");
  };

  render() {
    const { userName } = this.state;
    const { users } = this.props;
    const userIds = Object.keys(users);

    const enabled = userName.length > 0;

    const options = userIds.map(id => ({
      value: users[id].id,
      label: users[id].name
    }));

    return (
      <div className="new-question">
        <div className="page-heading" style={{ flexDirection: 'column' }}>
          <h3 className="center">Welcome to the Would You Rather App!</h3>
          <h4 className="center">Please sign in to continue</h4>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="form-question">
          <div
            className="center"
            style={{ color: '#009688', marginBottom: '10px' }}
          >
            <span style={{ fontSize: '25px', fontWeight: 'bold' }}>
              Sign in
            </span>
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
          <h2 className="center" style={{ color: '#009688' }}>
            Create New User
          </h2>

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

function mapStateToProps({ users }) {
  return {
    users
  };
}
export default connect(mapStateToProps)(Login);
