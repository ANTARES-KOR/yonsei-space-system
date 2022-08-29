import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginCompletedState } from '../../atom';
import styles from './MainPage.module.scss';
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

const cx = classNames.bind(styles);

function MainPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const isLoginCompleted = useRecoilValue(isLoginCompletedState);

  useEffect(() => {
    if (!isLoginCompleted) {
      navigate('/login', { replace: true });
    }
  }, [navigate, isLoginCompleted]);

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
