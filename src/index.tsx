import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const body = document.querySelector('body') as HTMLElement
const widget = document.createElement('div')
const widgetId = 'triple-pupa-rik-and-morty-widget'
widget.setAttribute('id', widgetId)
body.appendChild(widget)
const container = document.getElementById(widgetId) as HTMLElement

if (!container) {
  console.warn()
} else {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
