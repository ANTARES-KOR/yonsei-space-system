import React from 'react';
import styles from './Loading.module.scss';
import Portal from './Portal';
import Overlay from './Overlay';

function Loading() {
  return (
    <Portal portalNodeId="loading">
      <Overlay />
      <div className={styles.container}>
        <div className={styles.spinner} />
        <div className={styles.message}>Loading...</div>
      </div>
    </Portal>
  );
}

export default Loading;
