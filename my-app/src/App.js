import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import TodoContainer from './components/TodoContainer';

const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;

// Define prop types for the Home component
Home.propTypes = {
  message: PropTypes.string.isRequired,
};


const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <TodoContainer tableName="Todo Table"/>} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
    </Routes>
  );
};

export default App;


