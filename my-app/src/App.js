import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;

// Define prop types for the Home component
Home.propTypes = {
  message: PropTypes.string.isRequired,
};


const App = () => {
  return (
    <Router>
      <Switch>
      <Route exact path="/" render={() => <Home message="Welcome to the Home Page!" />} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </Router>
  );
};

export default App;


