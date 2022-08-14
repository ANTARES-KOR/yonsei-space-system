import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MainPage.module.scss';
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

const cx = classNames.bind(styles);

function MainPage() {
  const [modal, setModal] = useState(false);
  const showModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div className={cx('container')}>
      <Sidebar />
      <div>
        컨텐츠 영역 입니당.
        <Button label="예약하기" onClick={showModal} />
      </div>
      {modal && (
        <Modal title="모달입니당" closeModal={closeModal}>
          2022-08-14에 공D404를 대관하시겠습니까?
        </Modal>
      )}
    </div>
  );
}

export default MainPage;
