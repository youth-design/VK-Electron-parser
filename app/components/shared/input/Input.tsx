import React, {
  InputHTMLAttributes,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';

import { FieldError, useFormContext } from 'react-hook-form';
import styles from './Input.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  // TODO Fix this type
  inputRef: any;
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
  const methods = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  let input: HTMLInputElement | null = null;

  const onFocus = () => {
    setIsFocused(true);
  };

  // TODO Так же необходимо делать trim() для значения филдов, если оно состоит только их пробелов
  const onBlur = () => {
    if (!methods.getValues()[name || '']) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    if (methods.getValues()[name || '']) {
      setIsFocused(true);
    }
  }, []);

  const refHandler = (ref: HTMLInputElement) => {
    inputRef(ref);
    input = ref;
  };

  const focusInput = () => {
    if (input?.focus) {
      input.focus();
    }
  };

  return (
    <div
      className={`${styles.container} ${error ? styles.error : ''} ${
        icon ? styles.withIcon : ''
      }`}
    >
      <div className={styles.inputWrapper}>
        <input
          type={type || 'text'}
          name={name}
          id={id}
          ref={refHandler}
          // placeholder={placeholder}
          disabled={disabled}
          className={`${styles.input} ${icon ? styles.inputIcon : ''} ${
            className || ''
          }`}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <div
          className={`${styles.label} ${isFocused ? styles.labelActive : ''}`}
          onClick={focusInput}
          aria-hidden
        >
          {placeholder}
        </div>
        {icon && (
          <span aria-hidden className={styles.icon} onClick={focusInput}>
            {icon}
          </span>
        )}
        {rightIcon && (
          <span
            className={styles.rightIcon}
            onClick={onRightIconClick}
            aria-hidden
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
