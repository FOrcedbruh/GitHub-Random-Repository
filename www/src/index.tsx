import React from 'react';
import ReactDOM from 'react-dom/client';
import "./app/global.scss"
import App from './app/App';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
