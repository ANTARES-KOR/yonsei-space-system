import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

interface Props {
  label: string;
  color?: 'white' | 'gray';
  size?: string;
  fullWidth?: boolean;
  outline?: boolean;
  onClick?: () => void;
}

const cx = classNames.bind(styles);

function Button({ label, color, size, fullWidth, outline, onClick }: Props) {
  return (
    <button
      type={onClick ? 'button' : 'submit'}
      onClick={onClick}
      className={cx('Button', color, size, { fullWidth }, { outline })}
    >
      {label}
    </button>
  );
}

export default Button;
