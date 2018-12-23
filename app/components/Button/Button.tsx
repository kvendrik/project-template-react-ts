import * as React from 'react';
import * as styles from './Button.scss';

export interface Props {
  children: React.ReactNode;
}

export default ({children}: Props) => (
  <a className={styles.Button}>{children}</a>
);
