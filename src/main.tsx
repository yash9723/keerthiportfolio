import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Self-hosted fonts (Latin subsets only) — no render-blocking request to Google Fonts
import '@fontsource/almarai/latin-300.css';
import '@fontsource/almarai/latin-400.css';
import '@fontsource/almarai/latin-700.css';
import '@fontsource/almarai/latin-800.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
