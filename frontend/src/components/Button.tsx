import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

interface Props {
  children: ReactNode;
  fullWidth?: boolean;
}

const cx = classNames.bind(styles);

function Button({ children, fullWidth }: Props) {
  return (
    <button type="submit" className={cx('Button', fullWidth && 'fullWidth')}>
      {children}
    </button>
  );
}

export default Button;

Button.defaultProps = {
  fullWidth: false,
};
