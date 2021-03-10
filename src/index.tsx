import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// 中转导出
export { default as Button } from './components/Button'
export { default as Menu } from './components/Menu'

export { default as Icon } from './components/Icon'
export { default as Transition } from './components/Transition'


