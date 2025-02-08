import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

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
