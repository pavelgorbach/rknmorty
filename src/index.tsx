import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import './index.css'

const body = document.querySelector('body') as HTMLElement

if (!body) {
  console.error('Rick and Morty needs an HTML body')
} else {
  const widget = document.createElement('div')
  widget.setAttribute('id', 'triple-pupa-rick-and-morty-widget')
  body.appendChild(widget)

  ReactDOM.createRoot(widget).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
