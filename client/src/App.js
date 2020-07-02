import React from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom';

import FileUpload from './Component/fileClient';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={ FileUpload }/>
    </Switch>
  );
}

export default App;
