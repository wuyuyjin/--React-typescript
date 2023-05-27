import { ChakraProvider } from '@chakra-ui/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
const rootElement = ReactDOM.createRoot(document.getElementById('root') as Element);
rootElement.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
