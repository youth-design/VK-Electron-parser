import React, {
  InputHTMLAttributes,
  LegacyRef,
  MouseEventHandler,
} from 'react';

import { FieldError } from 'react-hook-form';
import styles from './Input.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputRef: LegacyRef<HTMLInputElement>;
  icon?: JSX.Element;
  error?: FieldError;
  rightIcon?: JSX.Element;
  onRightIconClick?: MouseEventHandler;
};

const Input = (props: InputProps) => {
  const {
    type,
    name,
    id,
    inputRef,
    placeholder,
    disabled,
    className,
    icon,
    error,
    rightIcon,
    onRightIconClick,
  } = props;

  return (
    <div className={`${styles.container} ${error ? styles.error : ''}`}>
      <div className={styles.inputWrapper}>
        <input
          type={type || 'text'}
          name={name}
          id={id}
          ref={inputRef}
          placeholder={placeholder}
          disabled={disabled}
          className={`${styles.input} ${icon ? styles.inputIcon : ''} ${
            className || ''
          }`}
        />
        {icon && <span className={styles.icon}>{icon}</span>}
        {rightIcon && (
          <span
            className={styles.rightIcon}
            onClick={onRightIconClick}
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>
      <div className={styles.errorBlock} hidden={!error?.message}>
        {error?.message || ''}
      </div>
    </div>
  );
};

export default Input;
