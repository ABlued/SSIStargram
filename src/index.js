import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './shared/App';
// import reportWebVitals from './reportWebVitals';
import store from './redux/configureStore';
// import {analytics} from './shared/firebase';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// function sendToAnalytics(metric){
//   const _report = JSON.stringify(metric);
//   analytics.logEvent('web_vital_report', _report);
//   console.log({_report});
// }
// reportWebVitals(sendToAnalytics);
