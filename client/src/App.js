import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import BubblePage from './components/BubblePage';

import PrivateRoute from './utils/PrivateRoute';
import './styles.scss';


function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">

        <Route exact path="/" component={Login} />
        <PrivateRoute path="/bubble-page" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
