import React, { ButtonHTMLAttributes } from 'react';

import styles from './Button.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: JSX.Element | string;
  color?: 'primary' | undefined;
};

const Button = (props: ButtonProps) => {
  const { children, type, color } = props;
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`${styles.button} ${color ? styles[color] : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
