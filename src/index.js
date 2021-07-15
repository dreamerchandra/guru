import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './asserts/scss/all.scss';
import { ModelProvider } from './Hoc/Model';
import initializeFirebase from './js/firebase-init';
import App from './Router';
import { QueryClient, QueryClientProvider } from 'react-query'

initializeFirebase();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: console.log
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <ModelProvider>
          <App />
        </ModelProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);