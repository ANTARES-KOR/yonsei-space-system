import React from 'react';
import classNames from 'classnames/bind';
import styles from './MainPage.module.scss';
import Sidebar from '../../components/Sidebar';

const cx = classNames.bind(styles);

function MainPage() {
  return (
    <div className={cx('container')}>
      <Sidebar />
      <div>컨텐츠 영역 입니당.</div>
    </div>
  );
}

export default MainPage;
