import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  Home  from './containers/Home';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// import 'react-big-calendar/lib/addons/dragAndDrop/styles';
ReactDOM.render(
  <React.StrictMode>
    <Home/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

