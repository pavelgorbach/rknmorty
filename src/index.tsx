import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './Widget'

const body = document.querySelector('body')

if (!body) {
  console.error('Rick and Morty needs an HTML body')
} else {
  const widget = document.createElement('div')
  widget.setAttribute('id', 'rick-and-morty-widget')
  body.appendChild(widget)

  ReactDOM.createRoot(widget).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
