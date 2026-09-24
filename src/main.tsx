import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const renderApp = () => {
  let rootElement = document.getElementById('root');
  if (!rootElement) {
    rootElement = document.createElement('div');
    rootElement.id = 'root';
    if (document.body) {
      document.body.appendChild(rootElement);
    } else {
      document.documentElement.appendChild(rootElement);
    }
  }
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}

