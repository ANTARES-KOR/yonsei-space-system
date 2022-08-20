import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './Modal.module.scss';
import Portal from './Portal';
import Button from './Button';

const cx = classNames.bind(styles);

interface ModalProps {
  title: string;
  children: ReactNode;
  closeModal: () => void;
}

function Modal({ title, children, closeModal }: ModalProps) {
  return (
    <Portal portalNodeId="modal">
      <div className={cx('modal-overlay')} />
      <div className={cx('modal-container')}>
        <header>
          <h3>{title}</h3>
          <button onClick={closeModal} type="button">
            <AiOutlineClose />
          </button>
        </header>
        <main>{children}</main>
        <section>
          <Button
            label="취소"
            onClick={closeModal}
            color="white"
            size="small"
          />
          <Button label="확인" onClick={closeModal} size="small" />
        </section>
      </div>
    </Portal>
  );
}

export default Modal;
