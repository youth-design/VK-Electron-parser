import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from '../store';
import Routes from '../Routes';
import Loader from './loader/Loader';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <>
      <Loader>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Loader>
    </>
  </Provider>
);

export default hot(Root);
