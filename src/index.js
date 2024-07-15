import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/app/App';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import repoStore from '../src/app/store';

configure({ enforceActions: 'observed' });

const stores = {
  repoStore,
};

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
