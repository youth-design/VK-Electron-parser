import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { RootState } from '../../store';

import styles from './Loader.css';

const mapStateToProps = (state: RootState) => ({
  parserState: state.parser,
  authState: state.auth,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type LoaderProps = PropsFromRedux & {
  children: JSX.Element;
};

const Loader = (props: LoaderProps) => {
  const [loaderIsShow, setLoaderIsShow] = useState(false);
  const { authState, parserState, children } = props;

  useEffect(() => {
    if (authState.isFetching || parserState.isFetching) {
      setLoaderIsShow(true);
    }
    if (!authState.isFetching && !parserState.isFetching) {
      setLoaderIsShow(false);
    }
  }, [authState.isFetching, parserState.isFetching]);

  return (
    <>
      <div
        className={`${styles.content} ${
          loaderIsShow ? styles.contentIsBlurred : ''
        }`}
      >
        {children}
      </div>
      <CSSTransition
        in={loaderIsShow}
        unmountOnExit
        timeout={200}
        classNames="fade-in"
      >
        <div className={styles.container}>Загрузка...</div>
      </CSSTransition>
    </>
  );
};

export default connector(Loader);
