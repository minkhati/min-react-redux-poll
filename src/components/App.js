import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { handleInitialData } from '../actions/shared';
import HomePage from './HomePage';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import Logout from './Logout';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <hr />
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/new" component={NewQuestion} />
            <Route path="/leaderBoard" exact component={LeaderBoard} />
            <Route path="/logout" exact component={Logout} />
          </div>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
