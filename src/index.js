import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Login from "./rotas/Login";

import { Provider } from "react-redux";
import store from "./store";

import { BrowserRouter, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);