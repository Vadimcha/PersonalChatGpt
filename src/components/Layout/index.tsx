import * as React from 'react';
import styles from './Layout.module.scss'

type Props = {
  children: React.ReactNode;
};

export const Layout = ({children}: Props) => {
  return (
    <div className={styles.wrapper}>
      { children }
    </div>
  );
};