import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

interface Props {
  label: string;
  fullWidth?: boolean;
  outline?: boolean;
  color?: string;
  size?: string;
  onClick: () => void;
}

const cx = classNames.bind(styles);

function Button({ label, fullWidth, outline, color, size, onClick }: Props) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={cx('Button', { fullWidth }, { outline }, color, size)}
    >
      {label}
    </button>
  );
}

export default Button;

Button.defaultProps = {
  fullWidth: false,
  outline: false,
  size: 'medium',
  color: null,
};
