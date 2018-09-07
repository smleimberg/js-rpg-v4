import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./components/App";
import rootReducer from "./reducers";
import { firstGameObject } from './actions'
import registerServiceWorker from './registerServiceWorker';

var initialState = false;

if( localStorage.getItem('jsrpg') ){
  var gameData = JSON.parse(localStorage.getItem('jsrpg'));
  initialState = {'game':gameData};
}else{
  initialState = {
      'game':{
        'current':firstGameObject,
        'saves':{},
        'settings':require('./json/settings.json')
      },
  };
}

const store = createStore(rootReducer,initialState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
