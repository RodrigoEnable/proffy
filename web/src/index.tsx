import React from 'react'; // permite trabalhar com a biblioteca react
import ReactDOM from 'react-dom'; // permite o react trabalhar com a dom do navegador
import App from './App'; // componente

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);