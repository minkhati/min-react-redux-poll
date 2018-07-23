import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { handleInitialData } from '../actions/shared';
import DashBoard from './DashBoard';
import QuestionPage from './QuestionPage';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import Logout from './Logout';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    if (!this.props.authedUser) {
      return <Login />;
    }

    return (
      <Router>
        <div className="container">
          <Nav authedUser={this.props.authedUser} user={this.props.user} />
          <hr />
          <Switch>
            <Route path="/" exact component={DashBoard} />
            <Route path="/question/:id" component={QuestionPage} />
            <Route path="/new" component={NewQuestion} />
            <Route path="/leaderBoard" component={LeaderBoard} />
            <Route path="/logout" component={Logout} />

            <Route render={() => <div>Not Found!!</div>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    user: authedUser ? users[authedUser] : null
  };
}

export default connect(mapStateToProps)(App);
