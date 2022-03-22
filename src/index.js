import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/css/index.css';
import { UseWalletProvider } from "use-wallet";
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
     <UseWalletProvider
    chainId={1}
    connectors={{
      portis: { dAppId: 'my-dapp-id-123-xyz' },
    }}
  ><BrowserRouter>
     <App />
    </BrowserRouter> 
     </UseWalletProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
