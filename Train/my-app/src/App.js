import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './container/Home';
import Main from './container/Main';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component ={Home} />
        <Route exact path="/main" render = {(props) => <Main {...props}/>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
