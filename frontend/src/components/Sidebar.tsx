import React from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
  return <ul className={cx('container')}>사이드바 입니당.</ul>;
}

export default Sidebar;
