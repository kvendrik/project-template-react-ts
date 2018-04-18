import * as React from 'react';

import * as styles from './ImagePreview.scss';

interface Props {
  src: string;
}

export default ({src}: Props) => (
  <div className={styles.ImagePreview}>
    <img className={styles.Image} src={src} />
  </div>
);
