import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './MainPage.module.scss';
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import useCheckLogin from '../../hooks/useCheckLogin';

const cx = classNames.bind(styles);

function MainPage() {
  useCheckLogin();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className={cx('container')}>
      <Sidebar />
      <div>
        컨텐츠 영역 입니당.
        <Button label="예약하기" onClick={toggleModal} />
        <Link to="/login">login</Link>
      </div>
      {modal && (
        <Modal title="모달입니당" closeModal={toggleModal}>
          2022-08-14에 공D404를 대관하시겠습니까?
        </Modal>
      )}
    </div>
  );
}

export default MainPage;
