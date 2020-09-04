import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { connect, ConnectedProps } from 'react-redux';
import { authFields, AuthForm } from './constants';
import { auth, authWithToken } from './redux/actions';
import { RootState } from '../../store';

import styles from './Auth.css';
import Input from '../shared/input/Input';
import Button from '../shared/button/Button';

const mapStateToProps = (state: RootState) => ({
  authState: state.auth,
});

const mapDispatchToProps = {
  auth,
  authWithToken,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AuthProps = PropsFromRedux;

const Auth = (props: AuthProps) => {
  const { register, handleSubmit, errors } = useForm<AuthForm>();

  const onFormSubmit = (data: AuthForm) => {
    if (props.authState.isFetching) {
      return;
    }
    props.auth(data);
  };

  const { authState } = props;

  useEffect(() => {
    props.authWithToken();
  }, []);

  return (
    <div className={`${styles.container} ${styles.containerColor}`}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className={styles.icon}>
          <div>
            <i className="fab fa-vk" />
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <Input
            type="text"
            name={authFields.LOGIN.name}
            id={authFields.LOGIN.name}
            inputRef={register(authFields.LOGIN.validationRules)}
            placeholder={authFields.LOGIN.placeholder}
            disabled={authState.isFetching}
            icon={<i className="fas fa-user" />}
            error={errors.LOGIN}
          />
        </div>
        <div className={styles.inputWrapper}>
          <Input
            type="password"
            name={authFields.PASSWORD.name}
            id={authFields.PASSWORD.name}
            placeholder={authFields.PASSWORD.placeholder}
            inputRef={register(authFields.PASSWORD.validationRules)}
            disabled={authState.isFetching}
            icon={<i className="fas fa-lock" />}
            error={errors.PASSWORD}
          />
        </div>
        <Button type="submit" disabled={authState.isFetching} color="primary">
          Войти
        </Button>
        {authState.isError && (
          <div style={{ color: 'red' }}>Ошибка авторизации</div>
        )}
      </form>
    </div>
  );
};

export default connector(Auth);
