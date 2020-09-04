/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import routes from './constants/routes.json';
import App from './containers/App';
import Auth from './components/auth/Auth';
import { RootState } from './store';
import { auth } from './components/auth/redux/actions';
import HomePage from './containers/HomePage';

// Lazily load routes and code split with webpacck
// const LazyCounterPage = React.lazy(() =>
//   import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
// );
//
// const CounterPage = (props: Record<string, any>) => (
//   <React.Suspense fallback={<h1>Loading...</h1>}>
//     <LazyCounterPage {...props} />
//   </React.Suspense>
// );

const mapStateToProps = (state: RootState) => ({
  authState: state.auth,
});

const mapDispatchToProps = {
  auth,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type RoutesProps = PropsFromRedux;

function Routes(props: RoutesProps) {
  const { authState } = props;
  return (
    <App>
      <Switch>
        {authState.isAuthorized ? (
          <>
            <Route exact path={routes.HOME} component={HomePage} />
            <Route exact path={routes.AUTH_SCREEN} component={Auth} />
          </>
        ) : (
          <>
            <Route exact path={routes.AUTH} component={Auth} />
          </>
        )}
      </Switch>
    </App>
  );
}

export default connector(Routes);
