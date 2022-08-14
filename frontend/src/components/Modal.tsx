import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import ModalPortal from './ModalPortal';
import Button from './Button';

const cx = classNames.bind(styles);

interface ModalProps {
  title: string;
  children: ReactNode;
  closeModal: () => void;
}

function Modal({ title, children, closeModal }: ModalProps) {
  return (
    <ModalPortal>
      <div className={cx('modal-overlay')}>
        <div className={cx('modal-container')}>
          <div className={cx('modal-header')}>
            <h3>{title}</h3>
          </div>
          <div className={cx('modal-content')}>{children}</div>
          <div className={cx('modal-btns')}>
            <Button label="취소" onClick={closeModal} size="small" outline />
            <Button label="확인" onClick={closeModal} size="small" />
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}

export default Modal;
