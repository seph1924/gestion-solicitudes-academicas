import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App.jsx';

// Redux Toolkit
import { Provider } from 'react-redux';
import { store } from './store';

// Contexto de autenticación
import { UsuarioProvider } from './context/UsuarioContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <UsuarioProvider>
          <App />
        </UsuarioProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);