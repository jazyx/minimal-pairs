import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

window.addEventListener("load",function() {
  setTimeout(function(){
      // This hides the address bar:
      window.scrollTo(0, 1);
  }, 0);
});
