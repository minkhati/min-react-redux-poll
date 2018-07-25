import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css';
import { setAuthedUser } from '../actions/authedUser';
import logo from '../utils/logo.svg';

class Login extends Component {
  state = {
    disabled: false,
    selectValue: null,
    clearable: true,
    rtl: false
  };

  clearValue = e => {
    this.select.setInputValue('');
  };

  updateValue = newValue => {
    const { dispatch } = this.props;
    this.setState({
      selectValue: newValue
    });

    dispatch(setAuthedUser(newValue));
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
        <div className="page-heading" style={{ display: 'block' }}>
          <h3 className="center">Welcome to the Would You Rather App!</h3>
          <h4 className="center">Please sign in to continue</h4>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <form className="form-question" onSubmit={this.handleSubmit}>
          <h2 className="center" style={{ color: '#009688' }}>
            Sign in
          </h2>
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
            value={this.state.selectValue}
            onChange={this.updateValue}
          />
          <button
            className="btn"
            type="submit"
            disabled={this.state.selectValue === ''}
          >
            Submit
          </button>
        </form>
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
